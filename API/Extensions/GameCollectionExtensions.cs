using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class GameCollectionExtensions
    {
        public static GameCollectionDto MapGameCollectionToDto(this GameCollection gameCollection)
        {
            return new GameCollectionDto
            {
                Id = gameCollection.Id,
                UserId = gameCollection.UserId,
                Items = gameCollection.Items.Select(item => new CollectionItemDto
                {
                    GameId = item.GameId,
                    Name = item.Game.Name,
                    GameCondition = item.GameCondition,
                    ConsoleName = item.Game.ConsoleName,
                    LoosePrice = item.Game.LoosePrice,
                    CompletePrice = item.Game.CompletePrice,
                    NewPrice = item.Game.NewPrice,
                }).ToList()
            };
        }
    }
}