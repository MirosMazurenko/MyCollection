using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Extensions
{
    public static class GameExtensions
    {
        public static IQueryable<Game> Sort(this IQueryable<Game> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return query.OrderBy(g => g.Name);

            query = orderBy switch
            {
                "priceLoose" => query.OrderBy(g => g.LoosePrice),
                "priceLooseDesc" => query.OrderByDescending(g => g.LoosePrice),
                "priceComplete" => query.OrderBy(g => g.CompletePrice),
                "priceCompleteDesc" => query.OrderByDescending(g => g.LoosePrice),
                "priceNew" => query.OrderBy(g => g.NewPrice),
                "priceNewDesc" => query.OrderByDescending(g => g.NewPrice),
                _ => query.OrderBy(p => p.Name),
            };

            return query;
        }

        public static IQueryable<Game> Search(this IQueryable<Game> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
            {
                return query;
            }

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Game> Filter(this IQueryable<Game> query, string consoleName)
        {
            var consoleNameList = new List<string>();

            if (!string.IsNullOrEmpty(consoleName))
            {
                consoleNameList.AddRange(consoleName.ToLower().Split(',').ToList());
            }

            query = query.Where(g => consoleNameList.Count == 0 || consoleNameList.Contains(g.ConsoleName.ToLower()));

            return query;
        }
    }
}