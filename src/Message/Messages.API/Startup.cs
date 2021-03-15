using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Messages.API.Data;
using Messages.API.Data.Interfaces;
using Messages.API.Repositories;
using Messages.API.Repositories.Interfaces;
using Messages.API.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Messages.API
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

            services.Configure<MessageDatabaseSettings>(Configuration.GetSection(nameof(MessageDatabaseSettings)));
            
            services.AddSingleton<IMessageDatabaseSettings>(sp => sp.GetRequiredService<IOptions<MessageDatabaseSettings>>().Value);

            services.AddTransient<IMessageContext, MessageContext>();

            services.AddTransient<IConversationContext, ConversationContext>();
            services.AddTransient<IMessageRepository, MessageRepository>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "Messages API",
                    Version = "v1"
                });
            });
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

            app.UseSwagger();
            app.UseSwaggerUI(
                c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Messages API V1");
                }
                );
        }
    }
}
