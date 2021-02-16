using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicle.API.Entities;

namespace Vehicle.API.Data.Interfaces
{
    public interface IVehicleContext
    {
        IMongoCollection<Entities.Vehicle> Vehicles { get; }
    }
}
