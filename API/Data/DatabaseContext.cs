using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DatabaseContext : IdentityDbContext<User, Role, int>
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Game> Games { get; set; }
        public DbSet<GameCollection> GameCollections { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Role>().HasData
            (
                new Role { Id = 1, Name = "Member", NormalizedName = "MEMBER" },
                new Role { Id = 2, Name = "Admin", NormalizedName = "ADMIN" }
            );
        }
    }
}