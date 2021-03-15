using System;
namespace Message.API.Settings
{
    public class MessageDatabaseSettings : IMessageDatabaseSettings
    {
        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }

        public string CollectionName { get; set; }
    }
}
