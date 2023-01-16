using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SciFiShopWebAPI.DTO;
using SciFiShopWebAPI.Interfaces;
using SciFiShopWebAPI.Models;

namespace SciFiShopWebAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")] // the route will be api/product/nameGivenToMethod
  [EnableCors("appCors")]
  public class AccountController : ControllerBase
  {
    private readonly IUnitOfWork _unitOfWork;

    public AccountController(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    // localhost:5135/api/account/login
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
    {
      // if the user is authenticated, we get information about the user in this variable. If not, the variable is NULL
      var user = await _unitOfWork.UserRepository.Authenticate(loginRequestDto.Username, loginRequestDto.Password);

      if (user == null)
      {
        return Unauthorized();
      }

      var loginRes = new LoginResponseDto();
      loginRes.Username = user.Username;
      loginRes.Token = "dummy placeholder";
      return Ok(loginRes);
    }

  }
}
