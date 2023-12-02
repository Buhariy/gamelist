using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using ServerBackEnd.Models;
using ServerBackEnd.Services;
using System;
using System.Runtime.ConstrainedExecution;

namespace ServerBackEnd.Controllers
{
    [ApiController]
    [Route("/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UsersService _usersService;
        private readonly ITokenService _tokenservice;

        public AuthController(UsersService usersService,ITokenService tokenService)
        {
            _usersService = usersService;
            _tokenservice = tokenService;
        }
            

        //[HttpPost("/signup")]
        //public IActionResult SignUp([FromBody] User user)
        //{
        //    Console.WriteLine("Signup func");
        //    user.Pseudo = "test";
        //    user.Password = "test";
        //    user.Email = "test";
        //    user.ProfilePicture = "test";

        //    try
        //    {
        //        var newUser = new BsonDocument
        //        {
        //            { "pseudo", user.Pseudo },
        //            { "password", user.Password },
        //            { "email", user.Email },
        //            { "ProfilePicture", user.ProfilePicture },
        //            { "games", new BsonArray() }
        //        };

        //        if(!checkDuplicatePseudoOrEmail(/*newUser,*/ user.Pseudo, user.Email))
        //            _usersCollection.InsertOne(/*newUser*/user);

        //        return NoContent();
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Erreur lors de l'ajout de l'utilisateur : {ex.Message}"); ;
        //    }
        //}

        [HttpGet]
        public async Task<List<UserModel>> Get() =>
        await _usersService.GetAsync();

        [HttpGet("/login")]
        public async Task<IActionResult> Login(/*[FromBody] LoginModel login*/)
        {
            LoginModel login = new LoginModel();
            login.PseudoOrEmail = "Biff2Base";
            login.Password = "password27";
            var user = await _usersService.GetByPseudoOrEmail(login.PseudoOrEmail);
            if(user != null && await _usersService.CheckPasswordAsync(user,login.Password))
            {
                var token = _tokenservice.GenerateToken();
                await Console.Out.WriteLineAsync(token);
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


        //public bool checkDuplicatePseudoOrEmail(/*BsonDocument newUser,*/ string newUserPseudo, string newUserEmail)
        //{
        //    //Checking Pseudo
        //    var Pseudofilter = Builders<User>.Filter.Eq("Pseudo", newUserPseudo);
        //    var existingPseudo = _usersCollection.Find(Pseudofilter).FirstOrDefault();

        //    //Checking Email
        //    var Emailfilter = Builders<User>.Filter.Eq("Email", newUserEmail);
        //    var existingEmail = _usersCollection.Find(Emailfilter).FirstOrDefault();

        //    if (existingPseudo != null || existingEmail != null)
        //        return true;
        //    return false;
        //}
    }
}


//------------------------------ PARTIE MONGODB


//class Program
//{
//    static void Main(string[] args)
//    {
//        string connectionString = "mongodb://localhost:27017";
//        MongoClient client = new MongoClient(connectionString);

//        var db = client.GetDatabase("Gamelist");
//        var collectionUsers = db.GetCollection<BsonDocument>("Users");

//        var documents = collectionUsers.Find(new BsonDocument()).ToList();
//        var newUserDocument = new BsonDocument
//        {
//            {"pseudo","User123" },
//            {"password",$"mdp123{DateTime.Now.Ticks}" },
//            {"email","email@email.com" },
//            {"profilePicture", "a/a/a/a/a/a/a.png" },
//            {"games",new BsonArray()}

//        };

//        collectionUsers.InsertOne(newUserDocument);


//        foreach ( var document in documents )
//        {
//            Console.WriteLine(document);
//        }
//    }
//}