using API.DTOs;
using API.Entities;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GamesController : BaseApiController
    {
        private readonly IGameService _gameService;
        public GamesController(IGameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GameDto>>> GetGames()
        {
            var gamesDto = await _gameService.GetAllGamesAsync();

            if (gamesDto == null) return NotFound();

            return gamesDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GameDto>> GetGame(int id)
        {
            var gameDto = await _gameService.GetGameByIdAsync(id);

            if (gameDto == null) return NotFound();

            return gameDto;
        }

        [HttpPost]
        public async Task<ActionResult> CreateGame([FromQuery] GameDto gameDto)
        {
            if (gameDto == null) return BadRequest();

            var result = await _gameService.CreateGameAsync(gameDto);

            if (result) return StatusCode(StatusCodes.Status201Created);

            return BadRequest(new ProblemDetails { Title = "Problem creating new game" });
        }
    }
}