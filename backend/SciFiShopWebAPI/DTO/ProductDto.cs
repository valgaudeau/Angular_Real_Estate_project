namespace SciFiShopWebAPI.DTO
{
  public class ProductDto
  {
    // THIS CLASS ONLY CONTAINS THE PROPERTIES THAT WE WANT EXPOSED TO OUR CLIENTS
    public int id { get; set; }
    public string name { get; set; } = null!; // without this null, the compiler warns us that it can't see where this non-nullable property is initialized. By writing null, we're saying we know what we're doing essentially and don't show me this error
    public int spaceshipOrRobot { get; set; }
    public int price { get; set; }
    public string imageUrl { get; set; }
    public int age { get; set; }
    public string description { get; set; }
  }
}
