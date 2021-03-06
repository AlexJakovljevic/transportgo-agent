﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicle.API.Entities;

namespace Vehicle.API.Repositories.Interfaces
{
    public interface IVehicleRepository
    {
        Task<IEnumerable<Entities.Vehicle>> getVehicles();

        Task<Entities.Vehicle> GetVehicleById(string Id);

        Task<IEnumerable<Entities.Vehicle>> getVehiclesByType(VehicleType Type);
        Task<IEnumerable<Entities.Vehicle>> getVehiclesByBrand(string Brand);
        Task<IEnumerable<Entities.Vehicle>> getVehiclesByProductionYear(UInt16 ProductionYear);

        Task Create(Entities.Vehicle vehicle);

        Task<bool> Update(Entities.Vehicle vehicle);

        Task<bool> Delete(string Id);
    }
}
