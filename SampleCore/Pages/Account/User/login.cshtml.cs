using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SampleCore.Models.Account.User;

namespace SampleCore.Pages.Account.User
{
    public class LoginModel : PageModel
    {
        [BindProperty]
        public UserModel UserModel { get; set; }

        public IActionResult OnPost()
        {
            return UserModel.Email == "admin@admin.com" && UserModel.Password == "admin" 
                ? (IActionResult) RedirectToPage("~/home") 
                : Page();
        }
    }
}