using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Company.API.Entities;
using MongoDB.Driver;

namespace Company.API.Data
{
    public class CatalogContextSeed
    {
        public static void SeedData(IMongoCollection<Entities.Company> demandCollection)
        {
            bool hasRecord = demandCollection.Find(item => true).Any();
            if (hasRecord)
            {
                demandCollection.InsertManyAsync(InsertCompanies());
            }
        }

        private static IEnumerable<Entities.Company> InsertCompanies() => new List<Entities.Company>()
            {
                new Entities.Company()
                {
                    Name = "Transped",
                    Address = new CompanyAddress
                    {
                        City = "Beograd",
                        State = "Srbija",
                        StreetLine1 = "Prva ulica",
                        StreetLine2 = "Podulica",
                        Zip = "11002"
                    },
                    Cargos = new List<Cargo>()
                    {
                        new Cargo()
                        {
                            Size = 10,
                            Type = CargoType.Frozen,
                            Weight = 102.4,
                            AdditionalInfo = ""
                        }
                    },
                    Category = CompanyCategory.Spedition,
                    Contact = new Contact
                    {
                        Email = "transped.mile@gmail.com",
                        Fax = "00000000",
                        Phone = "011234567"
                    }
                },
                new Entities.Company()
                {
                    Name = "Voja i sinovi",
                     Address = new CompanyAddress
                    {
                        City = "Novi Sad",
                        State = "Srbija",
                        StreetLine1 = "Prva ulica",
                        StreetLine2 = "Podulica",
                        Zip = "21004"
                    },
                    Cargos = new List<Cargo>()
                    {
                        new Cargo()
                        {
                            Size = 50,
                            Type = CargoType.OnPalettes,
                            Weight = 10020,
                            AdditionalInfo = "Large cargo only (over 5000kg)"
                        }
                    },
                    Category = CompanyCategory.Spedition,
                    Contact = new Contact
                    {
                        Email = "voja.sinovi@gmail.com",
                        Fax = "00000002",
                        Phone = "021765432"
                    }
                }
            };
    }
}
