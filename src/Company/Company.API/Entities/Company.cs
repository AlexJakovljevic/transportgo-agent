using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace Company.API.Entities
{
    public class Company
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public String Id { get; set; }

        public String Name { get; set; }

        public Address Address { get; set; }

        public CompanyCategory Category { get; set; }

        public Contact Contact { get; set; }

        //public List<Vehicle> Vehicles { get; set; } TODO: When Vehicle Entitie is added

        public List<Cargo> Cargos { get; set; }
    }

    public class Address
    {
        public String State { get; set; }
        public String City { get; set; }
        public String Zip { get; set; }
        public String StreetLine1 { get; set; }
        public String StringLine2 { get; set; }
    }

    public enum CompanyCategory
    {
        Spedition,
        TransportSpedition,
        TraderManufacturer,
        TradeImportExport,
        Movers,
        Others
    }

    public class Contact
    {
        public String Phone { get; set; }
        public String Fax { get; set; }
        public String Email { get; set; }
    }

    public class Cargo
    {
        public CargoType Type { get; set; }
        public Double Weight { get; set; }
        public Double Size { get; set; }
        public String AdditionalInfo { get; set; }
    }

    public enum CargoType
    {
        Glass,
        OnPalettes,
        Frozen,
        Fragile
    }
}
