using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ServerBackEnd.Models;
using ServerBackEnd.Services;
using System;
using System.Reflection.Metadata;
using System.Text;
using System.Text.Json;

namespace ServerBackEnd.Controllers
{
    [ApiController]
    [Route("/Collectionsss")]
    public class CollectionController : ControllerBase
    {
        private readonly UsersService _userservice;
        public CollectionController(UsersService usersService) 
        {
            _userservice = usersService;
        }

        [HttpPost("/addCollection")]
        public async Task<IActionResult> AddToGames([FromBody] GameResponseModel gameResponse)
        {
            HttpClient httpClient = new HttpClient();
            HttpRequestMessage req = new HttpRequestMessage(HttpMethod.Get, $"https://api.twitch.tv/helix/games?id={gameResponse.gameId}");
            req.Headers.Add("Authorization", "Bearer bwyf8efb484b12penpbpdu57lg0umm");
            req.Headers.Add("Client-ID", "x7jn4h2zd6wv0xtaegj3zg6oohxt3f");
            req.Headers.Add("Cookie", "twitch.lohp.countryCode=FR; unique_id=vzI6cr0uM8Pfvh4ymsydAFb12htfF9b3; unique_id_durable=vzI6cr0uM8Pfvh4ymsydAFb12htfF9b3");
            if (gameResponse != null)
            {
                GameModelList games = new GameModelList();
                var res = await httpClient.SendAsync(req);
                var jsonStr = await res.Content.ReadAsStringAsync();
                games = System.Text.Json.JsonSerializer.Deserialize<GameModelList>(jsonStr);

                var user = await _userservice.GetAsync(gameResponse.userId);
                if (user != null && user.Id != null && games != null)
                {
                    foreach (var game in games.Data)
                    {
                        //game.box_art_url = game.box_art_url.Replace("{width}", 170).Replace("{height}", 230);
                        StringBuilder sb = new StringBuilder(game.box_art_url);
                        sb.Replace("{width}", "170");
                        sb.Replace("{height}", "230");
                        game.box_art_url = sb.ToString();
                        user.Games.Add(game);
                    }
                    _userservice.UpdateAsync(user.Id, user);
                }
            }
            return Ok();
        }
        [HttpPost("/collection")]
        public async Task<IActionResult> Collection([FromBody] FrontMyCollectionDataReq id)
        {
            var user = await _userservice.GetAsync(id.id);
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(user.Games);
            return Ok(json);
        }


    }
}
