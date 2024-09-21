using Microsoft.AspNetCore.Identity;
using AptEase_server.Context;
using AptEase_server.Models;
using AptEase_server.Services;

namespace AptEase_server.Repositories
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly AptEaseContext _context;
        private IEmailService _emailService;

        public AnnouncementRepository(AptEaseContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public IQueryable<Announcement> List()
        {
            return _context.Announcements
                .OrderByDescending(x => x.CreateDate);
        }

        public async Task CreateAnnouncement(Announcement announcement)
        {
            announcement.CreateDate= DateTime.Now;
            await _context.AddAsync(announcement);
            _emailService.SendAnnouncements(announcement.Header, announcement.Body);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAnnouncement(int announcement_id)
        {
            var announcement = _context.Announcements.FirstOrDefault(x => x.Id== announcement_id);
            _context.Remove(announcement);
            await _context.SaveChangesAsync();
        }
    }

    public interface IAnnouncementRepository
    {
        IQueryable<Announcement> List();
        Task CreateAnnouncement(Announcement announcement);
        Task DeleteAnnouncement(int announcement_id);
    }
}
