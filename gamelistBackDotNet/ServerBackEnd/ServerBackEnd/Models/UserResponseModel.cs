namespace ServerBackEnd.Models
{
    public class UserResponseModel
    {
        public string id { get; set; }
        public string pseudo { get; set; }
        public string email { get; set; }
        public string profilePicture { get; set; }
        public string accessToken { get; set; }
        public string message { get; set; }
    }
}
