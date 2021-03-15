using System;
using Customer.API.Data.Interfaces;
using Customer.API.Settings;
using MongoDB.Driver;

namespace Customer.API.Data
{
    public class CustomerContext : ICustomerContext
    {
        public CustomerContext(ICustomerDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            Customers = database.GetCollection<Entities.Customer>(settings.CollectionName);

            //CustomerContextSeed.SeedData(Customers);
        }

        public IMongoCollection<Entities.Customer> Customers { get; }
    }
}
 