using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitialization
    {
        public static async Task Initialize(DatabaseContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "miros",
                    Email = "miros@test.com",
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com",
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
            }



            if (context.Games.Any()) return;

            using (var reader = new StreamReader(@"D:\VScode_projects\MyCollection\API\wwwroot\CSVFiles\game_prices.csv"))
            using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
            { HeaderValidated = null, MissingFieldFound = null }))
            {
                var games = csv.GetRecords<Game>().ToList();

                context.Games.AddRange(games);
                context.SaveChanges();
            }
        }
    }
}