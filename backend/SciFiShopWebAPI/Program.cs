using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SciFiShopWebAPI.DBCommunication;
using SciFiShopWebAPI.Interfaces;
using System.Text;

namespace SciFiShopWebAPI
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);

      // Add services to the container.
      builder.Services.AddControllers();
      // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen();
      // This should register the DbContext with .NET CORE's dependency injection container
      builder.Services.AddDbContext<DatabaseCommunicator>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("SciFiShopDatabase")));
      builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

      var secretKey = builder.Configuration.GetSection("AppSettings:Key").Value;
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
      // See obsidian notes for what each TokenValidationParameter properties we've set in the TokenValidationParameters class does
      builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                      .AddJwtBearer(options =>
                      {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                          ValidateIssuerSigningKey = true,
                          ValidateIssuer = false,
                          ValidateAudience = false,
                          IssuerSigningKey = key
                        };
                      });

      // Enable CORS (Cross-Origin Resource Sharing)
      var myCorsPolicy = "appCors";
      builder.Services.AddCors(options =>
      {
        options.AddPolicy(myCorsPolicy, policy =>
        {
          policy.WithOrigins("http://localhost:5135").AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        });
      });

      var app = builder.Build();

      // Configure the HTTP request pipeline. 
      if (app.Environment.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }

      // All of these Use methods are part of the MIDDLEWARE
      app.UseCors();
      app.UseAuthentication(); // this must be placed before Authorization for obvious reasons
      app.UseAuthorization();

      app.MapControllers();

      app.Run();
    }
  }
}
