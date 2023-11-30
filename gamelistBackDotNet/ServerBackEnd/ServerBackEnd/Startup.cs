using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.IdentityModel.Tokens;
using ServerBackEnd.Middleware;
using ServerBackEnd.Services;

namespace ServerBackEnd
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            IConfiguration configuration = new ConfigurationBuilder()
            .AddJsonFile("Configuration/config.json") // Assure-toi que le fichier config.json est dans le dossier correct
            .Build();

            services.AddSingleton(configuration);
            services.AddSingleton<ITokenService,JwtTokenService>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                });

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseMiddleware<CustomHttpsRedirectionMiddleware>("/test");
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }


    }
}
