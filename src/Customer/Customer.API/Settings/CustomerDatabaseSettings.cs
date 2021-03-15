using System;
namespace Customer.API.Settings
{
    public class CustomerDatabaseSettings : ICustomerDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string CollectionName { get; set; }
    }
}
