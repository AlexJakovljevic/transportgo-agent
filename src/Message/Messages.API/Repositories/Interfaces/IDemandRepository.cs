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

        Task<IEnumerable<Demand>> getDemandByName(string Name);

        Task<IEnumerable<Demand>> getDemandByPrice(decimal Price);

        Task Create(Demand demand);

        Task<bool> Update(Demand demand);

        Task<bool> Delete(string Id);

    }
}
