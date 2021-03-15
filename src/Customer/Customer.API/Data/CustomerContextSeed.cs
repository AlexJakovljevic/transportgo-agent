using System;
using System.Collections.Generic;
using MongoDB.Driver;

namespace Customer.API.Data
{
    public class CustomerContextSeed
    {
        public void SeedData(IMongoCollection<Entities.Customer> customerCollection)
        {
            bool existingProduct = customerCollection.Find(c => true).Any();
            if(!existingProduct)
            {
                customerCollection.InsertManyAsync(GetPreconfiguredCustomers());
            }
        }

        private IEnumerable<Entities.Customer> GetPreconfiguredCustomers()
        {
            return new List<Entities.Customer>()
            {
                new Entities.Customer()
                {
                    FirstName = "Pera",
                    LastName = "Peric",
                    Address = "Neka adresa",
                    Contact = "011223131231",
                    OfferList = new List<string>()
                    {
                        "Offerid1", "offerid2"
                    }
                },
                new Entities.Customer()
                {
                    FirstName = "Zika",
                    LastName = "ZZikic",
                    Address = "Neka adresa2",
                    Contact = "0112231312331",
                    OfferList = new List<string>()
                    {
                        "ofer3", "ofer4"
                    }
                }
            };
        }
    }
}
