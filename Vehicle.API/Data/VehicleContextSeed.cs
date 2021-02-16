using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicle.API.Entities;

namespace Vehicle.API.Data
{
    public class VehicleContextSeed
    {
        public static void SeedData(IMongoCollection<Entities.Vehicle> vehicleCollection)
        {
            bool hasRecord = vehicleCollection.Find(item => true).Any();
            if (hasRecord)
            {
                vehicleCollection.InsertManyAsync(InsertVehicles());
            }
        }

        private static IEnumerable<Entities.Vehicle> InsertVehicles() => new List<Entities.Vehicle>()
            {
                new Entities.Vehicle()
                {
                    Brand = "Mercedes",
                    Capacity =
                    {
                        Height = 2,
                        Length = 15,
                        Width = 3
                    },
                    MaxWeight = 1250,
                    ProductionYear = 2019,
                    Type = VehicleType.FlatbedTruck
                },
                new Entities.Vehicle()
                {
                    Brand = "Volvo",
                    Capacity =
                    {
                        Height = 1,
                        Length = 8,
                        Width = 2
                    },
                    MaxWeight = 650,
                    ProductionYear = 2012,
                    Type = VehicleType.BoxTruck
                }
            };
    }
}
