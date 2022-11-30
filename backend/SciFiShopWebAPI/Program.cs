using Microsoft.EntityFrameworkCore;
using SciFiShopWebAPI.DBCommunication;

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

      app.UseCors();

      app.UseAuthorization();


      app.MapControllers();

      app.Run();
    }
  }
}
