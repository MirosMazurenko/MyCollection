using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Repositories.Interfaces
{
    public interface IGameCollectionRepository
    {
        Task<GameCollection> GetById(string userId);
        Task<bool> Create(GameCollection gameCollection);
        Task<bool> Insert(GameCollection gameCollection, Game game);
        Task<bool> Delete(GameCollection gameCollection, int gameId);
    }
}