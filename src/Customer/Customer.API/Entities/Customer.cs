using System;
using MongoDB.Bson;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace Customer.API.Entities
{
  
    public class Customer
    {
        [BsonId]
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public Address Address { get; set; }

        public Contact Contact { get; set; }

        public List<string> OfferList { get; set; }
    }
}

public class Address
{
    public String Country { get; set; }
    public String State { get; set; }
    public String City { get; set; }
    public String Zip { get; set; }
    public String StreetLine1 { get; set; }
    public String StreetLine2 { get; set; }
}

public class Contact
{
    public String Phone { get; set; }
    public String Fax { get; set; }
    public String Email { get; set; }
}