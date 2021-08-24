using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Plain.RabbitMQ;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Customer.API.Services
{
    public class CustomerDataCollector : IHostedService
    {
        private readonly ISubscriber subscriber;

        public CustomerDataCollector(ISubscriber subscriber)
        {
            this.subscriber = subscriber;
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
                case "Demand":
                    return ProcessDemand(message, action);
                case "Offer":
                    return ProcessOffer(message, action);
            }

            return true;
        }

        private bool ProcessDemand(string message, string action)
        {
            if (action == "delete")
            {
                var id = JsonConvert.DeserializeObject<string>(message);
            }
            else
            {
                var demand = JsonConvert.DeserializeObject<Demands.API.Entites.Demand>(message);
            }
            return true;
        }
        private bool ProcessOffer(string message, string action)
        {
            if (action == "delete")
            {
                var id = JsonConvert.DeserializeObject<string>(message);
            }
            else
            {
                //var offer = JsonConvert.DeserializeObject<Offer.API.Entities.Offer>(message);
            }
            return true;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
