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

        public void AddItem(Game game)
        {
            if (Items.All(item => item.GameId != game.Id))
            {
                Items.Add(new CollectionItem { Game = game });
            }
            else return;
        }

        public void RemoveItem(int gameId)
        {
            var item = Items.FirstOrDefault(item => item.GameId == gameId);

            if (item == null) return;

            Items.Remove(item);
        }
    }
}