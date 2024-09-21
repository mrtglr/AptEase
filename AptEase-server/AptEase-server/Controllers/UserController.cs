using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using AptEase_server.AppConfig;
using AptEase_server.Models;
using AptEase_server.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AptEase_server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;

        public UserController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet]
        [Route("user")]
        public async Task<ApplicationUser> GetCurrentUser()
        {
            return await _userRepo.GetUser(User.Claims.First(c => c.Type == "UserID").Value);
        }

        [HttpGet]
        [Route("list")]
        public IQueryable<ApplicationUser> List()
        {
            return _userRepo.List();
        }

        [HttpGet]
        [Route("getUser")]
        public async Task<ApplicationUser> GetUser(string user_id)
        {
            return await _userRepo.GetUser(user_id);
        }

        [HttpDelete]
        [Route("removeUser")]
        public async Task<IdentityResult> RemoveUser(string user_id)
        {
            var admin_user_id = User.Claims.First(c => c.Type == "UserID").Value;
            return await _userRepo.RemoveUser(user_id, admin_user_id);
        }

        [HttpPut]
        [Route("updateUser")]
        public void UpdateUserAsync([FromBody] ApplicationUserUpdateModel userUpdate)
        {
            var user_id = User.Claims.First(c => c.Type == "UserID").Value;
            _userRepo.UpdateUserAsync(userUpdate, user_id);
        }

        [HttpPut]
        [Route("updatePassword")]
        public Task<bool> ChangePassword([FromBody] PasswordUpdateModel passwordUpdateModel)
        {
            var user_id = User.Claims.First(c => c.Type == "UserID").Value;
            return _userRepo.ChangePassword(passwordUpdateModel, user_id);
        }

        [HttpGet]
        [Route("updateUserSession")]
        public Task<bool> UpdateUserSession()
        {
            return Task.FromResult(true);
        }
    }
}
