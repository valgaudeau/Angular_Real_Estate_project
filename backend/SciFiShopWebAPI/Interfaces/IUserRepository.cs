using SciFiShopWebAPI.Models;

namespace SciFiShopWebAPI.Interfaces
{
  public interface IUserRepository
  {
    Task<User> Authenticate(string username, string password);
  }
}
