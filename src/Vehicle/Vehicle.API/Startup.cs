using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Vehicle.API.Settings;
using Vehicle.API.Settings.Interfaces;
using Vehicle.API.Data;
using Vehicle.API.Data.Interfaces;
using Vehicle.API.Repositories;
using Vehicle.API.Repositories.Interfaces;
using Plain.RabbitMQ;
using RabbitMQ.Client;

namespace Vehicle.API
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

            services.Configure<VehicleDatabaseSettings>(Configuration.GetSection(nameof(VehicleDatabaseSettings)));

            services.AddSingleton<IVehicleDatabaseSettings>(sp => sp.GetRequiredService<IOptions<VehicleDatabaseSettings>>().Value);

            services.AddTransient<IVehicleContext, VehicleContext>();
            services.AddTransient<IVehicleRepository, VehicleRepository>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "Vehicle API",
                    Version = "v1"
                });
            });

            services.AddCors();

            services.AddSingleton<IConnectionProvider>(new ConnectionProvider("amqp://guest:guest@localhost:5672"));
            services.AddScoped<IPublisher>(x => new Publisher(x.GetService<IConnectionProvider>(),
                "vehicle_exchange",
                exchangeType: ExchangeType.Topic));
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
                endpoints.MapControllers();
            });

            app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"));

            app.UseSwagger();
            app.UseSwaggerUI(
                c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Vehicle API V1");
                }
                );
        }
    }
}
