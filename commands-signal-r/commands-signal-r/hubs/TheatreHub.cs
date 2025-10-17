using Microsoft.AspNetCore.SignalR;

namespace commands_signal_r.hubs
{
    public class TheatreHub : Hub
    {
        private static readonly Dictionary<string, string> ActorRoles = new();

        public async Task RegisterRole(string roleName)
        {
            ActorRoles[Context.ConnectionId] = roleName;
            await Groups.AddToGroupAsync(Context.ConnectionId, roleName);

            // Notify all clients of updated role list
            var activeRoles = ActorRoles.Values.Distinct().ToList();
            await Clients.All.SendAsync("UpdateRoles", activeRoles);

            await BroadcastRoles();
        }

        public Task<List<string>> GetActiveRoles()
        {
            var activeRoles = ActorRoles.Values.Distinct().ToList();
            return Task.FromResult(activeRoles);
        }

        public async Task SendInstruction(string roleName, string message) //Sends instuctions to specified role
        {
            await Clients.Group(roleName).SendAsync("ReceiveInstruction", message);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (ActorRoles.TryGetValue(Context.ConnectionId, out var role))
            {
                ActorRoles.Remove(Context.ConnectionId);

                // If no one else is in this role, update audience
                var activeRoles = ActorRoles.Values.Distinct().ToList();
                await Clients.All.SendAsync("UpdateRoles", activeRoles);
            }

            await base.OnDisconnectedAsync(exception);
        }

        private async Task BroadcastRoles()
        {
            var activeRoles = ActorRoles.Values.Distinct().ToList();
            await Clients.All.SendAsync("UpdateRoles", activeRoles);
        }
    }
}
