using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using SampleCore.Helpers;
using SampleCore.Infrastructure;
using SampleCore.Models.Account.User;

namespace SampleCore.Models.Account.FileIdentityStore
{
    public class FileBasedUserRepository : IUserRepository
    {
        private const int TimeoutInSeconds = 2;
        private static readonly ReaderWriterLock LockObj = new ReaderWriterLock();

        private static string GetFilePath()
        {
            return "App_Data/userdata.dat";
        }

        public async Task<List<UserIdentity>> ReadUsersAsync()
        {
            try
            {
                LockObj.AcquireReaderLock(TimeSpan.FromSeconds(TimeoutInSeconds));
                var path = GetFilePath();

                return !File.Exists(path)
                    ? new List<UserIdentity>()
                    : JsonConvert.DeserializeObject<List<UserIdentity>>(await File.ReadAllTextAsync(path));
            }
            catch (ApplicationException)
            {
                return new List<UserIdentity>();
            }
            finally
            {
                LockObj.ReleaseReaderLock();
            }
        }

        public async Task WriteUsersAsync(IEnumerable<UserIdentity> users)
        {
            Require.NotNull(users, nameof(users));

            try
            {
                LockObj.AcquireWriterLock(TimeSpan.FromSeconds(TimeoutInSeconds));
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

                await File.WriteAllTextAsync(path, JsonConvert.SerializeObject(users, Formatting.Indented));

                File.Delete(backup);
            }
            finally
            {
                LockObj.ReleaseWriterLock();
            }
        }

    }
}