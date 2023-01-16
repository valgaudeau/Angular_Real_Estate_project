namespace SciFiShopWebAPI.Interfaces
{
  public interface IUnitOfWork
  {
    IProductRepository ProductRepository { get; }
    IUserRepository UserRepository { get; }
    Task<bool> SaveChangesAsync();
  }
}
