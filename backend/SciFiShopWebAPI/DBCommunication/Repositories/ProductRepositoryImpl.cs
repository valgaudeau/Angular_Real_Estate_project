using Microsoft.EntityFrameworkCore;
using SciFiShopWebAPI.Interfaces;
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
      if(product != null)
      {
        databaseCommunicator.Products.Remove(product);
      }
    }

  }
}
