using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Repositories.Interfaces;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace API.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IGameCollectionService _gameCollectionService;
        private readonly TokenService _tokenService;
        private readonly UserManager<User> _userManager;


        public AccountService(UserManager<User> userManager, IAccountRepository accountRepository, IGameCollectionService gameCollectionService, TokenService tokenService)
        {
            _gameCollectionService = gameCollectionService;
            _tokenService = tokenService;
            _accountRepository = accountRepository;
            _userManager = userManager;

        }

        public async Task<UserDto> LoginAccount(LoginDto loginDto)
        {
            var user = await _accountRepository.GetUser(loginDto.Username);
            if (user == null || !await _accountRepository.CheckPassword(loginDto.Username, loginDto.Password))
                return null;

            var gameCollectionDto = await _gameCollectionService.GetGameCollectionDto(loginDto.Username);

            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = await _tokenService.GenerateToken(user),
                GameCollectionDto = gameCollectionDto
            };
        }

        public async Task<bool> RegisterAccount(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email };
            var result = await _accountRepository.CreateUser(user, registerDto.Password);

            if (!result) return false;

            return await _accountRepository.AddToRole(user, "Member");
        }
        public async Task<UserDto> GetCurrentUser(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            var gameCollectionDto = await _gameCollectionService.GetGameCollectionDto(username);

            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = await _tokenService.GenerateToken(user),
                GameCollectionDto = gameCollectionDto
            };
        }
    }
}