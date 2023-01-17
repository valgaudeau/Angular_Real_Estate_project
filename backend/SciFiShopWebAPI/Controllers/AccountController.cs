using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SciFiShopWebAPI.DTO;
using SciFiShopWebAPI.Interfaces;
using SciFiShopWebAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SciFiShopWebAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")] // the route will be api/product/nameGivenToMethod
  [EnableCors("appCors")]
  public class AccountController : ControllerBase
  {
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConfiguration _configuration;

    public AccountController(IUnitOfWork unitOfWork, IConfiguration configuration)
    {
      _unitOfWork = unitOfWork;
      _configuration = configuration;
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
      loginRes.Token = CreateJwt(user);
      return Ok(loginRes);
    }

    private string CreateJwt(User user)
    {
      // CODE BREAKDOWN:
      // we use symmetric encryption here, which means we have a single key for encryption & decryption
      // SymmetricSecurityKey comes from the Microsoft.IdentityModel.Tokens.SymmetricSecurityKey library, and it takes a byte array as a parameter.
      // There are different encryption options, we're using UTF8. The second part which we need to pass as the payload of the token is Claims.
      // These are pieces of information about the User. That's what you see with the multiple claims better added into the Claim array, where we
      // set the ClaimTypes.Name to the user.Username, and ClaimTypes.NameIdentifier to the user.Id.Then we need the SigningCredentials to define
      // the secret key and the algorithm we are going to use for digital signature. Finally, we need a TokenDescriptor which will use all of the
      // information to generate our token when the method is called.This class offers a lot of option for Token generation, but we used something basic.
      // The TokenHandler is responsible for creating JWT tokens.
      var secretKey = _configuration.GetSection("AppSettings:Key").Value;
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

      var claims = new Claim[]
      {
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
      };

      var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddDays(10),
        SigningCredentials = signingCredentials
      };

      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }

  }
}
