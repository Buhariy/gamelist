using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ServerBackEnd.Models;

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

        public async Task<UserModel?> GetByPseudoOrEmail(string pseudoOrEmail) =>
           await _usersCollection.Find(x => x.Pseudo == pseudoOrEmail || x.Email == pseudoOrEmail).FirstOrDefaultAsync();

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
    }
}
