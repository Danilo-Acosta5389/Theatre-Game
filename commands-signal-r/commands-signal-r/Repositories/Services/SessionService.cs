using commands_signal_r.DataContext;
using commands_signal_r.DTOs;
using commands_signal_r.Models;
using commands_signal_r.Repositories.Base;
using commands_signal_r.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace commands_signal_r.Repositories.Services
{
    public class SessionService : RepositoryBase<SessionModel>, ISessionService
    {
        private readonly IMemoryCache _cache;
        public SessionService(AppDbContext dbContext, IMemoryCache cache) : base(dbContext)
        {
            _cache = cache;
        }

        public (bool, string) CreateSession(StartSessionDTO details)
        {
            if (details == null)
                return (false, "Invalid session details provided");

            
            CheckSession(details.SessionId); // Check if session already exists




            return (true, "Session created successfully"); // Return success status and message
        }

        public void GetSessionDetails(string sessionId)
        {
            // Logic to retrieve session details, e.g., from database or in-memory store
            /*
             * [] Retrieve session details based on sessionId
             * [] Return details such as:
             *    - Is it a new or existing session?
             *    - What function does the user have (actor or something else)?
             *    - Is the user logged in?
             *    - Who is the SessionMaster?
             * 
             * **/
        }

        public bool CheckSession(string sessionId) 
        {

            var dbResult = GetByCondition(x => x.PublicId == sessionId);
            var cacheResult = _cache.Get<SessionModel>(sessionId);

            if (dbResult != null || cacheResult != null) return true;

            return false;
        }
    }
}
