using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace commands_signal_r.Migrations.AppDb
{
    /// <inheritdoc />
    public partial class SessionMaster : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SessionMasterId",
                table: "Sessions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SessionMasterId",
                table: "Sessions");
        }
    }
}
