using SciFiShopWebAPI.DBCommunication.Repositories;
using SciFiShopWebAPI.Interfaces;

namespace SciFiShopWebAPI.DBCommunication
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly DatabaseCommunicator databaseCommunicator;

    public UnitOfWork(DatabaseCommunicator databaseCommunicator)
    {
      this.databaseCommunicator = databaseCommunicator; 
    }

    public IProductRepository ProductRepository => new ProductRepositoryImpl(databaseCommunicator);

    public async Task<bool> SaveChangesAsync()
    {
      // Returns the number of changes made in the database
      return await databaseCommunicator.SaveChangesAsync() > 0; 
    }
  }
}
