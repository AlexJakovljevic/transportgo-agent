using System;
using System.Collections.Generic;
using Messages.API.Entities;
using MongoDB.Driver;

namespace Messages.API.Data
{
    public class DemandContextSeed
    {
        public static void SeedData(IMongoCollection<Message> messageCollection)
        {
            bool hasRecord = messageCollection.Find(item => true).Any();
            if (hasRecord)
            {
                messageCollection.InsertManyAsync(InsertMessages());
            }
        }

        private static IEnumerable<Message> InsertMessages() => new List<Message>()
            {
                new Message()
                {
                },
               
            };
    }
}
