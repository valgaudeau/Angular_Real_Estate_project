using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SciFiShopWebAPI.Models
{
  public class Product
  {
    // IMPORTANT NOTE:
    // YES THE PROPERTY NAMES START WITH LOWER CASE. I believe this was because of the issue I was having
    // when I was trying to save data from frontend to backend where casing didn't match. Have to double
    // check, but be careful about going about changing these for now, although it will need to be fixed.
    // I remember having to change names to lower case in Angular IProduct interface, might be fine to
    // change the casing in the backend, but keep that in mind anyway. 
    [Key] // Primary Key
    public int id { get; set; }
    public string name { get; set; } = null!; // without this null, the compiler warns us that it can't see where this non-nullable property is initialized. By writing null, we're saying we know what we're doing essentially and don't show me this error
    public int spaceshipOrRobot { get; set; }
    public int price { get; set; }
    public string imageUrl { get; set; }
    public int age { get; set; }
    public string description { get; set; }
    // We don't want lastUpdatedOn and lastUpdatedBy exposed publicly, which is why we have DTO 
    public DateTime lastUpdatedOn { get; set; }
    public int lastUpdatedBy { get; set; }

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

    public Product()
    {

    }

  }
}
