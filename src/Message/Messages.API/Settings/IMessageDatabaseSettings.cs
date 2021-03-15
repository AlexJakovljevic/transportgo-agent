using System;
namespace Messages.API.Settings
{
    public interface IMessageDatabaseSettings
    {
        string ConnectionString { get; set; }

        string DatabaseName { get; set; }

        string MessageCollectionName { get; set; }

        string ConversationCollectionName { get; set; }

    }
}
