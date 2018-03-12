using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using SampleCore.Extensions;
using SampleCore.Helpers;
using SampleCore.Infrastructure;

namespace SampleCore.Models.Account.User
{
    public class UserManager : IUserManager
    {
        private readonly IUserRepository _userRepository;

        public UserManager(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task SigninAysnc(HttpContext context, UserIdentity userIdentity)
        {
            if (userIdentity.Email != "admin@admin.com" || userIdentity.Password != "admin")
            {
                throw new AuthenticationException("Unknown user or password");
            }

            var identity = new ClaimsIdentity(CreateUserClaims(userIdentity), CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);
            await context.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
        }

        public async Task Signout(HttpContext context)
        {
            await context.SignOutAsync();
        }

        public async Task CreateUser(UserIdentity userIdentity)
        {
            Require.NotNull(userIdentity, nameof(userIdentity));
            Require.ArgumentNotNullEmpty(userIdentity.Email, nameof(userIdentity.Email));
            Require.ArgumentNotNullEmpty(userIdentity.Password, nameof(userIdentity.Password));

            var users = await _userRepository.ReadUsersAsync();
            if (users.Any(user => user.Email.IsEqualToIgnoreCase(userIdentity.Email))) throw new AuthenticationException("User already exists");

            userIdentity.Password = userIdentity.Password.HashPassword(userIdentity.Id);
            users.Add(userIdentity);
            await _userRepository.WriteUsersAsync(users);
        }

        public async Task DeleteUser(UserIdentity userIdentity)
        {
            Require.NotNull(userIdentity, nameof(userIdentity));
            Require.ArgumentNotNullEmpty(userIdentity.Email, nameof(userIdentity.Email));
            Require.ArgumentNotNullEmpty(userIdentity.Password, nameof(userIdentity.Password));

            var users = await _userRepository.ReadUsersAsync();
            var index = users.Where(user => user.Id == userIdentity.Id).Select((user, idx) => new int?(idx)).FirstOrDefault() ?? -1;
            if (index == -1) throw new AuthenticationException("User not found");
            users.RemoveAt(index);
            await _userRepository.WriteUsersAsync(users);
        }

        public async Task UpdateUser(UserIdentity userIdentity)
        {
            Require.NotNull(userIdentity, nameof(userIdentity));
            Require.ArgumentNotNullEmpty(userIdentity.Email, nameof(userIdentity.Email));
            Require.ArgumentNotNullEmpty(userIdentity.Password, nameof(userIdentity.Password));

            var users = await _userRepository.ReadUsersAsync();
            var user = users.FirstOrDefault(u => u.Id == userIdentity.Id) ?? throw new AuthenticationException("User not found");
            if (user.Password != userIdentity.Password) user.PasswordChanged = DateTime.UtcNow;
            user.Email = userIdentity.Email;
            user.Password = userIdentity.Password;
            user.UserName = userIdentity.UserName;
            user.Claims = userIdentity.Claims;
            user.Modified = DateTime.UtcNow;
            await _userRepository.WriteUsersAsync(users);
        }

        public async Task<UserIdentity> FindUser(Guid id)
        {
            Require.True(() => id != Guid.Empty);
            var users = await _userRepository.ReadUsersAsync();
            var user = users.FirstOrDefault(u => u.Id == id) ?? throw new AuthenticationException("User not found");
            return user;
        }

        private static IEnumerable<Claim> CreateUserClaims(UserIdentity user)
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