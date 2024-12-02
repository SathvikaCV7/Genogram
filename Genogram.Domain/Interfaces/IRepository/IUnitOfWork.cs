using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Domain.Interfaces.IRepository
{
    public interface IUnitOfWork
    {
        IChildRepository Children { get; }
        IRelationshipRepository Relationships { get; }
        Task<int> SaveChangesAsync();
    }
}
