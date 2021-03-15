using System;
namespace Messages.API.Settings
{
    public class MessageDatabaseSettings : IMessageDatabaseSettings
    {
        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }

        public string MessageCollectionName { get; set; }

        public string ConversationCollectionName { get; set; }
    }
}
