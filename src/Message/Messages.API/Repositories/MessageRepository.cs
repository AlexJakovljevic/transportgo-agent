using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Messages.API.Data.Interfaces;
using Messages.API.Entities;
using Messages.API.Repositories.Interfaces;
using MongoDB.Driver;

namespace Messages.API.Repositories
{
    public class MessageRepository : IMessageRepository
    {

        private readonly IMessageContext _context;

        private readonly IConversationRepository _conversationRepository;

        public MessageRepository(IMessageContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public MessageRepository()
        {
        }

        public async Task Create(Message message, String FromUserId, String ToUserId)
        {
            await _context.Messages.InsertOneAsync(Message);
        }

        public async Task<bool> Delete(String Id)
        {
            var deleted = await _context.Messages.DeleteOneAsync(item => item.Id == Id);
            return deleted.IsAcknowledged && deleted.DeletedCount > 0;
        }

        public async Task<Message> GetMessagesById(String Id)
        {
            return await _context.Messages.Find(item => item.Id == Id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Message>> GetMessagesByUserIds(String FromUserId, String ToUserId, Int32 cursor)
        {
            Conversation conversation = await _conversationRepository.GetConversationByUserIds(FromUserId, ToUserId);

            return await _context.Messages.Find(item => item.ConversationId == conversation.Id)
                                          .SortByDescending(item => item.DateCreated)
                                          .Limit(cursor)
                                          .ToListAsync();
        }

        public async Task<IEnumerable<Message>> GetMessages()
        {
            return await _context.Messages.Find(item => true).ToListAsync();
        }

        public async Task<bool> Update(Message Message)
        {
            var updated = await _context.Messages
                .ReplaceOneAsync(filter: item => item.Id == Message.Id, replacement: Message);

            return updated.IsAcknowledged && updated.ModifiedCount > 0;
        }
    }
}
