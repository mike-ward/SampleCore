using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using SampleCore.Extensions;
using SampleCore.Helpers;
using SampleCore.Infrastructure;
using SampleCore.Models.Account.User;

namespace SampleCore.Models.Account.FileIdentityStore
{
    public class FileBasedUserRepository : IUserRepository
    {
        private readonly IUserIdentity _userIdentity;
        private static readonly SemaphoreSlim  _lock = new SemaphoreSlim(1);

        public FileBasedUserRepository(IUserIdentity userIdentity)
        {
            _userIdentity = userIdentity;
        }

        private static string GetFilePath()
        {
            return "wwwroot/App_Data/userdata.json";
        }

        private async Task CreateRepository(IUserIdentity userIdentity)
        {
            userIdentity.UserName = "Administrator";
            userIdentity.Email = "admin@admin.com";
            userIdentity.Password = "admin".HashPassword(userIdentity.Id);
            userIdentity.Claims = "admin";
            await WriteUsersAsync(new[] { userIdentity });
        }

        public async Task<List<IUserIdentity>> ReadUsersAsync()
        {
            var path = GetFilePath();
            if (!File.Exists(path))
            {
                await CreateRepository(_userIdentity);
            }

            string content;
            await _lock.WaitAsync();
            try
            {
                content = File.ReadAllText(path);
            }
            finally
            {
                _lock.Release();
            }

            var users = JsonConvert.DeserializeObject<List<UserIdentity>>(content);
            return users.Cast<IUserIdentity>().ToList();
        }

        public async Task WriteUsersAsync(IEnumerable<IUserIdentity> users)
        {
            Require.NotNull(users, nameof(users));

            var path = GetFilePath();
            var name = Path.GetFileNameWithoutExtension(path);
            var dir = Path.GetDirectoryName(path);
            if (dir == null) throw new Exception("Cannot get repository directory");
            var backup = Path.Combine(dir, name + ".bak");

            // Remove Backup
            if (File.Exists(backup))
            {
                File.Delete(backup);
            }

            // Rename existing file
            if (File.Exists(path))
            {
                File.Move(path, backup);
            }

            var content = JsonConvert.SerializeObject(users, Formatting.Indented);

            await _lock.WaitAsync();
            try
            {
                await File.WriteAllTextAsync(path, content);
            }
            finally
            {
                _lock.Release();
            }

            File.Delete(backup);
        }
    }
}