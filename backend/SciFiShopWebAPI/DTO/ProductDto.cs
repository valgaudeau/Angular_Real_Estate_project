using System.ComponentModel.DataAnnotations;

namespace SciFiShopWebAPI.DTO
{
  public class ProductDto
  {
    // THIS CLASS ONLY CONTAINS THE PROPERTIES THAT WE WANT EXPOSED TO OUR CLIENTS
    public int id { get; set; }
    // Commented out the below because the Regex Validation is not working as intended - Come back to this later
    // [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage = "Purely numerical values are not allowed")]
    [Required (ErrorMessage = "Missing name attribute - Custom message")]
    [StringLength(50), MinLength(2)]
    public string name { get; set; }
    [Required]
    public int spaceshipOrRobot { get; set; }
    [Required]
    [RegularExpression(".")]
    public int price { get; set; }
    [Required]
    public string imageUrl { get; set; }
    [Required]
    public int age { get; set; }
    [Required]
    public string description { get; set; }
  }
}
