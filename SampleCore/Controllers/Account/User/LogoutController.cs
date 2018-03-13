using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SampleCore.Infrastructure;

namespace SampleCore.Controllers.Account.User
{
    [Route("account/user/[controller]")]
    public class LogoutController : Controller
    {
        private readonly IUserManager _userManager;

        public LogoutController(IUserManager userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            await _userManager.Signout(HttpContext);
            return RedirectToPage("/index");
        }
    }
}