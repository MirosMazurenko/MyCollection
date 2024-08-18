using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace API.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<User> _userManager;
        public AccountRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<User> GetUser(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }

        public async Task<bool> CheckPassword(string username, string password)
        {
            var user = await GetUser(username);
            return await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<bool> CreateUser(User user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            return result.Succeeded;
        }

        public async Task<bool> AddToRole(User user, string role)
        {
            await _userManager.AddToRoleAsync(user, role);
            return true;
        }
    }
}