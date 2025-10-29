using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace commands_signal_r.hubs
{
    public class TheatreHub : Hub
    {
        // NEW
        private static readonly ConcurrentDictionary<string, TheatreSession> Sessions
           = new ConcurrentDictionary<string, TheatreSession>(); // SessionId -> TheatreSession

        private static readonly ConcurrentDictionary<string, (string SessionId, string Role)> ActorConnections
            = new ConcurrentDictionary<string, (string, string)>(); // ConnectionId -> (SessionId, Role)

        private static readonly TimeSpan SessionExpiration = TimeSpan.FromHours(24);


        // Clean up expired sessions when a new connection is made
        public override async Task OnConnectedAsync()
        {
            CleanupExpiredSessions();

            await base.OnConnectedAsync();
        }


        // Create a new session and register the role at the same time
        public async Task CreateSessionAndRole(string sessionId, string roleName)
        {
            var session = Sessions.GetOrAdd(sessionId, _ => new TheatreSession
            {
                SessionId = sessionId,
                LastActivity = DateTime.UtcNow
            });

            if (roleName is null || string.IsNullOrWhiteSpace(roleName)) return;

            await RegisterRoleInternal(sessionId, roleName);
        }


        public async Task CreateSession(string sessionId)
        {
            CleanupExpiredSessions();

            var created = CreateSessionInternal(sessionId); // Calls static version

            if (!created)
                throw new HubException("Session already exists");

            // Add connection to session group (audience role)
            await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);

            await Clients.Caller.SendAsync("SessionCreated", sessionId);
        }




        // Static method to create a session without registering a role
        public static bool CreateSessionInternal(string sessionId)
        {
            var created = false;

            var session = Sessions.GetOrAdd(sessionId, _ =>
            {
                created = true;
                return new TheatreSession
                {
                    SessionId = sessionId,
                    LastActivity = DateTime.UtcNow
                };
            });

            return created;
        }

        public static bool SessionExists(string sessionId)
        {
            return Sessions.ContainsKey(sessionId);
        }


        // Register role within an existing session
        public async Task RegisterRole(string sessionId, string roleName)
        {
            await RegisterRoleInternal(sessionId, roleName);
        }

        public static bool RegisterRoleExternal(string sessionId, string roleName)
        {
            if (!Sessions.ContainsKey(sessionId))
            {
                return false;
            }
            var session = Sessions[sessionId];

            return true;
        }

        // Internal method to handle role registration logic
        private async Task RegisterRoleInternal(string sessionId, string roleName)
        {
            var connId = Context.ConnectionId;

            if (!Sessions.ContainsKey(sessionId))
            {
                throw new HubException("Session not found.");
            }

            var session = Sessions[sessionId];
            session.LastActivity = DateTime.UtcNow;

            if (!session.RolesByConnection.ContainsKey(roleName))
            {
                session.RolesByConnection[roleName] = new List<string>();
            }

            session.RolesByConnection[roleName].Add(connId);
            ActorConnections[connId] = (sessionId, roleName);

            await Groups.AddToGroupAsync(connId, $"{sessionId}-{roleName}"); // Role-specific group

            await BroadcastRoles(sessionId);
        }


        // Audience joins a session to receive role updates
        public async Task JoinSession(string sessionId)
        {
            CleanupExpiredSessions();
            if (!Sessions.ContainsKey(sessionId))
            {
                throw new HubException("Invalid session ID");
            }

            // Send list of active roles to audience
            var session = Sessions[sessionId];
            var roleNames = session.RolesByConnection.Keys.ToList();
            await Clients.Caller.SendAsync("UpdateRoles", roleNames);
        }


        // Send instruction to a specific role within a session
        public async Task SendInstruction(string sessionId, string roleName, string message)
        {
            if (!Sessions.TryGetValue(sessionId, out var session)) return;

            session.LastActivity = DateTime.UtcNow;

            await Clients.Group($"{sessionId}-{roleName}")
                .SendAsync("ReceiveInstruction", message);
        }


        // Handle disconnection and clean up roles
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var connId = Context.ConnectionId;

            if (ActorConnections.TryRemove(connId, out var sessionInfo))
            {
                var (sessionId, role) = sessionInfo;

                if (Sessions.TryGetValue(sessionId, out var session))
                {
                    if (session.RolesByConnection.TryGetValue(role, out var list))
                    {
                        list.Remove(connId);
                        if (list.Count == 0)
                        {
                            session.RolesByConnection.Remove(role);
                        }

                        await BroadcastRoles(sessionId);
                    }
                }
            }

            CleanupExpiredSessions();
            await base.OnDisconnectedAsync(exception);
        }


        // Broadcast updated role list to all clients in the session
        private async Task BroadcastRoles(string sessionId)
        {
            if (!Sessions.TryGetValue(sessionId, out var session)) return;

            var activeRoles = session.RolesByConnection.Keys.ToList();
            await Clients.Group(sessionId).SendAsync("UpdateRoles", activeRoles);
        }


        // Remove sessions that have been inactive for too long
        public void CleanupExpiredSessions()
        {
            var now = DateTime.UtcNow;

            foreach (var s in Sessions.Values)
            {
                if (now - s.LastActivity > SessionExpiration)
                {
                    Sessions.TryRemove(s.SessionId, out _);
                }
            }
        }

        // OLD
        //private static readonly Dictionary<string, string> ActorRoles = new();

        //public async Task RegisterRole(string roleName)
        //{
        //    ActorRoles[Context.ConnectionId] = roleName;
        //    await Groups.AddToGroupAsync(Context.ConnectionId, roleName);

        //    // Notify all clients of updated role list
        //    var activeRoles = ActorRoles.Values.Distinct().ToList();
        //    await Clients.All.SendAsync("UpdateRoles", activeRoles);

        //    await BroadcastRoles();
        //}

        //public Task<List<string>> GetActiveRoles()
        //{
        //    var activeRoles = ActorRoles.Values.Distinct().ToList();
        //    return Task.FromResult(activeRoles);
        //}

        //public async Task SendInstruction(string roleName, string message) //Sends instuctions to specified role
        //{
        //    await Clients.Group(roleName).SendAsync("ReceiveInstruction", message);
        //}

        //public override async Task OnDisconnectedAsync(Exception? exception)
        //{
        //    if (ActorRoles.TryGetValue(Context.ConnectionId, out var role))
        //    {
        //        ActorRoles.Remove(Context.ConnectionId);

        //        // If no one else is in this role, update audience
        //        var activeRoles = ActorRoles.Values.Distinct().ToList();
        //        await Clients.All.SendAsync("UpdateRoles", activeRoles);
        //    }

        //    await base.OnDisconnectedAsync(exception);
        //}

        //private async Task BroadcastRoles()
        //{
        //    var activeRoles = ActorRoles.Values.Distinct().ToList();
        //    await Clients.All.SendAsync("UpdateRoles", activeRoles);
        //}
    }

    public class TheatreSession
    {
        public string SessionId { get; set; } = "";
        public Dictionary<string, List<string>> RolesByConnection { get; set; } = new(); // RoleName -> List of ConnectionIds
        public DateTime LastActivity { get; set; } = DateTime.UtcNow;
    }
}
