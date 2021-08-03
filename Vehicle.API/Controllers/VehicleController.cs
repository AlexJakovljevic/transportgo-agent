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

        public VehicleController(IVehicleRepository repository, IPublisher publisher)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            this.publisher = publisher;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Entities.Vehicle>>> GetVehicles()
        {
            var vehicles = await _repository.getVehicles();
            return Ok(vehicles);
        }

        [HttpGet("{id:length(24)}", Name = "GetDemand")]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<IEnumerable<Entities.Vehicle>>> GetVehicleById(string id)
        {
            var vehicle = await _repository.GetVehicleById(id);

            if (vehicle == null)
            {
                _logger.LogError($"Vehicle with id: {id}, not found!");
                return NotFound();
            }

            return Ok(vehicle);
        }

        [Route("[action]/{brand}")]
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


        [Route("[action]/{productionYear}")]
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


        [Route("[action]/{type}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<IEnumerable<Entities.Vehicle>>> GetVehiclesByType(VehicleType Type)
        {
            var vehicles = await _repository.getVehiclesByType(Type);

            if (vehicles == null)
            {
                _logger.LogError($"Vehicle with type: {Type}, not found!");
                return NotFound();
            }

            return Ok(vehicles);
        }

        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Entities.Vehicle>> CreateVehicle([FromBody] Entities.Vehicle vehicle)
        {
            await _repository.Create(vehicle);

            publisher.Publish(JsonConvert.SerializeObject(vehicle), "vehicle.create", null);

            return CreatedAtRoute("GetVehicle", new { id = vehicle.Id }, vehicle);
        }

        [HttpPut]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateVehicle([FromBody] Entities.Vehicle vehicle)
        {

            return Ok(await _repository.Update(vehicle));
        }

        [HttpDelete("{id:length(24)}")]
        [ProducesResponseType(typeof(IEnumerable<Entities.Vehicle>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteVehicleById(string id)
        {

            return Ok(await _repository.Delete(id));
        }
    }
}
