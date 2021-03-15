using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Messages.API.Data.Interfaces;
using Messages.API.Entities;
using Messages.API.Repositories.Interfaces;
using MongoDB.Driver;

namespace Messages.API.Repositories
{
    public class ConversationRepository : IConversationRepository
    {

        private readonly IConversationContext _context;

        public ConversationRepository(IConversationContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public ConversationRepository()
        {
        }

        public async Task<Conversation> Create(Conversation conversation)
        {
            await _context.Conversations.InsertOneAsync(conversation);

            return conversation;
        }


        public async Task<Conversation> GetConversationByUserIds(String FromUserId, String ToUserId)
        {
            Conversation conversation = await _context
                .Conversations
                .Find(item => (item.UserId1 == FromUserId) && (item.UserId2 == ToUserId)
                || ((item.UserId2 == FromUserId) && (item.UserId1 == ToUserId)))
                .SingleAsync();

            if (conversation == null)
            {
                conversation = await Create(new Conversation(FromUserId, ToUserId));
            }

            return conversation;

        }

        public async Task<IEnumerable<Conversation>> GetConversations(String UserId)
        {
            return await _context
                .Conversations
                .Find(item => item.UserId1 == UserId || item.UserId2 == UserId)
                .ToListAsync();
        }

    }
}
