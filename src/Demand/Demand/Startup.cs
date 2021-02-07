using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Demands.API.Data;
using Demands.API.Data.Interfaces;
using Demands.API.Repositories;
using Demands.API.Repositories.Interfaces;
using Demands.API.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace Demands.API
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

            services.Configure<DemandDatabaseSettings>(Configuration.GetSection(nameof(DemandDatabaseSettings)));

            services.AddSingleton<IDemandDatabaseSettings>(sp => sp.GetRequiredService<IOptions<DemandDatabaseSettings>>().Value);

            services.AddTransient<IDemandContext, DemandContext>();
            services.AddTransient<IDemandRepository, DemandRepository>();
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
        }
    }
}
