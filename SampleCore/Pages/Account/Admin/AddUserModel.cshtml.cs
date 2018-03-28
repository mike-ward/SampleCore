using System.Security.Authentication;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SampleCore.Infrastructure;
using SampleCore.Models.Account.User;

namespace SampleCore.Pages.Account.Admin
{
    public class AddUserModel : PageModel
    {
        private readonly IUserManager _userManager;

        public AddUserModel(IUserManager userManager)
        {
            _userManager = userManager;
        }

        [BindProperty]
        public UserIdentity UserIdentity { get; set; }

        public async Task<IActionResult> OnPost()
        {
            try
            {
                if (!ModelState.IsValid) return Page();
                await _userManager.CreateUser(UserIdentity);
                return RedirectToPage("/account/admin/dashboard");
            }
            catch (AuthenticationException e)
            {
                ViewData.Add("Error", e.Message);
                return Page();
            }
        }
    }
}