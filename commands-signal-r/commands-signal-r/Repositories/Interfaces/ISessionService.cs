using commands_signal_r.DTOs;
using commands_signal_r.Models;

namespace commands_signal_r.Repositories.Interfaces
{
    public interface ISessionService : IRepositoryBase<SessionModel>
    {

        (bool, string) CreateSession(StartSessionDTO details);

        void GetSessionDetails(string sessionId);
    }
}
