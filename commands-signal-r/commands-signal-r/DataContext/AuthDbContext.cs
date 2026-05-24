using commands_signal_r.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace commands_signal_r.DataContext
{
    public class AuthDbContext : IdentityDbContext<ExtendedUser>
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) { }

    }
}
