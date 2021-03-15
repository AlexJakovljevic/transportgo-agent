using System;
using Messages.API.Data.Interfaces;
using Messages.API.Entities;
using Messages.API.Settings;
using MongoDB.Driver;

namespace Messages.API.Data
{
    public class ConversationContext : IConversationContext
    {
        public ConversationContext(IMessageDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            Conversations = database.GetCollection<Conversation>(settings.ConversationCollectionName);

        }

        public IMongoCollection<Conversation> Conversations { get; }
    }
}
