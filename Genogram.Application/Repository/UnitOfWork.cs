using Genogram.Domain.Interfaces.IRepository;
using Genogram.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Application.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public IChildRepository Children { get; }
        public IRelationshipRepository Relationships { get; }

        public UnitOfWork(
            ApplicationDbContext context,
            IChildRepository childRepository,
            IRelationshipRepository relationshipRepository)
        {
            _context = context;
            Children = childRepository;
            Relationships = relationshipRepository;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
