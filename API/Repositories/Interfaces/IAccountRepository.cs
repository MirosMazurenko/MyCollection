using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Repositories.Interfaces
{
    public interface IAccountRepository
    {
        Task<User> GetUser(string username);
        Task<bool> CheckPassword(string username, string password);
        Task<bool> CreateUser(User user, string password);
        Task<bool> AddToRole(User user, string role);
    }
}