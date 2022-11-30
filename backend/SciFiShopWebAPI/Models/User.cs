using System.ComponentModel.DataAnnotations;

namespace SciFiShopWebAPI.Models
{
  public class User
  {
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    // This class should include a lot more down the line, see https://www.youtube.com/watch?v=SryQxUeChMc
    // Things like orders, or maybe collection of likes, comments to other users, listed products.
  }
}
