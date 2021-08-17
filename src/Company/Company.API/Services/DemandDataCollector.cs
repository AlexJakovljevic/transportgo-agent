using Demands.API.Entites;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Plain.RabbitMQ;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Company.API.Services
{
    public class DemandDataCollector : IHostedService
    {
        private readonly ISubscriber subscriber;

        public DemandDataCollector(ISubscriber subscriber)
        {
            this.subscriber = subscriber;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            subscriber.Subscribe(ProcessDemand);
            return Task.CompletedTask;
        }

        private bool ProcessDemand(string message, IDictionary<string, object> headers)
        {
            //TODO: Process message
            
            var action = headers.Keys.First();
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

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
