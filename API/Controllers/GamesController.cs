using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Pagination;
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
        public async Task<ActionResult<PagedList<Game>>> GetGames([FromQuery] GameParams gameParams)
        {
            var games = await _gameService.GetAllGamesAsync(gameParams);

            if (games == null) return NotFound();

            Response.AddPaginationHeader(games.MetaData);

            return games;
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

        [HttpPut]
        public async Task<ActionResult> UpdateGame([FromQuery] GameDto gameDto)
        {
            if (gameDto == null) return BadRequest();

            var result = await _gameService.UpdateAsync(gameDto);

            if (result) return Ok(gameDto);

            return BadRequest(new ProblemDetails { Title = "Problem updating game" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGame(int id)
        {
            var result = await _gameService.DeleteAsync(id);

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem removing game" });
        }
    }
}