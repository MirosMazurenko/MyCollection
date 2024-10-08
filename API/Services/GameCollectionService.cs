using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Repositories.Interfaces;
using API.Services.Interfaces;
using AutoMapper;

namespace API.Services
{
    public class GameCollectionService : IGameCollectionService
    {
        private readonly IGameCollectionRepository _gameCollectionRepository;
        private readonly IMapper _mapper;
        private readonly IGameRepository _gameRepository;
        public GameCollectionService(IGameCollectionRepository gameCollectionRepository, IGameRepository gameRepository, IMapper mapper)
        {
            _gameRepository = gameRepository;
            _mapper = mapper;
            _gameCollectionRepository = gameCollectionRepository;
        }

        public async Task<GameCollectionDto> GetGameCollectionDto(string userId)
        {
            if (string.IsNullOrEmpty(userId)) return null;

            var gameCollection = await _gameCollectionRepository.GetById(userId);

            if (gameCollection == null) return null;

            return gameCollection.MapGameCollectionToDto();
        }
        public async Task<GameCollection> GetGameCollection(string userId)
        {
            if (string.IsNullOrEmpty(userId)) return null;

            var gameCollection = await _gameCollectionRepository.GetById(userId);

            if (gameCollection == null) return null;

            return gameCollection;
        }

        public async Task<GameCollection> CreateGameCollection(string userId)
        {
            if (userId == null) return null;

            var gameCollection = new GameCollection { UserId = userId };

            await _gameCollectionRepository.Create(gameCollection);

            return gameCollection;
        }

        public async Task<bool> InsertGameInCollection(GameCollection gameCollection, int gameId, string gameCondition)
        {
            if (gameCollection == null) return false;

            if (gameCollection.Items.Any(g => g.GameId == gameId && g.GameCondition == gameCondition)) return false;

            var game = await _gameRepository.GetById(gameId);

            return await _gameCollectionRepository.Insert(gameCollection, game, gameCondition);
        }
        public Task<bool> RemoveGameFromCollection(GameCollection gameCollection, GameDto gameDto, string gameCondition)
        {
            if (gameDto == null || gameCollection == null) return null;

            return _gameCollectionRepository.Delete(gameCollection, gameDto.Id, gameCondition);
        }
    }
}