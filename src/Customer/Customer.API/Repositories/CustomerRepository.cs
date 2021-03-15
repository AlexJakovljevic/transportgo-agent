using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Customer.API.Data.Interfaces;
using Customer.API.Repositories.Interfaces;
using MongoDB.Driver;

namespace Customer.API.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ICustomerContext _context;

        public CustomerRepository(ICustomerContext context)
        {
            _context = context;
        }

        public async Task Create(Entities.Customer customer)
        {
            await _context.Customers.InsertOneAsync(customer);
        }

        public async Task<bool> Delete(string id)
        {
            FilterDefinition<Entities.Customer> filter =
                Builders<Entities.Customer>.Filter.Eq(c => c.Id, id);

            DeleteResult deleteRes = await _context.Customers
                .DeleteOneAsync(filter);

            return deleteRes.IsAcknowledged && deleteRes.DeletedCount > 0;

        }

        public async Task<Entities.Customer> GetCustomer(string id)
        {
            return await _context
                .Customers
                .Find(c => c.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Entities.Customer>> GetCustomers()
        {
            return await _context
                .Customers
                .Find(c => true)
                .ToListAsync();
        }

        public async Task<bool> Update(Entities.Customer customer)
        {
            var result = await _context.Customers
                .ReplaceOneAsync(filter: c => c.Id == customer.Id, replacement: customer);

            return result.IsAcknowledged && result.ModifiedCount > 0;
        }
    }
}
