using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Pagination;

namespace API.Services.Interfaces
{
    public interface IGameService
    {
        Task<PagedList<Game>> GetAllGamesAsync(GameParams gameParams);
        Task<GameDto> GetGameByIdAsync(int id);
        Task<bool> CreateGameAsync(GameDto gameDto);
        Task<bool> UpdateAsync(GameDto gameDto);
        Task<bool> DeleteAsync(int id);
    }
}