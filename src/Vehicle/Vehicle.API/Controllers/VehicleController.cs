using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Plain.RabbitMQ;
using Vehicle.API.Entities;
using Vehicle.API.Repositories.Interfaces;

namespace Vehicle.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class VehicleController : ControllerBase
    {

        private readonly IVehicleRepository _repository;
        private readonly IPublisher publisher;
        private readonly ILogger<VehicleController> _logger;

        public VehicleController(IVehicleRepository repository, ILogger<VehicleController> logger, IPublisher publisher)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger;
            this.publisher = publisher;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Entities.Vehicle>>> GetVehicles()
        {
            var vehicles = await _repository.getVehicles();
            return Ok(vehicles);
        }

        [HttpGet("{id}")] //:length(24)}", Name = "GetDemand")]
        [ProducesResponseType(typeof(Entities.Vehicle), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<Entities.Vehicle>> GetVehicleById(string id)
        {
            var vehicle = await _repository.GetVehicleById(id);

            if (vehicle == null)
            {
                _logger.LogError($"Vehicle with id: {id}, not found!");
                return NotFound();
            }

            return Ok(vehicle);
        }

        [Route("[action]/{Brand}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<IEnumerable<Entities.Vehicle>>> GetVehiclesByBrand(string Brand)
        {
            var vehicles = await _repository.getVehiclesByBrand(Brand);

            if (vehicles == null)
            {
                _logger.LogError($"Vehicle with brand: {Brand}, not found!");
                return NotFound();
            }

            return Ok(vehicles);
        }


        [Route("[action]/{ProductionYear}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<IEnumerable<Entities.Vehicle>>> GetVehiclesByProductionYear(UInt16 ProductionYear)
        {
            var vehicles = await _repository.getVehiclesByProductionYear(ProductionYear);

            if (vehicles == null)
            {
                _logger.LogError($"Vehicle with year of production: {ProductionYear}, not found!");
                return NotFound();
            }

            return Ok(vehicles);
        }

        [Route("[action]/{CompanyID}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<IEnumerable<Entities.Vehicle>>> GetVehiclesByCompanyID(string CompanyID)
        {
            var vehicles = await _repository.getVehiclesByCompanyID(CompanyID);

            if (vehicles == null)
            {
                _logger.LogError($"Vehicle with brand: {CompanyID}, not found!");
                return NotFound();
            }

            return Ok(vehicles);
        }


        [Route("[action]/{Type}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<IEnumerable<Entities.Vehicle>>> GetVehiclesByType(String TypeID)
        {
            var vehicles = await _repository.getVehiclesByType(TypeID);

            if (vehicles == null)
            {
                _logger.LogError($"Vehicle with type: {TypeID}, not found!");
                return NotFound();
            }

            return Ok(vehicles);
        }

        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Entities.Vehicle>> CreateVehicle([FromBody] Entities.Vehicle vehicle)
        {
            await _repository.Create(vehicle);

            this.PublishEvent("create", "company.vehicle", vehicle: vehicle);

            return CreatedAtAction("GetVehicles", new { vehicle.Id }, vehicle); //CreatedAtRoute("GetVehicle", new { id = vehicle.Id }, vehicle);
        }

        [HttpPut]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateVehicle([FromBody] Entities.Vehicle vehicle)
        {
            this.PublishEvent("update", "company.vehicle", vehicle: vehicle);
            return Ok(await _repository.Update(vehicle));
        }

        [HttpDelete("{id}")] //:length(24)}")]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteVehicleById(string id)
        {
            this.PublishEvent("delete", "company.vehicle", id: id);
            return Ok(await _repository.Delete(id));
        }

        private void PublishEvent(string eventString, string topicString, Entities.Vehicle vehicle = null, string id = null)
        {
            Dictionary<string, object> headers = new Dictionary<string, object>();
            headers.Add("Action", eventString);
            headers.Add("Class", "Vehicle");
            if (vehicle != null)
            {
                publisher.Publish(JsonConvert.SerializeObject(vehicle), topicString, headers);
            }
            else
            {
                publisher.Publish(JsonConvert.SerializeObject(id ?? ""), topicString, headers);
            }
            return;
        }
    }
}
