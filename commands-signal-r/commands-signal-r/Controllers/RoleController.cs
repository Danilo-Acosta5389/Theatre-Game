using commands_signal_r.hubs;
using Microsoft.AspNetCore.Mvc;

namespace commands_signal_r.Controllers
{
    [ApiController]
    [Route("api/role")]
    public class RoleController : ControllerBase
    {
        [HttpPost("register/{sessionId}/{roleName}")]
        public async Task<IActionResult> Register(string sessionId, string roleName)
        {

            var created = await TheatreHub.RegisterRole(sessionId, roleName);

            if (!created)
                return Conflict("Something went wrong");

            return Ok();
        }

        //[HttpPost("check/{roleName}")]
        //public IActionResult Check(string sessionId)
        //{

        //    var exist = TheatreHub.SessionExists(sessionId);

        //    if (!exist)
        //        return Conflict("Session could not be found");

        //    return Ok();
        //}

    }
}
