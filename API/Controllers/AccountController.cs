using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Services;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService, IGameCollectionService gameCollectionService, TokenService tokenService)
        {
            _accountService = accountService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var userDto = await _accountService.LoginAccount(loginDto);
            if (userDto == null) return Unauthorized();

            return Ok(userDto);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var result = await _accountService.RegisterAccount(registerDto);
            if (!result) return ValidationProblem();

            return StatusCode(201);
        }

        [Authorize]
        [HttpPost("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            return await _accountService.GetCurrentUser(User.Identity.Name);
        }
    }
}