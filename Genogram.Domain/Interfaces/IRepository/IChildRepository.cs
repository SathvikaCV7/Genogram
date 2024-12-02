using Genogram.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Domain.Interfaces.IRepository
{
    public interface IChildRepository: IRepository<Child>
    {
        public Task<Child> UpdateAsync(Child child);
    }
}
