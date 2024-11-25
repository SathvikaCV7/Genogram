using Genogram.Domain.Entities;
using Genogram.Domain.Interfaces.IRepository;
using Genogram.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Genogram.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChildController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ChildController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Child>> GetChild(int id)
        {
            var child = await _unitOfWork.Children.GetByIdAsync(c => c.Id == id, c => c.Relationships);

            if (child == null)
                return NotFound();

            return child;
        }


        [HttpPost("CreateChild")]
        public async Task<ActionResult> CreateChild(Child child)
        {
            await _unitOfWork.Children.AddAsync(child);
            await _unitOfWork.SaveChangesAsync();

            return Ok(child);
        }

        //[HttpPost("AddRelationship")]
        //public async Task<ActionResult> AddRelationship(Relationship relationship)
        //{
        //    var existingPrimaryContact = _context.Relationships
        //        .Where(r => r.ChildId == relationship.ChildId && r.IsPrimaryContact)
        //        .FirstOrDefault();

        //    if (relationship.IsPrimaryContact && existingPrimaryContact != null)
        //    {
        //        return BadRequest("There can only be one primary contact.");
        //    }

        //    _context.Relationships.Add(relationship);
        //    await _context.SaveChangesAsync();

        //    return Ok(relationship);
        //}

    }
}
