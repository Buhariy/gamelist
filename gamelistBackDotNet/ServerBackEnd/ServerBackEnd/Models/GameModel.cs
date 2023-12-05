using System.Text.Json.Serialization;

namespace ServerBackEnd.Models
{
    public class GameModel
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("box_art_url")]
        public string box_art_url { get; set; }
        [JsonPropertyName("igdb_id")]
        public string igdb_id { get; set; }
    }


    public class GameModelList
    {
        [JsonPropertyName("data")]
        public List<GameModel> Data {  get; set; }
    }
}
