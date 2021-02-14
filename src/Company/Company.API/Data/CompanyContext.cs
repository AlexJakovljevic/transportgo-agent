using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Company.API.Data.Interface;
using MongoDB.Driver;
using Company.API.Entities;
using Company.API.Settings.Interfaces;

namespace Company.API.Data
{
    public class CompanyContext : ICompanyContext
    {
        public CompanyContext(ICompanyDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            Companies = database.GetCollection<Entities.Company>(settings.CollectionName);

        }

        public IMongoCollection<Entities.Company> Companies { get; }
    }
}
