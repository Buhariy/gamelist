namespace ServerBackEnd
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}


//------------------------------ PARTIE Server

//using ServerBackEnd.Models;
//using ServerBackEnd.Services;

//var builder = WebApplication.CreateBuilder(args);

////Add services to the container.
//builder.Services.AddControllers();
//builder.Host.UseServiceProviderFactory(new DefaultServiceProviderFactory());
//builder.Host.ConfigureServices(services =>
//{
//    services.AddSingleton(builder.Configuration);
//});
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
////builder.Services.AddEndpointsApiExplorer();
////builder.Services.AddSwaggerGen();
////Console.WriteLine(builder.Configuration.GetSection("GamelistDatabase").Value);




//// cette injection marche
//builder.Services.Configure<GamelistDatabaseSettings>(builder.Configuration.GetSection("GamelistDatabase"));
//builder.Services.AddSingleton<UsersService>();


//var app = builder.Build();

//// Configure the HTTP request pipeline.
////if (app.Environment.IsDevelopment())
////{
////    app.UseSwagger();
////    app.UseSwaggerUI();
////}

////app.UseHttpsRedirection();
//app.UseAuthorization();
//app.MapControllers();
//app.Run();

