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
    public class RelationshipService : IRelationshipService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RelationshipService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task SetOnlyOnePrimaryContactAsync(int childId, bool isPrimaryContact)
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

        public async Task<List<RelationshipDto>> GetRelationshipsByChildId(int childId)
        {
            var relationships = await _unitOfWork.Relationships.GetAllAsync(r => r.ChildId == childId, r => r.Child);
            var relationshipsDto = _mapper.Map<List<RelationshipDto>>(relationships);
            return relationshipsDto;
        }

        public async Task AddRelationshipAsync(RelationshipDto relationshipDto)
        {
            var relationship = _mapper.Map<Relationship>(relationshipDto);

            if (relationship.IsPrimaryContact)
            {
                await SetOnlyOnePrimaryContactAsync(relationship.ChildId, true);
            }
            await _unitOfWork.Relationships.AddAsync(relationship);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateRelationshipAsync(RelationshipDto relationshipDto)
        {
            var relationship = _mapper.Map<Relationship>(relationshipDto);

            if (relationship.IsPrimaryContact)
            {
                await SetOnlyOnePrimaryContactAsync(relationship.ChildId, true);
            }
            await _unitOfWork.Relationships.UpdateAsync(relationship);
            var remarks = relationship.Remarks;
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteRelationshipAsync(int? id)
        {
            var relationship=await _unitOfWork.Relationships.GetByIdAsync(r=>r.Id==id);
            _unitOfWork.Relationships.Remove(relationship);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
