using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Pagination;
using API.Repositories.Interfaces;
using API.Services.Interfaces;
using AutoMapper;

namespace API.Services
{
    public class GameService : IGameService
    {
        private readonly IGameRepository _gameRepository;
        private readonly IMapper _mapper;
        public GameService(IGameRepository gameRepository, IMapper mapper)
        {
            _mapper = mapper;
            _gameRepository = gameRepository;
        }

        public async Task<PagedList<Game>> GetAllGamesAsync(GameParams gameParams)
        {
            var gamesQuery = _gameRepository.GetAll()
                .Sort(gameParams.OrderBy)
                .Search(gameParams.SearchTerm)
                .Filter(gameParams.Consoles)
                .AsQueryable();

            var games = await PagedList<Game>.ToPagedList(gamesQuery, gameParams.PageNumber, gameParams.PageSize);

            return games;
        }
        public async Task<GameDto> GetGameByIdAsync(int id)
        {
            var game = await _gameRepository.GetById(id);

            if (game == null) return null;

            var gameDto = _mapper.Map<GameDto>(game);
            return gameDto;
        }
        public async Task<bool> CreateGameAsync(GameDto gameDto)
        {
            if (gameDto == null) return false;

            var game = _mapper.Map<Game>(gameDto);

            if (game == null) return false;

            return await _gameRepository.Insert(game);
        }
        public async Task<bool> UpdateAsync(GameDto gameDto)
        {
            if (gameDto == null) return false;

            var game = await _gameRepository.GetById(gameDto.Id);
            _mapper.Map(gameDto, game);

            if (game == null) return false;

            return await _gameRepository.Update(game);
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var game = await _gameRepository.GetById(id);

            if (game == null) return false;

            return await _gameRepository.Delete(game);
        }
    }
}