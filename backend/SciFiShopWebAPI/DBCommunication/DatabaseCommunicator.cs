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
    public DatabaseCommunicator(DbContextOptions<DatabaseCommunicator> options) : base(options)
    {

    }

    // Moved this into program class
    /*    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) // Here we can include some configuration information
        {
          optionsBuilder.UseSqlServer(Configuration.GetConnectionString("SciFiShopDatabase")); // Since we're using sql, we have UseSqlServer method available to us to configure the Sql service provider.
        }*/

    public DbSet<Product> Products { get; set; } // Each DbSet matches to a database table

    public DbSet<User> Users { get; set; }
  }
}
