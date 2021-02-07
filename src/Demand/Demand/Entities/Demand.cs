using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Demands.API.Entites
{
    public class Demand
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public String Id { get; set; }

        public Decimal Price { get; set; }

        [BsonElement]
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime ExpirationDate { get; set; }

        public string Name { get; set; }

    }
}
