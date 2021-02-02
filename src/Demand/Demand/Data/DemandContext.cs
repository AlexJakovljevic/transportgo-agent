using System;
using Demands.API.Data.Interfaces;
using Demands.API.Settings;
using Demands.API.Entites;
using MongoDB.Driver;

namespace Demands.API.Data
{
    public class DemandContext : IDemandContext
    {
        public DemandContext(IDemandDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            Demands = (IMongoCollection<Demand>)database.GetCollection<Demand>(settings.CollectionName);

        }

        public IMongoCollection<Demand> Demands { get; }
    }
}
