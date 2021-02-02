using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Demands.API.Data.Interfaces;
using Demands.API.Entites;
using Demands.API.Repositories.Interfaces;
using MongoDB.Driver;

namespace Demands.API.Repositories
{
    public class DemandRepository : IDemandRepository
    {

        private readonly IDemandContext _context;

        public DemandRepository(IDemandContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public DemandRepository()
        {
        }

        public async Task Create(Demand demand)
        {
            await _context.Demands.InsertOneAsync(demand);
        }

        public async Task<bool> Delete(string Id)
        {
            var deleted = await _context.Demands.DeleteOneAsync(item => item.Id == Id);
            return deleted.IsAcknowledged && deleted.DeletedCount > 0;
        }

        public async Task<Demand> GetDemand(string Id)
        {
            return await _context.Demands.Find(item => item.Id == Id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Demand>> getDemandByName(String Name)
        {
            return await _context.Demands.Find(item => item.Name == Name).ToListAsync();
        }

        public async Task<IEnumerable<Demand>> getDemandByPrice(decimal Price)
        {
            return await _context.Demands.Find(item => item.Price == Price).ToListAsync();
        }

        public async Task<IEnumerable<Demand>> getDemands()
        {
            return await _context.Demands.Find(item => true).ToListAsync();
        }

        public async Task<bool> Update(Demand demand)
        {
            var updated = await _context.Demands
                .ReplaceOneAsync(filter: item => item.Id == demand.Id, replacement: demand);

            return updated.IsAcknowledged && updated.ModifiedCount > 0;
        }
    }
}
