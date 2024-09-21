using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AptEase_server.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AppCheckController : ControllerBase
    {
        public AppCheckController() { }

        [HttpGet]
        [Route("isAlive")]
        public IEnumerable<string> isAlive() 
        {
            return new string[] { "App works fine!"};
        }
    }
}
