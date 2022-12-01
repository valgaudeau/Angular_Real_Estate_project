using Microsoft.EntityFrameworkCore;
using SciFiShopWebAPI.Models;

namespace SciFiShopWebAPI.DBCommunication.Repositories
{
  public class ProductRepositoryImpl : IProductRepository
  {
    private readonly DatabaseCommunicator databaseCommunicator;

    public ProductRepositoryImpl(DatabaseCommunicator databaseCommunicator)
    {
      this.databaseCommunicator = databaseCommunicator;
    }
    public async Task<IEnumerable<Product>> GetProductsAsync()
    {
      return await databaseCommunicator.Products.ToListAsync();
    }

    public void AddProduct(Product product)
    {
      databaseCommunicator.Products.AddAsync(product);
    }

    public void DeleteProduct(int idOfProductToDeleteInDb)
    {
      var product = databaseCommunicator.Products.Find(idOfProductToDeleteInDb);
      databaseCommunicator.Products.Remove(product);
    }

    public async Task<bool> SaveChangesAsync()
    {
      return await databaseCommunicator.SaveChangesAsync() > 0; // without this > 0, it throws an error. I have no idea why. 
    }
  }
}
