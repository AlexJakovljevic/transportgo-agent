using System;
using Messages.API.Data.Interfaces;
using Messages.API.Entities;
using Messages.API.Settings;
using MongoDB.Driver;

namespace Messages.API.Data
{
    public class MessageContext : IMessageContext
    {
        public MessageContext(IMessageDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            Messages = database.GetCollection<Message>(settings.MessageCollectionName);

        }

        public IMongoCollection<Message> Messages { get; }
    }
}
