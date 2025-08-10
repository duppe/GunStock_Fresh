using Microsoft.EntityFrameworkCore;
using GunStock_One.Models; // 🎯 Sørg for at du har riktig namespace for modellene
using System;

namespace GunStock_One.Data
{
    public class AppDbContext : DbContext
    {
        // 🎯 Global variabel for dynamisk tabellnavn
        public static string GlobalVariable { get; set; } = "988673757"; // Standardverdi

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 🎯 Definer dynamisk tabellnavn for "Item"
            string tableName = $"GunStock_{GlobalVariable}_items";
            modelBuilder.Entity<Item>().ToTable(tableName); // Dynamisk tabellnavn

            base.OnModelCreating(modelBuilder);
        }

        // 🎯 DBSet for dynamisk tabell
        public DbSet<Item> Items { get; set; }

        // 🎯 Andre tabeller
        public DbSet<LogOn> LogOnEntries { get; set; }
    }
}
