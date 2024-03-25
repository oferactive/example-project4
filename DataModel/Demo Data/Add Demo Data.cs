using DataModel.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel.Demo_Data
{
    public class Add_Demo_Data
    {
        public void Execute()
        {
            ModelDbContext DB = new ModelDbContext();

            User first = DB.Users.FirstOrDefault(x => x.Name == "Demo User");
            if ( first != null) 
            {
                return;
            }

            List<User> userList = new List<User>();
            List<InsurancePolicy> ipList = new List<InsurancePolicy>();

            User DemoUser = new User()
            {
                Name = "Demo User",
                Email = "demo@org.com"
            };
            userList.Add(DemoUser);
            
            for( int i = 0;  i < 10; i++ ) 
            {
                User user = new User()
                {
                    Name = $"User {i}",
                    Email = $"user.{i}@org.com"
                };
                userList.Add(user);
            }

            foreach (User user in userList)
            {
                DB.Add(user);
            }

            Random random = new Random( 1049);
            for (int i = 0; i < 30; i++)
            {
                int index = random.Next(0, userList.Count - 1);
                User user = userList[index];
                int backDaysStart = random.Next(0, 400);
                int lenghtInDays = random.Next(60, 200);
                int amount = random.Next(1000, 20000);
                InsurancePolicy policy = new InsurancePolicy()
                {
                    PolicyNumber = $"{i + 1}",
                    UserId = user.ID,
                    InsuranceAmount = amount,
                    StartDate = DateTime.Today.AddDays(-backDaysStart),
                    EndDate = DateTime.Today.AddDays(-backDaysStart + lenghtInDays)
                };
                DB.Add(policy);
            }

            DB.SaveChanges();
            

        }
    }
}
