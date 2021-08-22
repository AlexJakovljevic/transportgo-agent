using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Customer.API.Data;
using Customer.API.Data.Interfaces;
using Customer.API.Repositories;
using Customer.API.Repositories.Interfaces;
using Customer.API.Services;
using Customer.API.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Plain.RabbitMQ;
using RabbitMQ.Client;

namespace Customer.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.Configure<CustomerDatabaseSettings>(Configuration.GetSection(nameof(CustomerDatabaseSettings)));

            services.AddSingleton<ICustomerDatabaseSettings>(sp => sp.GetRequiredService<IOptions<CustomerDatabaseSettings>>().Value);

            services.AddTransient<ICustomerContext, CustomerContext>();

            services.AddTransient<ICustomerRepository, CustomerRepository>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "Customer API",
                    Version = "v1"
                });
            });

            services.AddCors();

            services.AddSingleton<IConnectionProvider>(new ConnectionProvider("amqp://guest:guest@localhost:5672"));

            //TODO: Change exchange name
            services.AddSingleton<ISubscriber>(x => new Subscriber(x.GetService<IConnectionProvider>(),
                "company_exchange",
                "customer_queue",
                "customer.*",
                exchangeType: ExchangeType.Topic));

            services.AddHostedService<CustomerDataCollector>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                _ = endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(
                c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Customer API V1");
                }
                );
        }
    }
}
