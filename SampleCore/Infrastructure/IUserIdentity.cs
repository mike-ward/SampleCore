using System;

namespace SampleCore.Infrastructure
{
    public interface IUserIdentity
    {
        Guid Id { get; set; }
        string UserName { get; set; }
        string Password { get; set; }
        string Claims { get; set; }
        string Email { get; set; }
        DateTime Created { get; set; }
        DateTime Modified { get; set; }
        DateTime LoggedIn { get; set; }
        DateTime PasswordChanged { get; set; }
        Guid ResetToken { get; set; }
        bool Locked { get; set; }
    }
}