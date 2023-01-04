namespace SciFiShopWebAPI.DTO
{
  // The purpose of this DTO is to handle Product Name updates using PUT method
  // See note for why PUT requires more code but is still preferable to PATCH
  public class ProductDtoUpdateName
  {
    public string name { get; set; }
  }
}
