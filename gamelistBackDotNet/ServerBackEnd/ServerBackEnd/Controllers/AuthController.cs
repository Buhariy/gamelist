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
                    newUser.Password = HashPassword(user.Password);
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

        public static string HashPassword(string password)
        {
            // Générer un sel (salt) aléatoire
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            // Créer un dérivé de clé à partir du mot de passe et du sel (PBKDF2)
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            // Combinaison du sel et du hash dans un tableau de bytes
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            // Conversion du tableau de bytes en une chaîne hexadécimale
            string hashedPassword = Convert.ToBase64String(hashBytes);

            return hashedPassword;
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