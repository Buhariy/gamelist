using Microsoft.AspNetCore.Mvc;
using ServerBackEnd.Services;

namespace ServerBackEnd.Controllers
{
    [ApiController]
    [Route("/Home")]
    public class TwitchController : ControllerBase
    {
        private readonly TwitchService _twitchService;

        public TwitchController(TwitchService twitchService)
        {
            _twitchService = twitchService;
        }

        [HttpGet]
        public async Task<IActionResult> GetHome()
        {
            await Console.Out.WriteLineAsync("GetHome");
            var twitchgameres = await _twitchService.GetGames();
            if (twitchgameres != null)
            {
                return Ok(twitchgameres);
            }
            return BadRequest();
        } 
    }
}
