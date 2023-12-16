using Amazon.Runtime.Internal;
using Microsoft.Extensions.Options;
using ServerBackEnd.Interface;
using ServerBackEnd.Models;
using System.Net.Http;
using System.Reflection.PortableExecutable;
using System.Text.Json;

namespace ServerBackEnd.Services
{
    public class TwitchService
    {
        private readonly IHttpRequestMessageFactory _requestFactory;
        public TwitchService(IHttpRequestMessageFactory requestFactory)
        {
            _requestFactory = requestFactory;
        }

        public async Task<Object> GetGames()
        {
            HttpClient http = new HttpClient();

            var req = _requestFactory.CreateHttpRequestMessage(HttpMethod.Get);
            req.RequestUri =new Uri( req.RequestUri.ToString() + "/top?first=100");

            HttpResponseMessage res = await http.SendAsync(req);
            if (res.IsSuccessStatusCode)
            {
                var content = await res.Content.ReadAsStringAsync();
                var games = JsonSerializer.Deserialize<Object>(content);
                return games;
            }
            else
            {
                return null;
            }
        }


        public async Task<Object> GetTop()
        {
            HttpClient http = new HttpClient();

            var req = _requestFactory.CreateHttpRequestMessage(HttpMethod.Get);
            req.RequestUri = new Uri(req.RequestUri.ToString() + "/top?first=10");

            HttpResponseMessage res = await http.SendAsync(req);
            if (res.IsSuccessStatusCode)
            {
                var content = await res.Content.ReadAsStringAsync();
                var games = JsonSerializer.Deserialize<Object>(content);
                return games;
            }
            else
            {
                return null;
            }
        }

        public async Task<Object> GetSearch(string name)
        {
            HttpClient http = new HttpClient();

            var req = _requestFactory.CreateHttpRequestMessage(HttpMethod.Get);
            req.RequestUri = new Uri(req.RequestUri.ToString() + $"/?name={name}");

            HttpResponseMessage res = await http.SendAsync(req);
            if (res.IsSuccessStatusCode)
            {
                var content = await res.Content.ReadAsStringAsync();
                var games = JsonSerializer.Deserialize<Object>(content);
                return games;
            }
            else
            {
                return null;
            }
        }
    }

    // Modèle pour la réponse JSON des jeux Twitch
    public class TwitchGameResponse
    {
        public TwitchGame[] Games { get; set; }
    }

    public class TwitchGame
    {
        public string Id { get; set; }
        public string Name { get; set; }
        // Autres propriétés des jeux Twitch
    }
}
