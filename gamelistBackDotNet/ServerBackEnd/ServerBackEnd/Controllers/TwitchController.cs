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

        [HttpGet("/search/{name}")]
        public async Task<IActionResult> GetSearch(string name)
        {
            await Console.Out.WriteLineAsync("GetSearch");
            var twitchgameres = await _twitchService.GetSearch(name);
            if (twitchgameres != null)
            {
                return Ok(twitchgameres);
            }
            return BadRequest();
        }

        [HttpGet("/Top")]
        public async Task<IActionResult> GetTop()
        {
            await Console.Out.WriteLineAsync("GetTop");
            var twitchgameres = await _twitchService.GetTop();
            if (twitchgameres != null)
            {
                return Ok(twitchgameres);
            }
            return BadRequest();
        }

        [HttpGet("/next/{pagi}")]
        public async Task<IActionResult> GetNext(string pagi)
        {
            await Console.Out.WriteLineAsync("GetNext");
            var twitchgameres = await _twitchService.GetNext(pagi);
            if (twitchgameres != null)
            {
                return Ok(twitchgameres);
            }
            return BadRequest();
        }

        [HttpGet("/before/{pagi}")]
        public async Task<IActionResult> GetBefore(string pagi)
        {
            await Console.Out.WriteLineAsync("GetNext");
            var twitchgameres = await _twitchService.GetBefore(pagi);
            if (twitchgameres != null)
            {
                return Ok(twitchgameres);
            }
            return BadRequest();
        }
    }
}
