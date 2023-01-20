using System.Runtime.Serialization;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using System.Text;
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

    public async Task<User> Authenticate(string username, string passwordText)
    {
      // x is the User entries in the database in this lambda expression

      var user = await databaseCommunicator.Users.FirstOrDefaultAsync(x => x.Username == username);

      if (user == null || user.PasswordKey == null)
      {
        return null;
      }

      if (!MatchPasswordHashes(passwordText, user.Password, user.PasswordKey))
      {
        return null;
      }

      return user;
    }

    private bool MatchPasswordHashes(string passwordText, byte[] password, byte[] passwordKey)
    {
      // The hmac is created with the same key t hat was originally used for hashing the password when the user
      // first signed up. Therefore, both the password and the passwordHash variable to which we're comparing it
      // should match if the user entered their password correctly 
      using (var hmac = new HMACSHA512(passwordKey))
      {
        var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));

        for (int i = 0; i < passwordHash.Length; i++)
        {
          if (passwordHash[i] != password[i])
          {
            return false;
          }
        }
      }

      return true;
    }

    // REGISTER() CODE BREAKDOWN:
    // HMAC is an acronym for Hash-based Message Authentication Code. The namespace for this class is System.Security.Cryptocraphy.
    // We save the Sort Key in the passwordKey variable by using the hmac.Key property (I assume its a property at least).
    // this is a random key that gets generated where the class is initialized. We then generate and save the password hash using
    // the ComputeHash method, which takes a byte array as an argument, and we can pass it our password. Note that the Register
    // method takes password as an argument of string type. This is because when the client calls the API, this is the format
    // under which the entered password will be, and that's why we need to call the GetBytes() method on the password before we
    // pass it to the ComputeHash method. All of the information is then added to a User object, and saved into the database.
    public void Register(string username, string password)
    {
      byte[] passwordHash, passwordKey;

      using (var hmac = new HMACSHA512())
      {
        passwordKey = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }

      User user = new User();
      user.Username = username;
      user.Password = passwordHash;
      user.PasswordKey = passwordKey;
      databaseCommunicator.Users.Add(user);
    }

    public async Task<bool> UserAlreadyExists(string username)
    {
      return await databaseCommunicator.Users.AnyAsync(x => x.Username == username);
    }
  }
}
