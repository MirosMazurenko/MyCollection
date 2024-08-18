using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Services.Interfaces
{
    public interface IGameCollectionService
    {
        Task<GameCollection> GetGameCollection(string userId);

        Task<GameCollection> CreateGameCollection(string userId);
        Task<bool> InsertGameInCollection(GameCollection gameCollection, int gameId, string gameCondition);
        Task<bool> RemoveGameFromCollection(GameCollection gameCollection, GameDto gameDto, string gameCondition);
    }
}