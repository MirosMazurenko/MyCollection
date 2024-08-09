using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Repositories.Interfaces;
using API.Services.Interfaces;

namespace API.Services
{
    public class ConsoleService : IConsoleService
    {
        private readonly IConsoleRepository _consoleRepository;
        public ConsoleService(IConsoleRepository consoleRepository)
        {
            _consoleRepository = consoleRepository;
        }

        public async Task<List<string>> GetConsoles()
        {
            var consoles = await _consoleRepository.GetAll();

            if (consoles.Count == 0) return null;

            return consoles;
        }
    }
}