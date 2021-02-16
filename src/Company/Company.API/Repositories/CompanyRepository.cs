using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Company.API.Data.Interface;
using Company.API.Entities;
using Company.API.Repositories.Interfaces;
using MongoDB.Driver;

namespace Company.API.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly ICompanyContext _context;

        public CompanyRepository(ICompanyContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public CompanyRepository()
        {
        }

        public async Task Create(Entities.Company company)
        {
            await _context.Companies.InsertOneAsync(company);
        }

        public async Task<bool> Delete(string Id)
        {
            var deleted = await _context.Companies.DeleteOneAsync(item => item.Id == Id);
            return deleted.IsAcknowledged && deleted.DeletedCount > 0;
        }

        public async Task<Entities.Company> GetCompanyById(string Id)
        {
            return await _context.Companies.Find(item => item.Id == Id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Entities.Company>> getCompanyByName(String Name)
        {
            return await _context.Companies.Find(item => item.Name == Name).ToListAsync();
        }
        public async Task<IEnumerable<Entities.Company>> getCompaniesByState(string State)
        {
            return await _context.Companies.Find(item => item.Address.State == State).ToListAsync();
        }

        public async Task<IEnumerable<Entities.Company>> getCompaniesByCity(string City)
        {
            return await _context.Companies.Find(item => item.Address.City == City).ToListAsync();
        }

        public async Task<IEnumerable<Entities.Company>> getCompaniesByCategory(CompanyCategory Category)
        {
            return await _context.Companies.Find(item => item.Category == Category).ToListAsync();
        }

        //public async Task<IEnumerable<Entities.Company>> getCompaniesByCargoType(CargoType Type)
        //{
        //   return await _context.Companies.Find(item => item.Cargos.AllCargoTypesInList.Contains(Type)).ToListAsync();
        //}

        public async Task<IEnumerable<Entities.Company>> getCompanies()
        {
            return await _context.Companies.Find(item => true).ToListAsync();
        }

        public async Task<bool> Update(Entities.Company company)
        {
            var updated = await _context.Companies
                .ReplaceOneAsync(filter: item => item.Id == company.Id, replacement: company);

            return updated.IsAcknowledged && updated.ModifiedCount > 0;
        }
    }
}
