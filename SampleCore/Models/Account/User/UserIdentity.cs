using System;
using Microsoft.AspNetCore.Mvc.Internal;

namespace SampleCore.Models.Account.User
{
    public class UserIdentity
    {
        public UserIdentity()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public string UserName;
        public string Password { get; set; }
        public string Claims { get; set; } = "";
        public string Email { get; set; } = "";
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime Modified { get; set; } = DateTime.UtcNow;
        public DateTime LoggedIn { get; set; } = default(DateTime);
        public DateTime PasswordChanged { get; set; } = default(DateTime);
        public Guid ResetToken { get; set; } = default(Guid);
        public bool Locked { get; set; }
    }
}