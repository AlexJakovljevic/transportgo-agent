﻿using Demands.API.Controllers;
using Demands.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
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
        private readonly ISubscriber _subscriber;
        private readonly IDemandRepository _repository;

        public DemandDataCollector(ISubscriber subscriber, IDemandRepository repository)
        {
            this._subscriber = subscriber;
            this._repository = repository;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _subscriber.Subscribe(ProcessMessage);
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
                case "Offer":
                    return ProcessOfferAsync(message, action).Result;
            }

            return true;
        }

        private async Task<bool> ProcessOfferAsync(string message, string action)
        {
            switch (action)
            {
                case "create":
                    var offer = JsonConvert.DeserializeObject<Offer.API.Entities.Offer>(message);

                    var demand = await _repository.GetDemandById(offer.DemandID);

                    var offerIDs = demand.OfferIds;

                    offerIDs.Add(offer.Id);
                    demand.OfferIds = offerIDs;

                    await _repository.Update(demand);

                    break;

                case "update":

                    break;

                case "delete":
                    var id = JsonConvert.DeserializeObject<string>(message);

                    var demands = await _repository.getDemands();

                    foreach (var oneDemand in demands)
                    {
                        if (oneDemand.OfferIds.Contains(id))
                        {
                            var demandsOfferIDs = oneDemand.OfferIds;
                            demandsOfferIDs.Remove(id);
                            oneDemand.OfferIds = demandsOfferIDs;

                            await _repository.Update(oneDemand);

                            break;
                        }
                    }

                    break;

                default:
                    break;
            }
            return true;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
