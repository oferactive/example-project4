
using DataModel;
using DataModel.Demo_Data;
using DataModel.Model;
using Microsoft.EntityFrameworkCore;

namespace WebApp
{
    public class Program
    {
        public static void Main(string[] args)
        {

            UpdateDatabase();

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddApplicationServices();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if ( app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }

        public static void UpdateDatabase()
        {
            try
            {
                ModelDbContext db = new ModelDbContext();
                db.Database.Migrate();

                Add_Demo_Data demo = new Add_Demo_Data();
                demo.Execute();


            }
            catch (Exception ex)
            {
                Console.WriteLine("===================================================================");
                Console.WriteLine("Exception: " + ex.Message);
                Console.WriteLine("-------------------------------------------------------------------");
                Console.WriteLine("Stack Trace: " + ex.StackTrace);
                Console.WriteLine("===================================================================");

            }

        }
    }
}
