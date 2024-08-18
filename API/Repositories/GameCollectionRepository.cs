using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class GameCollectionRepository : IGameCollectionRepository
    {
        private readonly DatabaseContext _context;
        public GameCollectionRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<GameCollection> GetById(string userId)
        {
            return await _context.GameCollections.
                Include(i => i.Items)
                .ThenInclude(g => g.Game)
                .FirstOrDefaultAsync(gameCollection => gameCollection.UserId == userId);
        }
        public async Task<bool> Create(GameCollection gameCollection)
        {
            _context.GameCollections.Add(gameCollection);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> Insert(GameCollection gameCollection, Game game)
        {
            gameCollection.AddItem(game);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(GameCollection gameCollection, int gameId)
        {
            gameCollection.RemoveItem(gameId);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}