using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Messages.API.Entities;
using Messages.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Messages.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _repository;
        // private readonly ILogger<MessageController> _logger;

        public MessageController(IMessageRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }


        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Message>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
        {
            var demands = await _repository.GetMessages();
            return Ok(demands);
        }

        [Route("[action]/{fromUserId}/{toUserId}/{cursor}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Message>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessageByUserIds(String FromUserId, String ToUserId, Int32 cursor)
        {
            var messages = await _repository.GetMessagesByUserIds(FromUserId, ToUserId, cursor);

            return Ok(messages);
        }

        [Route("[action]/{fromUserId}/{toUserId}")]
        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<Message>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Message>> CreateMessage([FromBody] Message Message, String FromUserId, String ToUserId)
        {
            await _repository.Create(Message, FromUserId, ToUserId);
            return CreatedAtRoute("GetMessage", new { id = Message.Id}, Message);
        }

        [HttpPut]
        [ProducesResponseType(typeof(IEnumerable<Message>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateMessage([FromBody] Message Message)
        {
            
            return Ok(await _repository.Update(Message));
        }

        [HttpDelete("{id:length(24)}")]
        [ProducesResponseType(typeof(IEnumerable<Message>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteMessageById(string Id)
        {

            return Ok(await _repository.Delete(Id));
        }
    }
}
