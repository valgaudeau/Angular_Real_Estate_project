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
    public int Id { get; set; }
    public string Name { get; set; } = null!; // without this null, the compiler warns us that it can't see where this non-nullable property is initialized. By writing null, we're saying we know what we're doing essentially and don't show me this error
    public int SpaceshipOrRobot { get; set; }
    public int Price { get; set; }
    public string ImageUrl { get; set; }
    public int Age { get; set; }
    public string Description { get; set; }

    public Product(int id, string name, int spaceshipOrRobot, int price, string imageUrl, int age, string description)
    {
      id = Id;
      Name = name;
      SpaceshipOrRobot = spaceshipOrRobot;
      Price = price;
      ImageUrl = imageUrl;
      Age = age;
      Description = description;
    }

  }



}
