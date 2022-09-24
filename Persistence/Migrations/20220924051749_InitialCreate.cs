using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
	public partial class InitialCreate : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				name: "Activities",
				columns: colBuilder => new
				{
					ID = colBuilder.Column<Guid>(type: "TEXT", nullable: false),
					Title = colBuilder.Column<string>(type: "TEXT", nullable: true),
					Date = colBuilder.Column<DateTime>(type: "TEXT", nullable: false),
					Description = colBuilder.Column<string>(type: "TEXT", nullable: true),
					Category = colBuilder.Column<string>(type: "TEXT", nullable: true),
					City = colBuilder.Column<string>(type: "TEXT", nullable: true),
					Venue = colBuilder.Column<string>(type: "TEXT", nullable: true)
				},
				constraints: tabler =>
				{
					tabler.PrimaryKey("PK_Activities", x => x.ID);
				});
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
					name: "Activities");
		}
	}
}
