using System;
namespace Message.API.Settings
{
    public interface IMessageDatabaseSettings
    {
        string ConnectionString { get; set; }

        string DatabaseName { get; set; }

        string CollectionName { get; set; }

    }
}
