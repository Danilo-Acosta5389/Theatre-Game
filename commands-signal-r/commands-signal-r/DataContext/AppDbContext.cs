using commands_signal_r.Models;
using Microsoft.EntityFrameworkCore;

namespace commands_signal_r.DataContext
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<SessionModel> Sessions { get; set; }
        public DbSet<RoleModel> Roles { get; set; }
        public DbSet<FunctionModel> Functions { get; set; }
        public DbSet<CommandModel> Commands { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // SESSION relationships
            modelBuilder.Entity<RoleModel>()
                .HasOne(r => r.Session)
                .WithMany(s => s.Roles)
                .HasForeignKey(r => r.SessionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FunctionModel>()
                .HasOne(f => f.Session)
                .WithMany(s => s.Functions)
                .HasForeignKey(f => f.SessionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CommandModel>()
                .HasOne(c => c.Session)
                .WithMany(s => s.Commands)
                .HasForeignKey(c => c.SessionId)
                .OnDelete(DeleteBehavior.NoAction);


            // ROLE relationships
            modelBuilder.Entity<CommandModel>()
                .HasOne(c => c.Role)
                .WithMany(r => r.Commands)
                .HasForeignKey(c => c.RoleId)
                .OnDelete(DeleteBehavior.Cascade);


            // FUNCTION relationships
            modelBuilder.Entity<CommandModel>()
                .HasOne(c => c.Function)
                .WithMany(f => f.Commands)
                .HasForeignKey(c => c.FunctionId)
                .OnDelete(DeleteBehavior.NoAction);
        }

    }
}
