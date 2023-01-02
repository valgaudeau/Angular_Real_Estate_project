using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SciFiShopWebAPI.DBCommunication;
using SciFiShopWebAPI.Interfaces;
using SciFiShopWebAPI.Models;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Runtime.Intrinsics.X86;

namespace SciFiShopWebAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")] // the route will be api/product/nameGivenToMethod. For example localhost:5135/api/product/getproducts .
  [EnableCors("appCors")]
  public class ProductController : ControllerBase // All controllers should inherit from this base class
  {
    private readonly IUnitOfWork _unitOfWork;

    public ProductController(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    } 

    // RETRIEVE - api/product
    [HttpGet(Name = "GetProducts")]
    public async Task <IActionResult> GetProducts()
    {
      // Retrieve products from the database - Do this later, use ProductRepostory object, will need to seed data in database on first run
      // For now Hard coding the products here just to test the API
     /* Product xwing = new Product(1, "X-WING", 1, 14000, "x-wing", 5, "The X-wing is a versatile Rebel Alliance starfighter that balances speed with firepower. Armed with four laser cannons and two proton torpedo launchers, the X-wing can take on anything the Empire throws at it. Nimble engines give the X-wing an edge during dogfights, and it can make long-range jumps with its hyperdrive and its astromech droid co-pilot.");
      Product millenium = new Product(2, "MILLENIUM", 1, 53000, "millenium-falcon", 20, "An extensively modified Corellian light freighter, the Millennium Falcon is a legend in smuggler circles and is coveted by many for being the fastest hunk of junk in the galaxy. Despite her humble origins and shabby exterior, the ship that made the Kessel Run in less than 12 parsecs has played a role in some of the greatest victories of the Rebel Alliance and the New Republic.");
      Product imperialFighter = new Product(3, "IMPERIAL FIGHTER", 1, 15500, "imperial-fighter", 23, "The imperial fighter was the unforgettable symbol of the Imperial fleet. Carried aboard Star Destroyers and battle stations, imperial fighters were single-pilot vehicles designed for fast-paced dogfights with Rebel X-wings and other starfighters. The iconic imperial fighter led to other models in the imperial family including the dagger-shaped TIE Interceptor and the explosive-laden imperial bomber. The terrifying roar of a imperial's engines would strike fear into the hearts of all enemies of the Empire.");
      Product glados = new Product(4, "GLADOS", 2, 16000, "glados", 8, "GLaDOS (Genetic Lifeform and Disk Operating System) is a fictional artificially superintelligent computer system from the video game series Portal. GLaDOS later appeared in The Lab and Lego Dimensions. The character was created by Erik Wolpaw and Kim Swift and voiced by Ellen McLain. GLaDOS is responsible for testing and maintenance in the Aperture Science Computer-Aided Enrichment Center in all titles. While GLaDOS initially appears in the first game to simply be a voice that guides the player, her words and actions become increasingly malicious as she makes her intentions clear.");
      Product r2d2 = new Product(5, "R2D2", 2, 24000, "r2d2", 100, "A reliable and versatile astromech droid, R2-D2 has served Padmé Amidala, Anakin Skywalker, and Luke Skywalker in turn, showing great bravery in rescuing his masters and their friends from many perils. A skilled starship mechanic and fighter pilot's assistant, he has an unlikely but enduring friendship with the fussy protocol droid C-3PO.");
      Product ravenSpaceship = new Product(6, "RAVEN SPACESHIP", 1, 24000, "raven-spaceship", 2, "The Raven is the modern - day descendent of the Roberts Space Industries X - 7 spacecraft which tested the very first jump engines.Utilitarian to a T, the Raven is the perfect choice for new ship owners: Versatile enough to tackle a myriad of challenges, yet with a straightforward and intuitive design.Build for the discerning pilot who never forgets where he or she came from.");
      Product theEnterprise = new Product(7, "THE ENTERPRISE", 1, 150000, "the-enterprise", 20, "Enterprise or USS Enterprise is the name of several fictional spacecraft, some of which are the main craft and setting for various television series and films in the Star Trek science fiction franchise. The most notable were Captain James T. Kirk's USS Enterprise from the original 1960s television series, and Captain Jean-Luc Picard's USS Enterprise from Star Trek: The Next Generation.");
      Product ironGiant = new Product(8, "IRON GIANT", 2, 200000, "iron-giant", 7, "The Iron Giant is a 50-foot tall autonomous Metal Man from another world that crash lands on Earth before becoming friends with a young boy named Hogarth who rescues him from his own internal defensive mechanism in the Warner Bros. 1999 animated science fiction film of the same name, voiced by Vin Diesel. The Iron Giant is loosely based on the title character of The Iron Man, a 1968 novel by Ted Hughes.");
      Product terminator = new Product(9, "TERMINATOR", 2, 67500, "terminator", 15, "Cyborg assassin and soldier, designed for infiltration and combat duty, used by the military supercomputer Skynet toward the ultimate goal of exterminating the Human Resistance. The terminators were created by Cyberdyne Systems. Terminators can withstand standard 20th century firearms, crash through wall intact, and survive explosions to some degree. Repeated shotgun blasts have enough force to knock it down and temprarily disable it, while heavy amounts of automatic fire are able to compromise the organise disguise layer.");*/

      var products = await _unitOfWork.ProductRepository.GetProductsAsync();
      return Ok(products);
    }

    // CREATE - api/product/add?productname=SomeProductName
    [HttpPost("add")]
    [HttpPost("add/{productname}")]
    public async Task<IActionResult> AddProduct(string productname)
    {
      Product product = new Product();
      product.name = productname;
      _unitOfWork.ProductRepository.AddProduct(product);
      await _unitOfWork.SaveChangesAsync();
      return Ok(product); // returns 200 response
    }

    // DELETE - api/product/delete/id
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
      _unitOfWork.ProductRepository.DeleteProduct(id);
      await _unitOfWork.SaveChangesAsync();
      return Ok(id); // returns 200 response
    }
  }
}
