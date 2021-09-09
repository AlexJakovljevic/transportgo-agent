using MongoDB.Driver;
using Offer.API.Data.Interfaces;
using Offer.API.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Offer.API.Repositories
{
    public class OfferRepository : IOfferRepository
    {
        private readonly IOfferContext _context;

        public OfferRepository(IOfferContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public OfferRepository()
        {
        }

        public async Task Create(Entities.Offer offer)
        {
            await _context.Offers.InsertOneAsync(offer);
        }

        public async Task<bool> Delete(string Id)
        {
            var deleted = await _context.Offers.DeleteOneAsync(item => item.Id == Id);
            return deleted.IsAcknowledged && deleted.DeletedCount > 0;
        }

        public async Task<Entities.Offer> GetOfferById(string Id)
        {
            return await _context.Offers.Find(item => item.Id == Id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Entities.Offer>> GetOffersByCompanyID(string CompanyID)
        {
            return await _context.Offers.Find(item => item.CompanyID == CompanyID).ToListAsync();
        }

        public async Task<IEnumerable<Entities.Offer>> GetOffers()
        {
            return await _context.Offers.Find(item => true).ToListAsync();
        }

        public async Task<bool> Update(Entities.Offer offer)
        {
            var updated = await _context.Offers.ReplaceOneAsync(filter: item => item.Id == offer.Id, replacement: offer);

            return updated.IsAcknowledged && updated.ModifiedCount > 0;
        }
    }
}
