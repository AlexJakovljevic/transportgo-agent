using System;
using Messages.API.Entities;
using MongoDB.Driver;

namespace Messages.API.Data.Interfaces
{
    public interface IMessageContext
    {
        IMongoCollection<Message> Messages { get; }
    }
}
