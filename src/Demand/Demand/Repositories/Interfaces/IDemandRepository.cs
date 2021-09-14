using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Demands.API.Entites;

namespace Demands.API.Repositories.Interfaces
{
    public interface IDemandRepository
    {
        Task<IEnumerable<Demand>> getDemands();

        Task<Demand> GetDemandById(string Id);

        Task<IEnumerable<Demand>> getDemandsByName(string Name);

        //Task<IEnumerable<Demand>> getDemandsByPrice(decimal Price);

        Task<IEnumerable<Demand>> getDemandsByCustomerID(string CustomerID);

        Task Create(Demand demand);

        Task<bool> Update(Demand demand);

        Task<bool> Delete(string Id);

    }
}
