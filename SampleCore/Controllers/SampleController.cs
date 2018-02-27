using Microsoft.AspNetCore.Mvc;

namespace SampleCore.Controllers
{
    [Route("api/[controller]")]
    public class SampleController : Controller
    {
        [HttpGet("version")]
        public string Version()
        {
            return "0.0.1";
        }
    }
}