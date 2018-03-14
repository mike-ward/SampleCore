using System.Collections.Generic;
using System.Threading.Tasks;

namespace SampleCore.Infrastructure
{
    public interface IUserRepository
    {
        Task<List<IUserIdentity>> ReadUsersAsync();
        Task WriteUsersAsync(IEnumerable<IUserIdentity> users);
    }
}