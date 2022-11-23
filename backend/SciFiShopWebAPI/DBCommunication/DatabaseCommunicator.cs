using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SciFiShopWebAPI.DBCommunication
{
    public class DatabaseCommunicator : DbContext
    {

      public DatabaseCommunicator(DbContextOptions<DatabaseCommunicator> options): base(options)
      {
        
      } 

    }
}
