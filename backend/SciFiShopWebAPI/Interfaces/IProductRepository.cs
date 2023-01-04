using SciFiShopWebAPI.Models;

namespace SciFiShopWebAPI.Interfaces
{
  public interface IProductRepository
  {
    Task<IEnumerable<Product>> GetProductsAsync();
    void AddProduct(Product product); // We don't need to make this method async because it just adds the entity in the database, which is not a time consuming task
    void DeleteProduct(int idOfProductToDeleteInDb);
    Task<Product> FindProduct(int idOfProductToUpdateInDb);
    // This was moved in the UNIT OF WORK
    // Task<bool> SaveChangesAsync();
  }
}
