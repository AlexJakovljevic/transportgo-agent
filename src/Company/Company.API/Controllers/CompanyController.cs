using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Company.API.Entities;
using Company.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Company.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyRepository _repository;
        private readonly ILogger<CompanyController> _logger;

        public CompanyController(ICompanyRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Company>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Entities.Company>>> GetCompanies()
        {
            var companies = await _repository.getCompanies();
            return Ok(companies);
        }

        [HttpGet("{id}")] //:length(24)}", Name = "GetCompanies")]
        [ProducesResponseType(typeof(Entities.Company), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<Entities.Company>> GetCompanyById(string id)
        {
            var company = await _repository.getCompanyById(id);

            if (company == null)
            {
                //TODO: Logger is null, fix it
                _logger.LogError($"Company with id: {id}, not found!");
                return NotFound();
            }
            return Ok(company);
        }


        [Route("[action]/{Name}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Company>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<IEnumerable<Entities.Company>>> GetCompanyByName(string Name)
        {
            var companies = await _repository.getCompanyByName(Name);

            if (companies == null)
            {
                _logger.LogError($"Companies with name: {Name}, not found!");
                return NotFound();
            }
            return Ok(companies);
        }

        [Route("[action]/{State}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Company>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<IEnumerable<Entities.Company>>> GetCompaniesByState(string State)
        {
            var companies = await _repository.getCompaniesByState(State);

            if (companies == null)
            {
                _logger.LogError($"Companies in state: {State}, not found!");
                return NotFound();
            }
            return Ok(companies);
        }

        [Route("[action]/{City}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Company>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<IEnumerable<Entities.Company>>> GetCompaniesByCity(string City)
        {
            var companies = await _repository.getCompaniesByCity(City);

            if (companies == null)
            {
                _logger.LogError($"Companies in city: {City}, not found!");
                return NotFound();
            }
            return Ok(companies);
        }

        [Route("[action]/{Category}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Entities.Company>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<IEnumerable<Entities.Company>>> GetCompaniesByCategory(CompanyCategory Category)
        {
            var companies = await _repository.getCompaniesByCategory(Category);

            if (companies == null)
            {
                _logger.LogError($"Companies with category: {Category}, not found!");
                return NotFound();
            }
            return Ok(companies);
        }

        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<Entities.Company>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Entities.Company>> CreateCompany([FromBody] Entities.Company company)
        {
            await _repository.Create(company);
            return CreatedAtAction("GetCompanies", new { company.Id }, company); //CreatedAtRoute("GetCompanies", new { company.Id }, company);
        }

        [HttpPut]
        [ProducesResponseType(typeof(IEnumerable<Entities.Company>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateCompany([FromBody] Entities.Company company)
        {

            return Ok(await _repository.Update(company));
        }

        [HttpDelete("{id:length(24)}")]
        [ProducesResponseType(typeof(IEnumerable<Entities.Company>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteCompanyById(string id)
        {

            return Ok(await _repository.Delete(id));
        }

    }
}
