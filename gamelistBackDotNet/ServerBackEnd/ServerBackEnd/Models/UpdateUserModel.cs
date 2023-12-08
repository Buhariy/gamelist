namespace ServerBackEnd.Models
{
    public class UpdateUserModel
    {
        public string id { get; set; }
        public string pseudo { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string repassword { get; set; }
    }
}
