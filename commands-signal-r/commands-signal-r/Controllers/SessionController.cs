using commands_signal_r.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using commands_signal_r.DTOs;

namespace commands_signal_r.Controllers
{
    [ApiController]
    [Route("api/session")]
    public class SessionController : ControllerBase
    {
        private readonly ISessionService _sessionService;

        // Inject ISessionService via constructor dependency injection
        public SessionController(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }

        /**
         * 
         * The session controller will start a session and return Ok with details like 
         * new or existing session, 
         * what function the user has - if actor or something else, 
         * if you are logged in, for which matters if session will be stored in db or in memory,
         * who is SessionMaster
         * 
         * 
         */
        [HttpPost("start")]
        public IActionResult Create(StartSessionDTO sessionDetails)
        {
            var result = _sessionService.CreateSession(sessionDetails);

            if (!result.Item1) return BadRequest(result.Item2);

            return Ok();
        }

    }
}
