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

      if (product == null)
      {
        Console.WriteLine("The id value passed in argument is " + idOfProductToDeleteInDb);
        Console.WriteLine("PRODUCT IS NULL");
      }

      if (product != null)
      {
        Console.WriteLine("PRODUCT IS NOT NULL");
        databaseCommunicator.Products.Remove(product);
      }
    }

    public async Task<Product> FindProduct(int idOfProductToUpdateInDb)
    {
      return await databaseCommunicator.Products.FindAsync(idOfProductToUpdateInDb);
    }
  }
}
