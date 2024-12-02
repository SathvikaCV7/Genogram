using AutoMapper;
using Genogram.Domain.DTOs;
using Genogram.Domain.Entities;
using Genogram.Domain.Interfaces.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Genogram.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelationshipController : ControllerBase
    {
        private readonly IRelationshipService _relationshipService;

        public RelationshipController(IRelationshipService relationshipService)
        {
            _relationshipService = relationshipService;
        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddRelationshipAsync([FromBody] RelationshipDto relationshipDto)
        {
            try
            {
                if (relationshipDto == null)
                {
                    return BadRequest(new { message = "Invalid input data" });
                }

                await _relationshipService.AddRelationshipAsync(relationshipDto);
                return Ok(new { message = "Success" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while adding the relationship." });
            }
        }

        [HttpPost("Edit")]
        public async Task<ActionResult> EditRelationshipAsync([FromBody] RelationshipDto relationshipDto)
        {
            try
            {
                if (relationshipDto == null)
                {
                    return BadRequest(new { message = "Invalid input data" });
                }
                await _relationshipService.UpdateRelationshipAsync(relationshipDto);
                return Ok(new { message = "Success" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the relationship." });
            }
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteRelationshipAsync(int? id)
        {
            try
            {
                if (id == null)
                {
                    return BadRequest(new { message = "Invalid relationship ID" });
                }
                await _relationshipService.DeleteRelationshipAsync(id);
                return Ok(new { message = "Successfully deleted" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while deleting the relationship." });
            }
        }
    }
}
