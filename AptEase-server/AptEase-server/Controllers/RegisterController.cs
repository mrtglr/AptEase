using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using AptEase_server.AppConfig;
using AptEase_server.Models;
using AptEase_server.Services;

namespace AptEase_server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private IEmailService _emailService;

        public RegisterController(UserManager<ApplicationUser> userManager, IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }

        [HttpPost]
        // route: /api/Register
        public async Task<Object> Register([FromBody] RegisterModel model)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.Fullname,
                UserRole = model.UserRole,
                PhoneNumber= model.PhoneNumber,
                DoorNumber= model.DoorNumber,
            };

            if (!_userManager.Users.Any(x => x.DoorNumber == applicationUser.DoorNumber)) {

                var registerCreadentials = new RegisterCreadentials()
                {
                    UserName = model.UserName,
                    Password = model.Password,
                };
                _emailService.Send(model.Email, 0, registerCreadentials);

                try
                {
                    var result = await _userManager.CreateAsync(applicationUser, model.Password);
                    return Ok(result);
                }
                catch (Exception)
                {
                    throw;
                }
            }
            else
            {
                return BadRequest("DuplicateDoorNumber");
            }
        }
    }
}