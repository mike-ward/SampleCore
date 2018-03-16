using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SampleCore.Infrastructure;

namespace SampleCore.Controllers.Account.Admin
{
    [Authorize]
    [Route("account/admin/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("all-users")]
        [Authorize(Policy = "administrator")]
        public async Task<IEnumerable<IUserIdentity>> AllUsers()
        {
            return await _userRepository.ReadUsersAsync();
        }
    }
}