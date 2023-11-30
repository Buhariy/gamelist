using Microsoft.AspNetCore.Mvc;

namespace ServerBackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            Console.WriteLine("Coucou !");
            return Ok("Message affiché dans la console !");
        }
    }
}
