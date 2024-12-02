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
    public class RelationshipRepository: Repository<Relationship>,IRelationshipRepository
    {
        private readonly ApplicationDbContext _context;

        public RelationshipRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Relationship?> UpdateAsync(Relationship updatedRelationship)
        {
            var existingRelationship = await _context.Relationships
                .FirstOrDefaultAsync(r => r.Id == updatedRelationship.Id);

            if (existingRelationship == null)
            {
                return null;
            }
            existingRelationship.FirstName = updatedRelationship.FirstName;
            existingRelationship.LastName = updatedRelationship.LastName;
            existingRelationship.RelationshipType = updatedRelationship.RelationshipType;
            existingRelationship.IsPrimaryContact = updatedRelationship.IsPrimaryContact;
            existingRelationship.Email = updatedRelationship.Email;
            existingRelationship.PhoneNumber = updatedRelationship.PhoneNumber;
            existingRelationship.Remarks = updatedRelationship.Remarks;
            return existingRelationship;
        }


        public async Task<List<Relationship>> GetByChildIdAsync(int childId)
        {
            return await _context.Relationships
                                 .Where(r => r.ChildId == childId)
                                 .ToListAsync();
        }

        public async Task UpdateRangeAsync(IEnumerable<Relationship> relationships)
        {
            _context.Relationships.UpdateRange(relationships);
            await _context.SaveChangesAsync();
        }
    }


}
