namespace SciFiShopWebAPI.Interfaces
{
  public interface IUnitOfWork
  {
    IProductRepository ProductRepository { get; }
    Task<bool> SaveChangesAsync();
  }
}
