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
      // any value greater than 0 means that the changes were successfully saved
      return await databaseCommunicator.SaveChangesAsync() > 0; 
    }
  }
}
