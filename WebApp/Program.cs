
using DataModel;
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

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
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


                User x = new User();
                x.Name = "First 1";
                db.Add(x);
                db.SaveChanges();
                
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
