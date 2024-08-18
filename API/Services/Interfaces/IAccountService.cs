using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Services.Interfaces
{
    public interface IAccountService
    {
        Task<UserDto> LoginAccount(LoginDto loginDto);
        Task<bool> RegisterAccount(RegisterDto registerDto);
    }
}