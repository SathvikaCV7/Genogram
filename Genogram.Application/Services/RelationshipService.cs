using AutoMapper;
using Genogram.Domain.DTOs;
using Genogram.Domain.Entities;
using Genogram.Domain.Interfaces.IRepository;
using Genogram.Domain.Interfaces.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Application.Services
{
    public class RelationshipService:IRelationshipService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RelationshipService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task SetOnlyOnePrimaryContact(int childId, bool isPrimaryContact)
        {
            if (isPrimaryContact)
            {
                var relationships = await _unitOfWork.Relationships.GetByChildIdAsync(childId);
                foreach (var relationship in relationships)
                {
                    relationship.IsPrimaryContact = false;
                }
                await _unitOfWork.Relationships.UpdateRangeAsync(relationships);
                await _unitOfWork.SaveChangesAsync();
            }
        }

        public async Task AddRelationshipAsync(RelationshipDto relationshipDto)
        {
            var relationship = _mapper.Map<Relationship>(relationshipDto);

            if (relationship.IsPrimaryContact)
            {
                await SetOnlyOnePrimaryContact(relationship.ChildId, true);
            }
            await _unitOfWork.Relationships.AddAsync(relationship);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateRelationshipAsync(RelationshipDto relationshipDto)
        {
            var relationship = _mapper.Map<Relationship>(relationshipDto);

            if (relationship.IsPrimaryContact)
            {
                await SetOnlyOnePrimaryContact(relationship.ChildId, true);
            }
            await _unitOfWork.Relationships.UpdateAsync(relationship);
            await _unitOfWork.SaveChangesAsync();
        }

    }
}
