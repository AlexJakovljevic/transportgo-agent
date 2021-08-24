using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Offer.API.Data.Interfaces
{
    public interface IOfferContext
    {
        IMongoCollection<Entities.Offer> Offers { get; }
    }
}
