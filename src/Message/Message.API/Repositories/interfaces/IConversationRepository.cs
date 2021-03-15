using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Messages.API.Entities;

namespace Messages.API.Repositories.Interfaces
{
    public interface IConversationRepository
    {
        Task<IEnumerable<Conversation>> GetConversations(String UserId);

        Task<Conversation> GetConversationByUserIds(String FromUserId, String ToUserId);

        Task<Conversation> Create(Conversation conversation);

    }
}
