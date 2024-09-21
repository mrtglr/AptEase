

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AptEase_server.Models;
using AptEase_server.Repositories;

namespace AptEase_server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnouncementRepository _announcementRepo;

        public AnnouncementController(IAnnouncementRepository announcementRepo)
        {
            _announcementRepo = announcementRepo;
        }

        [HttpGet]
        [Route("list")]
        public IQueryable<Announcement> List()
        {
            return _announcementRepo.List();
        }

        [HttpPost]
        [Route("createAnnouncement")]
        public Task CreateAnnouncement([FromBody] Announcement announcement)
        {
            return _announcementRepo.CreateAnnouncement(announcement);
        }

        [HttpDelete]
        [Route("deleteAnnouncement")]
        public Task DeleteAnnouncement(int announcement_id)
        {
            return _announcementRepo.DeleteAnnouncement(announcement_id);
        }
    }
}
