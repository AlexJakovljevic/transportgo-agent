﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Offer.API.Entities;

namespace Offer.API.Repositories.Interfaces
{
    public interface IOfferRepository
    {
        Task<IEnumerable<Entities.Offer>> GetOffers();

        Task<Entities.Offer> GetOfferById(string Id);

        Task<IEnumerable<Entities.Offer>> GetOffersByCompanyID(string CompanyID);
        Task<IEnumerable<Entities.Offer>> GetOffersByDemandID(string DemandID);

        Task Create(Entities.Offer offer);

        Task<bool> Update(Entities.Offer offer);

        Task<bool> Delete(string Id);
    }
}
