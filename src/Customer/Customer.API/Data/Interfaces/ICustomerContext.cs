using System;
using MongoDB.Driver;

namespace Customer.API.Data.Interfaces
{
    public interface ICustomerContext
    {
        IMongoCollection<Entities.Customer> Customers { get; }
    }
}
