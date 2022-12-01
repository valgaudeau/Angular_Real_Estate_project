using SciFiShopWebAPI.Models;

namespace SciFiShopWebAPI.DBCommunication.Repositories
{
  public interface IProductRepository
  {
    Task<IEnumerable<Product>> GetProductsAsync();
    void AddProduct(Product product); // We don't need to make this method async because it just adds the entity in the database, which is not a time consuming task
    void DeleteProduct(int idOfProductToDeleteInDb);
    Task<bool> SaveChangesAsync(); // This should not be in the repository, but rather in the UNIT OF WORK. Take care of that later
  }
}
