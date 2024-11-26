using AutoMapper;
using Genogram.Domain.DTOs;
using Genogram.Domain.Entities;
using Genogram.Domain.Interfaces.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Genogram.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelationshipController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork; 
        private readonly IMapper _mapper;

        public RelationshipController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("GetByChildId/{childId}")]
        public async Task<ActionResult<IEnumerable<Relationship>>> GetRelationshipsByChildId(int childId)
        {
            var relationships = await _unitOfWork.Relationships.GetAllAsync(r => r.ChildId == childId,r => r.Child);

            if (!relationships.Any())
                return NotFound("No relationships found for the given child.");

            return Ok(relationships);
        }

       
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Relationship>> GetRelationshipById(int id)
        {
            var relationship = await _unitOfWork.Relationships.GetByIdAsync(r => r.Id == id);
            if (relationship == null)
                return NotFound("Relationship not found.");
            return Ok(relationship);
        }


      
        [HttpPost("Add")]
        public async Task<ActionResult> AddRelationship(RelationshipDto relationshipDto)
        {
            var relationship = _mapper.Map<Relationship>(relationshipDto);
            await _unitOfWork.Relationships.AddAsync(relationship);      
            return Ok(new { message = "Success" });

        }
        [HttpPost("Edit")]
        public async Task<ActionResult> EditRelationship(RelationshipDto relationshipDto)
        {

            var relationship = _mapper.Map<Relationship>(relationshipDto);
            await _unitOfWork.Relationships.UpdateRelationshipAsync(relationship);
            await _unitOfWork.SaveChangesAsync();
            return Ok(new { message = "Success" });

        }



    }
}
