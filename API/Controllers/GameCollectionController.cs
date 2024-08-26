using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GameCollectionController : BaseApiController
    {
        private readonly IGameCollectionService _gameCollectionService;
        private readonly IGameService _gameService;
        public GameCollectionController(IGameCollectionService gameCollectionService, IGameService gameService)
        {
            _gameService = gameService;
            _gameCollectionService = gameCollectionService;
        }
        private string GetUserId()
        {
            return User.Identity?.Name;
        }

        [Authorize(Roles = "Member")]
        [HttpGet("getGameCollection")]
        public async Task<ActionResult<GameCollectionDto>> GetGameCollection()
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }
            var gameCollectionDto = await _gameCollectionService.GetGameCollectionDto(userId);

            if (gameCollectionDto == null || gameCollectionDto.Items.Count == 0) return NotFound();

            return Ok(gameCollectionDto);
        }

        [Authorize(Roles = "Member")]
        [HttpPost("addItem")]
        public async Task<ActionResult> AddItemToCollection(int gameId, string gameCondition)
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }
            if (gameCondition != "Loose" && gameCondition != "Cib" && gameCondition != "New") return NotFound();

            var gameCollectionDto = await _gameCollectionService.GetGameCollection(userId);

            gameCollectionDto ??= await _gameCollectionService.CreateGameCollection(userId);

            var result = await _gameCollectionService.InsertGameInCollection(gameCollectionDto, gameId, gameCondition);
            if (result) return Ok();

            return BadRequest();
        }

        [Authorize(Roles = "Member")]
        [HttpDelete("removeItem")]
        public async Task<ActionResult> RemoveItemFromCollection(int gameId, string gameCondition)
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var gameCollectionDto = await _gameCollectionService.GetGameCollection(userId);
            if (gameCollectionDto == null) return NotFound();

            var gameDto = await _gameService.GetGameByIdAsync(gameId);
            if (gameDto == null) return NotFound();

            if (gameCondition != "Loose" && gameCondition != "Cib" && gameCondition != "New") return NotFound();

            var result = await _gameCollectionService.RemoveGameFromCollection(gameCollectionDto, gameDto, gameCondition);
            if (result) return Ok();

            return BadRequest();
        }
    }
}