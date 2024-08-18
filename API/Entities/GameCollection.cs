using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class GameCollection
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public List<CollectionItem> Items { get; set; } = new List<CollectionItem>();

        public void AddItem(Game game, string gameCondition)
        {
            Items.Add(new CollectionItem { GameCondition = gameCondition, Game = game });
        }

        public void RemoveItem(int gameId, string gameCondition)
        {
            var item = Items.FirstOrDefault(item => item.GameId == gameId && item.GameCondition == gameCondition);

            if (item == null) return;

            Items.Remove(item);
        }
    }
}