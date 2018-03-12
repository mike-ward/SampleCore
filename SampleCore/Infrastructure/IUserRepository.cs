using System.Collections.Generic;
using System.Threading.Tasks;
using SampleCore.Models.Account.User;

namespace SampleCore.Infrastructure
{
    public interface IUserRepository
    {
        Task<List<UserIdentity>> ReadUsersAsync();
        Task WriteUsersAsync(IEnumerable<UserIdentity> users);
    }
}