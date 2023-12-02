﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ServerBackEnd.Models
{
    public class UserModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("_pseudo")]
        public string Pseudo { get; set; }

        [BsonElement("_email")]
        public string Email { get; set; }

        [BsonElement("_password")]
        public string Password { get; set; }

        [BsonElement("_games")]
        public List<int> Games { get; set; }

        [BsonElement("_profilePicture")]
        public string ProfilePicture { get; set; }
    }
}
