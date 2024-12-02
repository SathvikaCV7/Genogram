using Genogram.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Domain.Interfaces.IRepository
{
    public interface IRelationshipRepository: IRepository<Relationship>
    {
        public  Task<Relationship?> UpdateAsync(Relationship updatedRelationship);

        public Task<List<Relationship>> GetByChildIdAsync(int childId);

        public Task UpdateRangeAsync(IEnumerable<Relationship> relationships);
    }
}
