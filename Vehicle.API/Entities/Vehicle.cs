﻿using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vehicle.API.Entities
{
    public class Vehicle
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public String Id { get; set; }

        public VehicleType Type { get; set; }

        public string Brand { get; set; }

        public UInt16 ProductionYear { get; set; }
        
        public VehicleCargoSpace Capacity { get; set; }

        public float MaxWeight { get; set; }
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
        DumpTruck, 
        FlatbedTruck, 
        RefrigeratedTruck, 
        StakeBodyTruck, 
        StepVan, 
        TankTruck, 
        TruckTractor
    }
}
