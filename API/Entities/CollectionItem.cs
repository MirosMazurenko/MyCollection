using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class CollectionItem
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public string GameCondition { get; set; }
        public Game Game { get; set; }

        public int CollectionId { get; set; }
        public GameCollection Collection { get; set; }
    }
}