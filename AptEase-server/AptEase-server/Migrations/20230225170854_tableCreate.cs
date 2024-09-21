using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AptEase_server.Migrations
{
    public partial class tableCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BillPaymentRules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BillAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CutOffDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillPaymentRules", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillPaymentRules");
        }
    }
}
