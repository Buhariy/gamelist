using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ServerBackEnd.Models;
using System.Security.Cryptography;

namespace ServerBackEnd.Services
{
    public class UsersService
    {
        private readonly IMongoCollection<UserModel> _usersCollection;

        public UsersService(IOptions<GamelistDatabaseSettings> GamelistDatabaseSettings)
        {
            var mongoClient = new MongoClient(GamelistDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(GamelistDatabaseSettings.Value.DatabaseName);
            _usersCollection = mongoDatabase.GetCollection<UserModel>(GamelistDatabaseSettings.Value.UsersCollectionName);

        }

        public async Task<List<UserModel>> GetAsync() =>
            await _usersCollection.Find(_ => true).ToListAsync();

        public async Task<UserModel?> GetAsync(string id) =>
            await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<UserModel?> GetByPseudoOrEmail(string pseudo,string Email)
        {
            var filter = Builders<UserModel>.Filter.Or(
                Builders<UserModel>.Filter.Eq(x => x.Pseudo, pseudo),
                Builders<UserModel>.Filter.Eq(x => x.Email, Email)
            );

            var user = await _usersCollection.Find(filter).FirstOrDefaultAsync();
            return user == null ? null : user;
        }
        public async Task<bool> CheckIfPseudoOrEmailExistsAsync(string pseudo, string email)
        {
            var filter = Builders<UserModel>.Filter.Or(
                Builders<UserModel>.Filter.Eq(x => x.Pseudo, pseudo),
                Builders<UserModel>.Filter.Eq(x => x.Email, email)
            );

            var user = await _usersCollection.Find(filter).FirstOrDefaultAsync();
            return user != null; // Si user est différent de null, cela signifie que le pseudo ou l'email existe déjà.
        }
        public async Task<bool> CheckIfPseudoExistsAsync(string pseudo)
        {
            var filter = Builders<UserModel>.Filter.And(
                Builders<UserModel>.Filter.Eq(x => x.Pseudo, pseudo)
            );

            var user = await _usersCollection.Find(filter).FirstOrDefaultAsync();
            return user != null; // Si user est différent de null, cela signifie que le pseudo ou l'email existe déjà.
        }

        public async Task<bool> CheckIfEmailExistsAsync(string email)
        {
            var filter = Builders<UserModel>.Filter.And(
                Builders<UserModel>.Filter.Eq(x => x.Email, email)
            );

            var user = await _usersCollection.Find(filter).FirstOrDefaultAsync();
            return user != null; // Si user est différent de null, cela signifie que le pseudo ou l'email existe déjà.
        }

        public async Task<bool> CheckPasswordAsync(UserModel user, string password)
        {
            var matching = await _usersCollection.Find(x => x.Pseudo == user.Pseudo).FirstOrDefaultAsync();
            if (matching != null && matching.Password == password)
                return true;
            return false;
        }

        public async Task CreateAsync(UserModel newUsers) =>
            await _usersCollection.InsertOneAsync(newUsers);

        public async Task UpdateAsync(string id, UserModel updatedUsers) =>
            await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUsers);

        public async Task RemoveAsync(string id) =>
            await _usersCollection.DeleteOneAsync(x => x.Id == id);

        public bool VerifyPassword(string storedHash, string enteredPassword)
        {
            // Conversion du hash stocké en bytes
            byte[] hashBytes = Convert.FromBase64String(storedHash);

            // Extraction du sel
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            // Calcul du hash à partir du mot de passe entré et du sel
            var pbkdf2 = new Rfc2898DeriveBytes(enteredPassword, salt, 10000);
            byte[] enteredHash = pbkdf2.GetBytes(20);

            // Comparaison des deux hashs
            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != enteredHash[i])
                {
                    return false;
                }
            }
            return true;
        }

        public string HashPassword(string password)
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
    }
}
