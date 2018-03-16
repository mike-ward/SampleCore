using System;
using System.Collections.Generic;
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

        public async Task SigninAysnc(HttpContext context, IUserIdentity userIdentity)
        {
            var users = await _userRepository.ReadUsersAsync();

            var user = users.SingleOrDefault(usr => 
                usr.Email.IsEqualToIgnoreCase(userIdentity.Email) && 
                usr.Password.IsEqualTo(userIdentity.Password.HashPassword(usr.Id)));

            if (user == null)
            {
                throw new AuthenticationException("Unknown user or password");
            }

            user.LoggedIn = DateTime.UtcNow;
            await _userRepository.WriteUsersAsync(users);

            var identity = new ClaimsIdentity(CreateUserClaims(user), CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);

            await context.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
        }

        public async Task Signout(HttpContext context)
        {
            await context.SignOutAsync();
        }

        public async Task CreateUser(IUserIdentity userIdentity)
        {
            Require.NotNull(userIdentity, nameof(userIdentity));
            Require.ArgumentNotNullEmpty(userIdentity.Email, nameof(userIdentity.Email));
            Require.ArgumentNotNullEmpty(userIdentity.Password, nameof(userIdentity.Password));

            var users = await _userRepository.ReadUsersAsync();
            if (users.Any(user => user.Email.IsEqualToIgnoreCase(userIdentity.Email))) throw new AuthenticationException("User already exists");

            userIdentity.Password = userIdentity.Password.HashPassword(userIdentity.Id);
            if (string.IsNullOrWhiteSpace(userIdentity.UserName)) userIdentity.UserName = userIdentity.Email;
            users.Add(userIdentity);
            await _userRepository.WriteUsersAsync(users);
        }

        public async Task DeleteUser(IUserIdentity userIdentity)
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

        public async Task UpdateUser(IUserIdentity userIdentity)
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

        public async Task<IUserIdentity> FindUser(Guid id)
        {
            Require.True(() => id != Guid.Empty);
            var users = await _userRepository.ReadUsersAsync();
            var user = users.FirstOrDefault(u => u.Id == id) ?? throw new AuthenticationException("User not found");
            return user;
        }

        private static IEnumerable<Claim> CreateUserClaims(IUserIdentity user)
        {
            var userClaims = string.IsNullOrWhiteSpace(user.Claims) ? new string[0] : user.Claims.Split(",");
            var claims = userClaims.Select(claim => new Claim(ClaimTypes.Role, claim)).ToList();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Email, user.Email));
            return claims;
        }
    }
}