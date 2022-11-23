using Microsoft.EntityFrameworkCore;
using SciFiShopWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SciFiShopWebAPI.DBCommunication
{
  public class DatabaseCommunicator : DbContext // DbContext represents a session in the database
  {
    protected readonly IConfiguration Configuration;

    public DatabaseCommunicator(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public DbSet<Product> Products { get; set; } = null!; // Each DbSet matches to a database table

/*    public DatabaseCommunicator(DbContextOptions<DatabaseCommunicator> options) : base(options)
    {

    }*/

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) // Here we can include some configuration information
    {
      optionsBuilder.UseSqlServer(Configuration.GetConnectionString("SciFiShopDatabase")); // Since we're using sql, we have UseSqlServer method available to us to configure the Sql service provider.
    }

  }
}
