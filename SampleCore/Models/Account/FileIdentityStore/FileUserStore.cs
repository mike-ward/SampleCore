using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using SampleCore.Extensions;
using SampleCore.Models.Account.User;

namespace SampleCore.Models.Account.FileIdentityStore
{
    public class FileUserStore : IUserPasswordStore<UserIdentity>
    {
        public void Dispose()
        {
        }

        public async Task<string> GetUserIdAsync(UserIdentity userIdentity, CancellationToken cancellationToken)
        {
            var users = await FileRepository.ReadUsers();
            var user = UserFromId(userIdentity.Id, users);
            return user.Id.ToString();
        }

        public async Task<string> GetUserNameAsync(UserIdentity userIdentity, CancellationToken cancellationToken)
        {
            var users = await FileRepository.ReadUsers();
            var user = UserFromId(userIdentity.Id, users);
            return user.UserName;
        }

        public Task SetUserNameAsync(UserIdentity userIdentity, string userName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetNormalizedUserNameAsync(UserIdentity userIdentity, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetNormalizedUserNameAsync(UserIdentity userIdentity, string normalizedName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<IdentityResult> CreateAsync(UserIdentity userIdentity, CancellationToken cancellationToken)
        {
            var user = new UserIdentity { UserName = userIdentity.UserName };
            user.Password = userIdentity.Password.HashPassword(user.Id);
            var users = await FileRepository.ReadUsers();
            var updatedUsers = users.Concat(new [] { user });
            await FileRepository.WriteUsers(updatedUsers);
            return IdentityResult.Success;
        }

        public Task<IdentityResult> UpdateAsync(UserIdentity userIdentity, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> DeleteAsync(UserIdentity userIdentity, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<UserIdentity> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            var users = await FileRepository.ReadUsers();
            var user = UserFromId(Guid.Parse(userId), users);
            return user;
        }

        public Task<UserIdentity> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task SetPasswordHashAsync(UserIdentity user, string passwordHash, CancellationToken cancellationToken)
        {
            var users = await FileRepository.ReadUsers();
            var auser = UserFromId(user.Id, users);
            auser.Password = passwordHash;
            await FileRepository.WriteUsers(users);
        }

        public async Task<string> GetPasswordHashAsync(UserIdentity user, CancellationToken cancellationToken)
        {
            var users = await FileRepository.ReadUsers();
            var auser = UserFromId(user.Id, users);
            return auser.Password;
        }

        public async Task<bool> HasPasswordAsync(UserIdentity user, CancellationToken cancellationToken)
        {
            var users = await FileRepository.ReadUsers();
            var auser = UserFromId(user.Id, users);
            return auser != null && !string.IsNullOrWhiteSpace(auser.Password);
        }

        private static UserIdentity UserFromId(Guid id, IEnumerable<UserIdentity> users)
        {
            return users.SingleOrDefault(u => u.Id == id);
        }
    }
}
