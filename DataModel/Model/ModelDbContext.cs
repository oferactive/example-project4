using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using DataModel.Model;

namespace DataModel
{

    public class ModelDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<InsurancePolicy> InusrancePolicies { get; set; }

        public string DbPath { get; }

        public ModelDbContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath( folder);
            DbPath = System.IO.Path.Join(path, "ExampleProject4.db");
        }

        // The following configures EF to create a Sqlite database file in the
        // special "local" folder for your platform.
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite( $"Data Source={DbPath}");
            Console.WriteLine( $"DB Path = {DbPath}");
        }
    }
}
