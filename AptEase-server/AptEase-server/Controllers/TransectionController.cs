using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AptEase_server.Models;
using AptEase_server.Repositories;

namespace AptEase_server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TransectionController : ControllerBase
    {
        private readonly ITransectionRepository _transectionRepo;

        public TransectionController(ITransectionRepository transectionRepo)
        {
            _transectionRepo = transectionRepo;
        }


        [HttpGet]
        [Route("list")]
        public IQueryable<Transection> List()
        {
            return _transectionRepo.List();
        }

        [HttpGet]
        [Route("listForUser")]
        public IQueryable<Transection> ListForUser()
        {
            var user_id = User.Claims.First(c => c.Type == "UserID").Value;
            return _transectionRepo.ListForUser(user_id);
        }

        [HttpPost]
        [Route("createTransection")]
        public async Task<int> CreateTransection([FromBody] Transection transection)
        {
            var user_id = User.Claims.First(c => c.Type == "UserID").Value;
            return await _transectionRepo.CreateTransection(transection, user_id);
        }

        [HttpPost]
        [Route("approveTransection")]
        public async Task<int> ApproveTransection(int transection_id)
        {
            return await _transectionRepo.ApproveTransection(transection_id);
        }

        [HttpPost]
        [Route("rejectTransection")]
        public async Task<int> RejectTransection(int transection_id)
        {
            return await _transectionRepo.RejectTransection(transection_id);
        }
    }
}
