using Genogram.Domain.DTOs;
using Genogram.Domain.Entities;
using Genogram.Domain.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Genogram.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChildController : ControllerBase
    {
        private readonly IChildService _childService;

        public ChildController(IChildService childService)
        {
            _childService = childService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Child>> GetChildAsync(int id)
        {
            try
            {
                var child = await _childService.GetChildByIdAsync(id);
                if (child == null)
                    return NotFound(new { message = "Child not found." });
                return Ok(child); 
            }
            catch (Exception ex)
            {
               
                return StatusCode(500, new { message = "An error occurred while retrieving the child." });
            }
        }

        [HttpGet("GetAllChildren")]
        public async Task<ActionResult<IEnumerable<Child>>> GetAllChildrenAsync()
        {
            try
            {
                var children = await _childService.GetAllChildrenAsync();
                if (children == null || !children.Any())
                    return NotFound(new { message = "No children found." });

                return Ok(children); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving the children." });
            }
        }

        [HttpPost("CreateChild")]
        public async Task<ActionResult> CreateChildAsync(ChildDto childDto)
        {
            try
            {
                if (childDto == null)
                {
                    return BadRequest(new { message = "Child data is required." });
                }

                await _childService.AddChildAsync(childDto);
                return Ok(new { message = "Child created successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the child." });
            }
        }

        [HttpPost("EditChild")]
        public async Task<ActionResult> EditChildAsync(ChildDto childDto)
        {
            try
            {
                if (childDto == null || childDto.Id <= 0)
                {
                    return BadRequest(new { message = "Invalid child data." });
                }

                await _childService.UpdateChildAsync(childDto);
                return Ok(new { message = "Child updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the child." });
            }
        }
    }
}
