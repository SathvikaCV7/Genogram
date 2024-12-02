using Genogram.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Child> Children { get; set; }
        public DbSet<Relationship> Relationships { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Relationship>()
                .HasOne(r => r.Child)
                .WithMany(c => c.Relationships)
                .HasForeignKey(r => r.ChildId);

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Child>().HasData(
            new Child
            {
                Id = 1,
                Name = "John Doe",
                Address = "123 Elm Street, Springfield, 12345",
                Nationality = "American",
                Language = "English",
                DateOfBirth = "1985-01-01",
                Image = "cvbnm"
            });
            modelBuilder.Entity<Relationship>().HasData(

                    new Relationship
                    {
                        Id = 1,
                        FirstName = "Jane",
                        LastName = "Doe",
                        RelationshipType = "Mother",
                        PhoneNumber = "123-456-7890",
                        Email = "jane.doe@example.com",
                        IsPrimaryContact = true,
                        Remarks = "Lives nearby",
                        ChildId = 1
                    },
                    new Relationship
                    {
                        Id = 2,
                        FirstName = "Mark",
                        LastName = "Doe",
                        RelationshipType = "Father",
                        PhoneNumber = "987-654-3210",
                        Email = "mark.doe@example.com",
                        IsPrimaryContact = false,
                        Remarks = "Travels frequently",
                        ChildId = 1
                    }

                );
        }
    }
}



