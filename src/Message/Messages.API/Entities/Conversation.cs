using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace Messages.API.Entities
{
    public class Conversation
    {
        public Conversation(string fromUserId, string toUserId)
        {
            UserId1 = fromUserId;
            UserId2 = toUserId;
        }

        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public String Id { get; set; }

        public String UserId1 { get; set; }

        public String UserId2 { get; set; }

        public List<Message> Messages { get; set; }
    }
}
