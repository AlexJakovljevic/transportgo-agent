using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Company.API.Entities;

namespace Company.API.Repositories.Interfaces
{
    public interface ICompanyRepository
    {
        Task<IEnumerable<Entities.Company>> getCompanies();

        Task<Entities.Company> GetCompanyById(string Id);

        Task<IEnumerable<Entities.Company>> getCompanyByName(string Name);
        Task<IEnumerable<Entities.Company>> getCompaniesByState(string State);
        Task<IEnumerable<Entities.Company>> getCompaniesByCity(string City);

        Task<IEnumerable<Entities.Company>> getCompaniesByCategory(CompanyCategory Category);
        //Task<IEnumerable<Entities.Company>> getCompaniesByCargoType(CargoType Type);

        Task Create(Entities.Company company);

        Task<bool> Update(Entities.Company company);

        Task<bool> Delete(string Id);
    }
}
