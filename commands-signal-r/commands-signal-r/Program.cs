using commands_signal_r.DataContext;
using commands_signal_r.hubs;
using commands_signal_r.Repositories.Base;
using commands_signal_r.Repositories.Interfaces;
using commands_signal_r.Repositories.Services;
using Microsoft.EntityFrameworkCore;

namespace commands_signal_r
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //Auth Db Context Microsoft SQL Server
            builder.Services.AddDbContext<AuthDbContext>(options =>
            {
                options.UseSqlServer(
                builder.Configuration.GetConnectionString("DefaultAuthConnection") ?? throw new InvalidOperationException("Could not find connection string: 'DefaultAuthConnection'."));

                options.EnableSensitiveDataLogging();
            });


            //Application Db Context Microsoft SQL Server
            builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(
                builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Could not find connection string: 'DefaultConnection'.")));

            // Add services to the container.
            //builder.Services.AddScoped(typeof(IRepositoryBase<>), typeof(RepositoryBase<>));
            builder.Services.AddScoped<ISessionService, SessionService>();

            builder.Services.AddControllers();
            //Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //SignalR and CORS
            builder.Services.AddSignalR();
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials()
                          .WithOrigins("http://localhost:5173","http://theatre.whatisspace.online", "https://theatre.whatisspace.online");
                });
            });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors();
            app.MapHub<TheatreHub>("/theatrehub");

            app.UseHttpsRedirection();

            //app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
