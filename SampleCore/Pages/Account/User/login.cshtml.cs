using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SampleCore.Models.Account.User;

namespace SampleCore.Pages.Account.User
{
    public class LoginModel : PageModel
    {
        [BindProperty]
        public UserIdentity UserIdentity { get; set; }

        public IActionResult OnPost()
        {
            return UserIdentity.Email == "admin@admin.com" && UserIdentity.Password == "admin" 
                ? (IActionResult) RedirectToPage("/home") 
                : Page();
        }
    }
}