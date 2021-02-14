using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Company.API.Entities;
using MongoDB.Driver;

namespace Company.API.Data.Interface
{
    public interface ICompanyContext
    {
        IMongoCollection<Entities.Company> Companies { get; }
    }
}
