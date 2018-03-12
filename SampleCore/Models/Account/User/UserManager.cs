using System.Collections.Generic;
using System.Security.Authentication;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;

namespace SampleCore.Models.Account.User
{
    public class UserManager
    {
        public async Task SigninAysnc(HttpContext context, UserIdentity userIdentity)
        {
            if (userIdentity.Email != "admin@admin.com" || userIdentity.Password != "admin")
            {
                throw new AuthenticationException("Unknown user or password");
            }

            var identity = new ClaimsIdentity(GetUserClaims(userIdentity), CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);
            await context.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
        }

        private IEnumerable<Claim> GetUserClaims(UserIdentity user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            return claims;
        }
    }
}