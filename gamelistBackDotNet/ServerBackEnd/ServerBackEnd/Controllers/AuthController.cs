using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using ServerBackEnd.Models;
using ServerBackEnd.Services;
using System;
using System.Runtime.ConstrainedExecution;
using Newtonsoft.Json;
using System.Security.Cryptography;

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

        [HttpPost("/api/auth/signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpModel user)
        {
            Console.WriteLine("Signup func");

            //user.ProfilePicture = "test";
            bool isPseudoOrEmailExist = await _usersService.CheckIfPseudoOrEmailExistsAsync(user.Pseudo, user.Email);
            var newUser = new UserModel(user.Pseudo, user.Email, user.Password, new List<GameModel>());
            if (isPseudoOrEmailExist)
                return Conflict("Le pseudo ou l'email utilisé existe déjà.");
            else
            {
                try
                {
                    newUser.Password = _usersService.HashPassword(user.Password);
                    await _usersService.CreateAsync(newUser);
                    return Ok("Utilisateur créé avec succés");
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Erreur lors de l'ajout de l'utilisateur : {ex.Message}"); ;
                }

            }

        }

        [HttpGet]
        public async Task<List<UserModel>> Get() =>
            await _usersService.GetAsync();

        [HttpPost("/api/auth/signin")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            var user = await _usersService.GetByPseudoOrEmail(login.PseudoOrEmail,login.PseudoOrEmail);
            if (user != null && _usersService.VerifyPassword(user.Password, login.Password))
            {
                var token = _tokenservice.GenerateToken();
                await Console.Out.WriteLineAsync(token);
                UserResponseModel responseModel = new UserResponseModel();
                responseModel.id = user.Id;
                responseModel.pseudo = user.Pseudo;
                responseModel.email = user.Email;
                responseModel.profilePicture = user.ProfilePicture;
                responseModel.accessToken = token;
                responseModel.message = "connected";
                string json = Newtonsoft.Json.JsonConvert.SerializeObject(responseModel);
                await Console.Out.WriteLineAsync(json);
                return Ok(json);
            }
            else
            {
                return BadRequest();
            }
        }

        //public bool checkDuplicatePseudoOrEmail(/*BsonDocument newUser,*/ string newUserPseudo, string newUserEmail)
        //{
        //    //Checking Pseudo
        //    var Pseudofilter = Builders<UserModel>.Filter.Eq("Pseudo", newUserPseudo);
        //    var existingPseudo = _usersService.GetAsync(newUserPseudo).Find(Pseudofilter).FirstOrDefault();

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