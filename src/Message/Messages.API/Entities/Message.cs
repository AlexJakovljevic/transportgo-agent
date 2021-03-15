using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Messages.API.Entities
{
    public class Message
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public String Id { get; set; }

        public String ConversationId { get; set; }

        public String SenderId { get; set; }

        public String Content { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
