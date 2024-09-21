using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AptEase_server.Migrations
{
    public partial class AnnouncementTblUpt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "sendUserId",
                table: "Announcements",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Announcements_sendUserId",
                table: "Announcements",
                column: "sendUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Announcements_Users_sendUserId",
                table: "Announcements",
                column: "sendUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Announcements_Users_sendUserId",
                table: "Announcements");

            migrationBuilder.DropIndex(
                name: "IX_Announcements_sendUserId",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "sendUserId",
                table: "Announcements");
        }
    }
}
