using AutoMapper;
using Genogram.Domain.DTOs;
using Genogram.Domain.Entities;
using Genogram.Domain.Interfaces.IRepository;
using Genogram.Domain.Interfaces.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Genogram.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelationshipController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork; 

        private readonly IRelationshipService _relationshipService;


        public RelationshipController(IUnitOfWork unitOfWork, IMapper mapper, IRelationshipService relationshipService)
        {
            _unitOfWork = unitOfWork;
            _relationshipService = relationshipService;
        }
      

        [HttpPost("Add")]
        public async Task<ActionResult> AddRelationshipAsync([FromBody] RelationshipDto relationshipDto)
        {
            await _relationshipService.AddRelationshipAsync(relationshipDto);
            return Ok(new { message = "Success" });
        }

        [HttpPost("Edit")]
        public async Task<ActionResult> EditRelationshipAsync([FromBody] RelationshipDto relationshipDto)
        {
            await _relationshipService.UpdateRelationshipAsync(relationshipDto);
            return Ok(new { message = "Success" });
        }


        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteRelationshipAsync(int? id)
        {
           await _relationshipService.DeleteRelationshipAsync(id);
            return Ok(new { message = "Successfully deleted" });
        }
       



    }
}
