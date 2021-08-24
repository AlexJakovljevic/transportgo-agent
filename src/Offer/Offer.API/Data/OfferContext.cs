using MongoDB.Driver;
using Offer.API.Data.Interfaces;
using Offer.API.Entities;
using Offer.API.Settings.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Offer.API.Data
{
    public class OfferContext : IOfferContext
    {
        public OfferContext(IOfferDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            Offers = database.GetCollection<Entities.Offer>(settings.CollectionName);

        }
        public IMongoCollection<Entities.Offer> Offers { get; }
    }
}
