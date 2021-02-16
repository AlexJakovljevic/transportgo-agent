using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Company.API.Data;
using Company.API.Data.Interface;
using Company.API.Repositories;
using Company.API.Repositories.Interfaces;
using Company.API.Settings;
using Company.API.Settings.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Company.API
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

            services.Configure<CompanyDatabaseSettings>(Configuration.GetSection(nameof(CompanyDatabaseSettings)));

            services.AddSingleton<ICompanyDatabaseSettings>(sp => sp.GetRequiredService<IOptions<CompanyDatabaseSettings>>().Value);

            services.AddTransient<ICompanyContext, CompanyContext>();
            services.AddTransient<ICompanyRepository, CompanyRepository>();
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
