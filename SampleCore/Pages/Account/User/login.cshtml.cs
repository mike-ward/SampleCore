﻿using System.Security.Authentication;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SampleCore.Models.Account.User;

namespace SampleCore.Pages.Account.User
{
    public class LoginModel : PageModel
    {
        private readonly UserManager _userManager;

        public LoginModel(UserManager userManager)
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
                await _userManager.SigninAysnc(HttpContext, UserIdentity);
                return RedirectToPage("/home");
            }
            catch (AuthenticationException e)
            {
                ViewData.Add("Error", e.Message);
                return Page();
            }
        }
    }
}