using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Services.Interfaces
{
    public interface ITokenService
    {
        Task<string> GenerateToken(IdentityUser user);
    }
}