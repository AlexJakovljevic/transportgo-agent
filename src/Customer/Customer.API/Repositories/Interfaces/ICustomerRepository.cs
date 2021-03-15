using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Customer.API.Repositories.Interfaces
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Entities.Customer>> GetCustomers();
        Task<Entities.Customer> GetCustomer(string id);

        Task Create(Entities.Customer customer);
        Task<bool> Update(Entities.Customer customer);
        Task<bool> Delete(string id);
    }
}
