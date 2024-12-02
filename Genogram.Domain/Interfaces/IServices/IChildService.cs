using Genogram.Domain.DTOs;
using Genogram.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Domain.Interfaces.IServices
{
    public interface IChildService
    {
        public Task<Child?> GetChildByIdAsync(int id);
        public Task<IEnumerable<Child>> GetAllChildrenAsync();
        public Task AddChildAsync(ChildDto childDto);
        public Task UpdateChildAsync(ChildDto childDto);
    }
}
