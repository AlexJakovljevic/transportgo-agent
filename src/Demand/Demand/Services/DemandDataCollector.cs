using Demands.API.Controllers;
using Demands.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Plain.RabbitMQ;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Demands.API.Services
{
    public class DemandDataCollector : IHostedService
    {
        private readonly ISubscriber subscriber;
        //private readonly DemandController demandController;
        private readonly IDemandRepository _repository;

        public DemandDataCollector(ISubscriber subscriber, IDemandRepository repository)
        {
            this.subscriber = subscriber;
            //this.demandController = demandController;
            this._repository = repository;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            subscriber.Subscribe(ProcessMessage);
            return Task.CompletedTask;
        }

        private bool ProcessMessage(string message, IDictionary<string, object> headers)
        {
            //TODO: Process message

            var codedAction = (byte[])headers["Action"];
            var action = Encoding.UTF8.GetString(codedAction, 0, codedAction.Length);

            var codedDataClass = (byte[])headers["Class"];
            var dataClass = Encoding.UTF8.GetString(codedDataClass, 0, codedDataClass.Length);

            switch (dataClass)
            {
                /*case "Demand":
                    return ProcessDemand(message, action);
                case "Vehicle":
                    return ProcessVehicle(message, action);
                */
                case "Offer":
                    return ProcessOfferAsync(message, action).Result;
            }

            return true;
        }

        /*
        private bool ProcessDemand(string message, string action)
        {
            if (action == "delete")
            {
                var id = JsonConvert.DeserializeObject<string>(message);
            }
            else
            {
                var demand = JsonConvert.DeserializeObject<Demand>(message);
            }
            return true;
        }

        private bool ProcessVehicle(string message, string action)
        {
            if (action == "delete")
            {
                var id = JsonConvert.DeserializeObject<string>(message);
            }
            else
            {
                var vehicle = JsonConvert.DeserializeObject<Vehicle.API.Entities.Vehicle>(message);
            }
            return true;
        }
        */

        private async Task<bool> ProcessOfferAsync(string message, string action)
        {
            if (action == "delete")
            {
                var id = JsonConvert.DeserializeObject<string>(message);
            }
            else
            {
                var offer = JsonConvert.DeserializeObject<Offer.API.Entities.Offer>(message);

                var demand = await _repository.GetDemandById(offer.DemandID);

                if (demand == null)
                {
                    //_logger.LogError($"Demand with id: {id}, not found!");
                }

                var offerIDs = demand.OfferIds;

                //Task<ActionResult<Demands.API.Entites.Demand>> demandRequest = demandController.GetDemandById(offer.DemandID);
                //var demand = await demandRequest.Result.Value;
                //var offerIDs = demand.OfferIds;
                offerIDs.Add(offer.Id);
                demand.OfferIds = offerIDs;

                await _repository.Update(demand);
                //await demandController.UpdateDemand(demand);
            }
            return true;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
