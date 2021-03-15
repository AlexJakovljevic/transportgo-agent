using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Messages.API.Entities;

namespace Messages.API.Repositories.Interfaces
{
    public interface IMessageRepository
    {
        Task<IEnumerable<Message>> GetMessages();

        Task<IEnumerable<Message>> GetMessagesByUserIds(String FromUserId, String ToUserId, Int32 cursor);

        Task Create(Message message, String FromUserId, String ToUserId);

        Task<bool> Update(Message message);

        Task<bool> Delete(string Id);

    }
}
