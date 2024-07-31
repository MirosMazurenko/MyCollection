using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Interfaces
{
    public class GameRepository : IGameRepository
    {
        private readonly DatabaseContext _context;
        public GameRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<Game>> GetAll()
        {
            return await _context.Games.ToListAsync();
        }

        public async Task<Game> GetById(int id)
        {
            return await _context.Games.FindAsync(id);
        }

        public async Task<bool> Insert(Game game)
        {
            if (game != null)
            {
                _context.Games.Add(game);
                return await _context.SaveChangesAsync() > 0;
            }
            return false;
        }

        public async Task<bool> Update(Game newGame)
        {
            if (newGame != null)
            {
                _context.Games.Update(newGame);
                return await _context.SaveChangesAsync() > 0;
            }
            return false;
        }

        public async Task<bool> Delete(Game game)
        {
            if (game != null)
            {
                _context.Games.Remove(game);
                return await _context.SaveChangesAsync() > 0;
            }
            return false;
        }

    }
}