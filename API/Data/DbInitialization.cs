using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using CsvHelper;
using CsvHelper.Configuration;

namespace API.Data
{
    public static class DbInitialization
    {
        public static void Initialize(DatabaseContext context)
        {
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