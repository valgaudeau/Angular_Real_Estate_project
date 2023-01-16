using System.Runtime.Serialization;
using Microsoft.EntityFrameworkCore;
using SciFiShopWebAPI.Interfaces;
using SciFiShopWebAPI.Models;

namespace SciFiShopWebAPI.DBCommunication.Repositories
{
  public class UserRepository : IUserRepository
  {
    private readonly DatabaseCommunicator databaseCommunicator;

    public UserRepository(DatabaseCommunicator dbCommunicator)
    {
      this.databaseCommunicator = dbCommunicator;
    }

    public async Task<User> Authenticate(string username, string password)
    {
      // x is the User entries in the database in this lambda expression
      return await databaseCommunicator.Users.FirstOrDefaultAsync(x => x.Username == username && x.Password == password); 
    }
  }
}
