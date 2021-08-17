using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Demands.API.Entites;
using Demands.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Plain.RabbitMQ;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Demands.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DemandController : ControllerBase
    {
        private readonly IDemandRepository _repository;
        private readonly ILogger<DemandController> _logger;
        private readonly IPublisher publisher;

        public DemandController(IDemandRepository repository, ILogger<DemandController> logger, IPublisher publisher)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger;
            this.publisher = publisher;
        }


        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Demand>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Demand>>> GetDemands()
        {
            var demands = await _repository.getDemands();
            return Ok(demands);
        }

        [HttpGet("{id}")] //:length(24)}", Name = "GetDemand")]
        [ProducesResponseType(typeof(Demand), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<Demand>> GetDemandById(string id)
        {
            var demand = await _repository.GetDemandById(id);

            if (demand == null)
            {
                _logger.LogError($"Demand with id: {id}, not found!");
                return NotFound();
            }

            return Ok(demand);
        }


        [Route("[action]/{Name}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Demand>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<IEnumerable<Demand>>> GetDemandByName(string Name)
        {
            var demands = await _repository.getDemandByName(Name);

            if (demands == null)
            {
                _logger.LogError($"Demands with name: {Name}, not found!");
                return NotFound();
            }

            return Ok(demands);
        }


        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<Demand>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Demand>> CreateDemand([FromBody] Demand demand)
        {
            await _repository.Create(demand);

            // Dictionary<string, object> headers = new Dictionary<string, object>();
            // headers.Add("create", "create");
            // publisher.Publish(JsonConvert.SerializeObject(demand), "demand.create", headers);
            this.PublishEvent("create", "demand.create", demand: demand);

            return CreatedAtAction("GetDemands", new { demand.Id }, demand); //CreatedAtRoute("GetDemand", new { id = demand.Id}, demand);
        }

        [HttpPut]
        [ProducesResponseType(typeof(IEnumerable<Demand>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateDemand([FromBody] Demand demand)
        {
            // Dictionary<string, object> headers = new Dictionary<string, object>();
            // headers.Add("update", "update");
            // publisher.Publish(JsonConvert.SerializeObject(demand), "demand.update", headers);
            this.PublishEvent("update", "demand.update", demand: demand);

            return Ok(await _repository.Update(demand));
        }

        [HttpDelete("{id}")] //:length(24)}")]
        [ProducesResponseType(typeof(IEnumerable<Demand>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteDemandById(string id)
        {
            this.PublishEvent("delete", "demand.delete", id: id);
            return Ok(await _repository.Delete(id));
        }

        private void PublishEvent(string eventString, string topicString, Demand demand = null, string id = null)
        {
            Dictionary<string, object> headers = new Dictionary<string, object>();
            headers.Add(eventString, eventString);
            if (demand != null)
            {
                publisher.Publish(JsonConvert.SerializeObject(demand), topicString, headers);
            }
            else
            {
                publisher.Publish(JsonConvert.SerializeObject(id ?? ""), topicString, headers);
            }
            return;
        }

    }
}
