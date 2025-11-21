using commands_signal_r.hubs;
using Microsoft.AspNetCore.Mvc;

namespace commands_signal_r.Controllers
{
    [ApiController]
    [Route("api/session")]
    public class SessionController : ControllerBase
    {
        [HttpPost("create/{sessionId}")]
        public IActionResult Create(string sessionId)
        {

            var created = TheatreHub.CreateSessionInternal(sessionId);

            if (!created)
                return Conflict("Session already exists");

            return Ok();
        }

        [HttpPost("check/{sessionId}")]
        public IActionResult Check(string sessionId)
        {

            var exist = TheatreHub.SessionExists(sessionId);

            if (!exist)
                return Conflict("Session could not be found");

            return Ok();
        }
    }
}
