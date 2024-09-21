using Microsoft.EntityFrameworkCore;
using AptEase_server.Models;

namespace AptEase_server.Context
{
    public class AptEaseContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public AptEaseContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(Configuration.GetConnectionString("MsSql"));
        }

        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<BillPaymentRule> BillPaymentRules { get; set; }
        public DbSet<Transection> Transections { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<ChatHistory> ChatHistory { get; set; }
    }
}
