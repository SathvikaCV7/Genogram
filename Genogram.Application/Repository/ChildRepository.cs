using Genogram.Domain.Entities;
using Genogram.Domain.Interfaces.IRepository;
using Genogram.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<Child> GetChildWithRelationshipsAsync(int id)
        {
            return await _context.Children.Include(c => c.Relationships).FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
