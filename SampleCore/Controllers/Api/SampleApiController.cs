using Microsoft.AspNetCore.Mvc;

namespace SampleCore.Controllers.Api
{
    [Route("api/[controller]")]
    public class SampleApiController : Controller
    {
        [HttpGet("version")]
        public string Version() => "0.0.1";
    }
}