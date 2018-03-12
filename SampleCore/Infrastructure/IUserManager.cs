using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using SampleCore.Models.Account.User;

namespace SampleCore.Infrastructure
{
    public interface IUserManager
    {
        Task SigninAysnc(HttpContext context, UserIdentity userIdentity);
        Task Signout(HttpContext context);
        Task CreateUser(UserIdentity userIdentity);
        Task DeleteUser(UserIdentity userIdentity);
        Task UpdateUser(UserIdentity userIdentity);
        Task<UserIdentity> FindUser(Guid id);
    }
}