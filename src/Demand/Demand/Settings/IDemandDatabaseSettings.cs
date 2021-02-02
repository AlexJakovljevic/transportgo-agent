using System;
namespace Demands.API.Settings
{
    public interface IDemandDatabaseSettings
    {
        string ConnectionString { get; set; }

        string DatabaseName { get; set; }

        string CollectionName { get; set; }

    }
}
