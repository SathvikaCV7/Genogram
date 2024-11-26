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
        Task<Relationship?> GetPrimaryContactAsync(int childId);
        public  Task<Relationship?> UpdateRelationshipAsync(Relationship updatedRelationship);
    }
}
