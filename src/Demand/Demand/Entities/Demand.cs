using System;
using System.Collections.Generic;
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

        public String Name { get; set; }

        public String CargoId { get; set; }

        public String VehicleId { get; set; }

        public List<String> OfferIds { get; set; }

        public Address LoadingAddress { get; set; }

        public Address UnloadingAddress { get; set; }
    }

    public class Address
    {
        public String Country { get; set; }

        public String State { get; set; }

        public String City { get; set; }

        public Int32 Zip { get; set; }

        public String StreetLine1 { get; set; }

        public String StreetLine2 { get; set; }
    }
}
