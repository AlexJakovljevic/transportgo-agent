using System;
using System.Collections.Generic;
using Demands.API.Entites;
using MongoDB.Driver;

namespace Demands.API.Data
{
    public class DemandContextSeed
    {
        public static void SeedData(IMongoCollection<Demand> demandCollection)
        {
            bool hasRecord = demandCollection.Find(item => true).Any();
            if (hasRecord)
            {
                demandCollection.InsertManyAsync(InsertDemands());
            }
        }

        private static IEnumerable<Demand> InsertDemands() => new List<Demand>()
            {
                new Demand()
                {
                    Price = 9.99M,
                    ExpirationDate = DateTime.Now,
                    Name = "Prva ponuda"
                },
                new Demand()
                {
                    Price = 12.99M,
                    ExpirationDate = DateTime.Now,
                    Name = "Druga ponuda"
                }
            };
    }
}
