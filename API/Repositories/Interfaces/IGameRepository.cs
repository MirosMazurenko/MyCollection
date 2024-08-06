using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Repositories.Interfaces
{
    public interface IGameRepository
    {
        IQueryable<Game> GetAll();
        Task<Game> GetById(int id);
        Task<bool> Insert(Game game);
        Task<bool> Update(Game newGame);
        Task<bool> Delete(Game game);
    }
}