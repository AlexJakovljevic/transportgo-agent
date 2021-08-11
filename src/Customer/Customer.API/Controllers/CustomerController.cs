using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Customer.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Customer.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _repository;
        private readonly ILogger<CustomerController> _logger;

        public CustomerController(ICustomerRepository repository, ILogger<CustomerController> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Customer>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Entities.Customer>>> GetCustomers()
        {
            var customers = await _repository.GetCustomers();
            return Ok(customers);
        }


        [HttpGet("{id}")] //:length(24)}", Name = "GetCustomer")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(Entities.Customer), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Entities.Customer>> GetCustomer(string id)
        {
            var customer = await _repository.GetCustomer(id);
            if(customer == null)
            {
                _logger.LogError($"Customer with {id} does not exist");
                return NotFound();
            }
            return Ok(customer);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Entities.Customer), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Entities.Customer>> CreateCustomer([FromBody] Entities.Customer customer)
        {
            await _repository.Create(customer);
            return CreatedAtAction("GetCustomers", new { customer.Id }, customer); //CreatedAtRoute("GetCustomer", new { id =  customer.Id }, customer);
        }

        [HttpPut]
        [ProducesResponseType(typeof(Entities.Customer), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateCustomer([FromBody] Entities.Customer customer)
        {
            return Ok(await _repository.Update(customer));
        }

        [HttpDelete("{id:length(24)}")]
        [ProducesResponseType(typeof(Entities.Customer), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteCustomer(string id)
        {
            return Ok(await _repository.Delete(id));
        }



    }
}
