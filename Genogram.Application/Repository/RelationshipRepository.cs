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

        public async Task<Relationship?> GetPrimaryContactAsync(int childId)
        {
            return await _context.Relationships
                .Where(r => r.ChildId == childId && r.IsPrimaryContact)
                .FirstOrDefaultAsync();
        }

        public async Task<Relationship?> UpdateRelationshipAsync(Relationship updatedRelationship)
        {
            var existingRelationship = await _context.Relationships
                .FirstOrDefaultAsync(r => r.Id == updatedRelationship.Id);

            if (existingRelationship == null)
            {
                return null;
            }

            existingRelationship.RelationshipType = updatedRelationship.RelationshipType;
            existingRelationship.IsPrimaryContact = updatedRelationship.IsPrimaryContact;
            existingRelationship.Email = updatedRelationship.Email;
            existingRelationship.PhoneNumber = updatedRelationship.PhoneNumber;


            return existingRelationship;
        }
    }


}
