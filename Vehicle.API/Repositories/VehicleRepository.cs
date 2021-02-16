using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicle.API.Data.Interfaces;
using Vehicle.API.Entities;
using Vehicle.API.Repositories.Interfaces;
using MongoDB.Driver;

namespace Vehicle.API.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly IVehicleContext _context;

        public VehicleRepository(IVehicleContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public VehicleRepository()
        {
        }
        public async Task Create(Entities.Vehicle vehicle)
        {
            await _context.Vehicles.InsertOneAsync(vehicle);
        }

        public async Task<bool> Delete(string Id)
        {
            var deleted = await _context.Vehicles.DeleteOneAsync(item => item.Id == Id);
            return deleted.IsAcknowledged && deleted.DeletedCount > 0;
        }

        public async Task<Entities.Vehicle> GetVehicleById(string Id)
        {
            return await _context.Vehicles.Find(item => item.Id == Id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Entities.Vehicle>> getVehicles()
        {
            return await _context.Vehicles.Find(item => true).ToListAsync();
        }

        public async Task<IEnumerable<Entities.Vehicle>> getVehiclesByBrand(string Brand)
        {
            return await _context.Vehicles.Find(item => item.Brand == Brand).ToListAsync();
        }

        public async Task<IEnumerable<Entities.Vehicle>> getVehiclesByProductionYear(ushort ProductionYear)
        {
            return await _context.Vehicles.Find(item => item.ProductionYear == ProductionYear).ToListAsync();
        }

        public async Task<IEnumerable<Entities.Vehicle>> getVehiclesByType(VehicleType Type)
        {
            return await _context.Vehicles.Find(item => item.Type == Type).ToListAsync();
        }

        public async Task<bool> Update(Entities.Vehicle vehicle)
        {
            var updated = await _context.Vehicles.ReplaceOneAsync(filter: item => item.Id == vehicle.Id, replacement: vehicle);

            return updated.IsAcknowledged && updated.ModifiedCount > 0;
        }
    }
}
