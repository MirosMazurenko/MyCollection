using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Repositories.Interfaces
{
    public interface IConsoleRepository
    {
        Task<List<string>> GetAll();
    }
}