using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<IActionResult> GetGameCollection()
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }
            var gameCollection = await _gameCollectionService.GetGameCollection(userId);

            if (gameCollection == null || gameCollection.Items.Count == 0) return NotFound();

            return Ok(gameCollection);
        }

        [Authorize(Roles = "Member")]
        [HttpPost("addItem")]
        public async Task<IActionResult> AddItemToCollection(int gameId)
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var gameCollection = await _gameCollectionService.GetGameCollection(userId);
            //var gameDto = await _gameService.GetGameByIdAsync(gameId);
            //if (gameDto == null) return NotFound();

            gameCollection ??= await _gameCollectionService.CreateGameCollection(userId);

            var result = await _gameCollectionService.InsertGameInCollection(gameCollection, gameId);
            if (result) return Ok();

            return BadRequest();
        }

        [Authorize(Roles = "Member")]
        [HttpDelete("removeItem")]
        public async Task<IActionResult> RemoveItemFromCollection(int productId)
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var gameCollection = await _gameCollectionService.GetGameCollection(userId);
            if (gameCollection == null) return NotFound();

            var gameDto = await _gameService.GetGameByIdAsync(productId);
            if (gameDto == null) return NotFound();

            var result = await _gameCollectionService.RemoveGameFromCollection(gameCollection, gameDto);
            if (result) return Ok();

            return BadRequest();
        }
    }
}