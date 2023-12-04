using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;
using ServerBackEnd.Interface;
using ServerBackEnd.Middleware;
using ServerBackEnd.Models;
using ServerBackEnd.Services;

namespace ServerBackEnd
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            //IConfiguration configuration = new ConfigurationBuilder()
            //.AddJsonFile("Configuration/config.json") // Assure-toi que le fichier config.json est dans le dossier correct
            //.Build();

            

            //services.AddSingleton(configuration);

            services.Configure<GamelistDatabaseSettings>(Configuration.GetSection("GamelistDatabase"));
            services.Configure<TwitchAPISettings>(Configuration.GetSection("TwitchAPI"));

            services.AddSingleton<UsersService>();

            services.AddSingleton<ITokenService, JwtTokenService>();
            services.AddSingleton<IHttpRequestMessageFactory, HttpRequestMessageFactory>();
            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //})
            //    .AddJwtBearer(options =>
            //    {
            //        options.RequireHttpsMetadata = false;
            //        options.SaveToken = true;
            //    });

            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
            services.AddSingleton<TwitchService>();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //app.UseMiddleware<CustomHttpsRedirectionMiddleware>("/test");
            if(env.IsDevelopment())
            {
                app.UseCors("AllowAll");

                app.UseDeveloperExceptionPage();
                Console.WriteLine("DEV");
            }
            app.UseCors("AllowAll");

            app.UseRouting();

            //app.UseAuthentication();
            //app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }


    }
}
