using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicle.API.Data.Interfaces;
using Vehicle.API.Settings.Interfaces;

namespace Vehicle.API.Data
{
    public class VehicleContext : IVehicleContext
    {
        public VehicleContext(IVehicleDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            Vehicles = database.GetCollection<Entities.Vehicle>(settings.CollectionName);

        }

        public IMongoCollection<Entities.Vehicle> Vehicles { get; }
    }
}
