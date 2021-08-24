using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Offer.API.Repositories.Interfaces;
using Plain.RabbitMQ;
using Offer.API.Entities;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Offer.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OfferController : ControllerBase
    {
        private readonly IOfferRepository _repository;
        private readonly IPublisher publisher;
        private readonly ILogger<OfferController> _logger;

        public OfferController(IOfferRepository repository, ILogger<OfferController> logger, IPublisher publisher)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger;
            this.publisher = publisher;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Offer>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Entities.Offer>>> GetOffers()
        {
            var offers = await _repository.GetOffers();
            return Ok(offers);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Entities.Offer), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<Entities.Offer>> GetOfferById(string id)
        {
            var offer = await _repository.GetOfferById(id);

            if (offer == null)
            {
                _logger.LogError($"Offer with id: {id}, not found!");
                return NotFound();
            }

            return Ok(offer);
        }

        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<Entities.Offer>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Entities.Offer>> CreateOffer([FromBody] Entities.Offer offer)
        {
            await _repository.Create(offer);

            this.PublishEvent("create", "company.offer", offer: offer);
            this.PublishEvent("create", "customer.offer", offer: offer);

            return CreatedAtAction("GetOffers", new { offer.Id }, offer);
        }

        [HttpPut]
        [ProducesResponseType(typeof(IEnumerable<Entities.Offer>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateOffer([FromBody] Entities.Offer offer)
        {
            this.PublishEvent("update", "company.offer", offer: offer);
            this.PublishEvent("update", "customer.offer", offer: offer);
            return Ok(await _repository.Update(offer));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(IEnumerable<Entities.Offer>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteVehicleById(string id)
        {
            this.PublishEvent("delete", "company.offer", id: id);
            this.PublishEvent("delete", "customer.offer", id: id);
            return Ok(await _repository.Delete(id));
        }

        private void PublishEvent(string eventString, string topicString, Entities.Offer offer = null, string id = null)
        {
            Dictionary<string, object> headers = new Dictionary<string, object>();
            headers.Add("Action", eventString);
            headers.Add("Class", "Offer");
            if (offer != null)
            {
                publisher.Publish(JsonConvert.SerializeObject(offer), topicString, headers);
            }
            else
            {
                publisher.Publish(JsonConvert.SerializeObject(id ?? ""), topicString, headers);
            }
            return;
        }
    }
}
