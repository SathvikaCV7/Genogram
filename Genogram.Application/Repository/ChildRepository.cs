using Genogram.Domain.DTOs;
using Genogram.Domain.Entities;
using Genogram.Domain.Interfaces.IRepository;
using Genogram.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Application.Repository
{
    public class ChildRepository:Repository<Child>,IChildRepository
    {
        private readonly ApplicationDbContext _context;

        public ChildRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Child?> UpdateAsync(Child child)
        {
            var existingChild = await _context.Children
               .FirstOrDefaultAsync(c => c.Id == child.Id);

            if (existingChild != null)
            {
                existingChild.Name = child.Name;
                existingChild.Address = child.Address;
                var dob = child.DateOfBirth.Split("T")[0];
                existingChild.DateOfBirth = dob;
                existingChild.Nationality = child.Nationality;
                existingChild.Language = child.Language;
                existingChild.Image = child.Image;
                return existingChild;
            }
            else
            {
                return null;
            }
           
        }

    }
}
