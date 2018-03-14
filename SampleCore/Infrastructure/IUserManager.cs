using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace SampleCore.Infrastructure
{
    public interface IUserManager
    {
        Task SigninAysnc(HttpContext context, IUserIdentity userIdentity);
        Task Signout(HttpContext context);
        Task CreateUser(IUserIdentity userIdentity);
        Task DeleteUser(IUserIdentity userIdentity);
        Task UpdateUser(IUserIdentity userIdentity);
        Task<IUserIdentity> FindUser(Guid id);
    }
}