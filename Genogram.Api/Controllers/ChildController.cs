using Genogram.Domain.DTOs;
using Genogram.Domain.Entities;
using Genogram.Domain.Interfaces.IRepository;
using Genogram.Domain.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Genogram.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChildController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IChildService _childService;

        public ChildController(IUnitOfWork unitOfWork,IChildService childService)
        {
            _unitOfWork = unitOfWork;
            _childService = childService;

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Child>> GetChild(int id)
        {
            var child = await _unitOfWork.Children.GetByIdAsync(c => c.Id == id, c => c.Relationships);
            if (child == null)
                return NotFound();
            return child;
        }

        [HttpGet("GetAllChildren")]
        public async Task<ActionResult<IEnumerable<Child>>> GetAllChildren()
        {
            var children = await _unitOfWork.Children.GetAllAsync(); 
            if (children == null || !children.Any())
                return NotFound(new { message = "No children found." });

            return Ok(children); 
        }

        [HttpPost("CreateChild")]
        public async Task<ActionResult> CreateChild(ChildDto childDto)
        {
            await _childService.AddChildAsync(childDto);
            return Ok(new { message="Child Created Successfully" });
        }

        [HttpPost("EditChild")]
        public async Task<ActionResult> EditChild(Child child)
        {
            await _unitOfWork.Children.UpdateAsync(child);
            await _unitOfWork.SaveChangesAsync();
            return Ok(new { message="Child Updated Successfully"});
        }

    }
}
