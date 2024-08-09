using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Pagination
{
    public class GameParams : PaginationParams
    {
        public string OrderBy { get; set; }
        public string SearchTerm { get; set; }
        public string Consoles { get; set; }
    }
}