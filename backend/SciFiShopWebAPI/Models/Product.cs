using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SciFiShopWebAPI.Models
{
  public class Product
  {
    [Key] // Primary Key
    public int id { get; set; }
    public string name { get; set; } = null!; // without this null, the compiler warns us that it can't see where this non-nullable property is initialized. By writing null, we're saying we know what we're doing essentially and don't show me this error
    public int spaceshipOrRobot { get; set; }
    public int price { get; set; }
    public string imageUrl { get; set; }
    public int age { get; set; }
    public string description { get; set; }

    public Product(int Id, string Name, int SpaceshipOrRobot, int Price, string ImageUrl, int Age, string Description)
    {
      id = Id;
      name = Name;
      spaceshipOrRobot = SpaceshipOrRobot;
      price = Price;
      imageUrl = ImageUrl;
      age = Age;
      description = Description;
    }

  }
}
