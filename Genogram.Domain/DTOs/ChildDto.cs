using Genogram.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Domain.DTOs
{
    public class ChildDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Nationality { get; set; } = null!;
        public string Language { get; set; } = null!;
        public string? DateOfBirth { get; set; }
        public string? Image { get; set; }

        public ICollection<Relationship>? Relationships { get; set; }
    }
}
