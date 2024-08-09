using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class ConsoleRepository : IConsoleRepository
    {
        private readonly DatabaseContext _context;
        public ConsoleRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<string>> GetAll()
        {
            return await _context.Games.Select(g => g.ConsoleName).Distinct().OrderBy(console => console).ToListAsync();
        }
    }
}