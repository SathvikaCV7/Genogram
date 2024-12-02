using Genogram.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Domain.Interfaces.IServices
{
    public interface IChildService
    {
        public Task AddChildAsync(ChildDto childDto);
    }
}
