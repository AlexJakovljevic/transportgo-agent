using System;
using Messages.API.Entities;
using MongoDB.Driver;

namespace Messages.API.Data.Interfaces
{
    public interface IConversationContext
    {
        IMongoCollection<Conversation> Conversations { get; }
    }
}
