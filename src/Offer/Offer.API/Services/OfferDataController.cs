using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Offer.API.Repositories.Interfaces;
using Plain.RabbitMQ;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Offer.API.Services
{
    public class OfferDataCollector : IHostedService
    {
        private readonly ISubscriber _subscriber;
        private readonly IOfferRepository _repository;

        public OfferDataCollector(ISubscriber subscriber, IOfferRepository repository)
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
                case "Demand":
                    return ProcessDemandAsync(message, action).Result;
            }

            return true;
        }

        private async Task<bool> ProcessDemandAsync(string message, string action)
        {
            switch (action)
            {
                case "create":

                    break;

                case "update":

                    break;

                case "delete":
                    var id = JsonConvert.DeserializeObject<string>(message);

                    var offers = await _repository.GetOffersByDemandID(id);

                    foreach (var offer in offers)
                    {
                        await _repository.Delete(offer.Id);

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
