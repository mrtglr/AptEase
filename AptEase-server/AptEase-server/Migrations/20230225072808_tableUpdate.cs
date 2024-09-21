using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AptEase_server.Migrations
{
    public partial class tableUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DoorNumber",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DoorNumber",
                table: "Users");
        }
    }
}
