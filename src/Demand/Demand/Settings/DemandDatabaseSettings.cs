using System;
namespace Demands.API.Settings
{
    public class DemandDatabaseSettings : IDemandDatabaseSettings
    {
        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }

        public string CollectionName { get; set; }
    }
}
