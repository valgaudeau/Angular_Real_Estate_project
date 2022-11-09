using Microsoft.AspNetCore.Mvc;

namespace SciFiShopWebAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TestController : ControllerBase // All controllers should inherit from this base class
  {
    [HttpGet(Name = "GetTest")]
    public IEnumerable<string> Get()
    {
      return new string[] { "Atlanta", "yeah yeah" };
    }
  }
}
