using System.ComponentModel.DataAnnotations;

namespace SciFiShopWebAPI.Models
{
  public class User
  {
    public int Id { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public byte[] Password { get; set; }
    [Required]
    public byte[] PasswordKey { get; set; }
    // This class should include a lot more down the line, see https://www.youtube.com/watch?v=SryQxUeChMc
    // Things like orders, or maybe collection of likes, comments to other users, listed products.
  }
}
