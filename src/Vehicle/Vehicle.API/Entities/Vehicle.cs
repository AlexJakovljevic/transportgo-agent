using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vehicle.API.Entities
{
    public class Vehicle
    {
        [BsonId]
        public String Id { get; set; }

        public VehicleType Type { get; set; }

        public String Brand { get; set; }
        public String Model { get; set; }

        public UInt16 ProductionYear { get; set; }
        
        public VehicleCargoSpace Capacity { get; set; }

        public float MaxWeight { get; set; }
        public String CompanyID { get; set; }
    }

    public class VehicleCargoSpace
    {
        public float Length { get; set; }
        public float Width { get; set; }
        public float Height { get; set; }
    }

    public enum VehicleType
    {
        AgriculturalTruck, 
        BoxTruck, 
        CarCarrier, 
        CateringTruck, 
        DeliveryVan,
        RefrigeratedTruck,
        TankTruck, 
        TruckTractor
    }
}
