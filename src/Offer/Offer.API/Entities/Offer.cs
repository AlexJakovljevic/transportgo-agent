using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicle.API.Entities;

namespace Offer.API.Entities
{
    public class Offer
    {
        [BsonId]
        public String Id { get; set; }

        public int NumOfVehicles { get; set; }
        public String Vehicle { get; set; }

        //TODO: Change numofvehicles and vehicle to list of struct (numOfVehicle, Vehicle)
        //public Dictionary<string, int> Vehicles { get; set; } //VehicleID: numOfVehicles
        public int Price { get; set; }
        public String Note { get; set; }
        public String CompanyID { get; set; }
        public String DemandID { get; set; }
        public bool isAccepted { get; set; }
        public bool isDeclined { get; set; }
    }
}
