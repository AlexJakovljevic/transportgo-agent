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
                    Address = new Address
                    {
                        City = "Beograd",
                        State = "Srbija",
                        StreetLine1 = "Cvijiceva 133",
                        StreetLine2 = "Palilula",
                        Zip = "11002"
                    },
                    Contact = new Contact
                    {
                        Email = "pera.peric@gmail.com",
                        Fax = "1231231231",
                        Phone = "23131231231"
                    },
                    OfferList = new List<string>()
                    {
                        "id2", "id1"
                    }
                },
               new Entities.Customer()
                {
                    FirstName = "Zika",
                    LastName = "Zikic",
                    Address = new Address
                    {
                        City = "Beograd",
                        State = "Srbija",
                        StreetLine1 = "Kopaonicka 133",
                        StreetLine2 = "Rakovica",
                        Zip = "11022"
                    },
                    Contact = new Contact
                    {
                        Email = "zika.zikic@gmail.com",
                        Fax = "231241",
                        Phone = "41241241"
                    },
                    OfferList = new List<string>()
                    {
                        "id13", "id21"
                    }
                }
            };
        }
    }
}
