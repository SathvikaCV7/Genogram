using AutoMapper;
using Genogram.Domain.DTOs;
using Genogram.Domain.Entities;
using Genogram.Domain.Interfaces.IRepository;
using Genogram.Domain.Interfaces.IServices;
using System;
using System.Collections.Generic;
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
            try
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
            catch (Exception ex)
            {
               
                throw new Exception("An error occurred while setting primary contact.");
            }
        }

        public async Task<List<RelationshipDto>> GetRelationshipsByChildId(int childId)
        {
            try
            {
                var relationships = await _unitOfWork.Relationships.GetAllAsync(r => r.ChildId == childId, r => r.Child);
                var relationshipsDto = _mapper.Map<List<RelationshipDto>>(relationships);
                return relationshipsDto;
            }
            catch (Exception ex)
            {
                
                throw new Exception("An error occurred while retrieving relationships.");
            }
        }

        public async Task AddRelationshipAsync(RelationshipDto relationshipDto)
        {
            try
            {
                var relationship = _mapper.Map<Relationship>(relationshipDto);

                if (relationship.IsPrimaryContact)
                {
                    await SetOnlyOnePrimaryContactAsync(relationship.ChildId, true);
                }

                await _unitOfWork.Relationships.AddAsync(relationship);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                
                throw new Exception("An error occurred while adding the relationship.");
            }
        }

        public async Task UpdateRelationshipAsync(RelationshipDto relationshipDto)
        {
            try
            {
                var relationship = _mapper.Map<Relationship>(relationshipDto);

                if (relationship.IsPrimaryContact)
                {
                    await SetOnlyOnePrimaryContactAsync(relationship.ChildId, true);
                }

                await _unitOfWork.Relationships.UpdateAsync(relationship);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
               
                throw new Exception("An error occurred while updating the relationship.");
            }
        }

        public async Task DeleteRelationshipAsync(int? id)
        {
            try
            {
                if (id == null)
                {
                    throw new ArgumentNullException(nameof(id), "Relationship ID cannot be null.");
                }

                var relationship = await _unitOfWork.Relationships.GetByIdAsync(r => r.Id == id);
                if (relationship == null)
                {
                    throw new KeyNotFoundException("Relationship not found.");
                }

                _unitOfWork.Relationships.Remove(relationship);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
               
                throw new Exception("An error occurred while deleting the relationship.");
            }
        }
    }
}
