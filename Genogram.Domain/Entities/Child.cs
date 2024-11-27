using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Domain.Entities
{
    public class Child
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Nationality { get; set; } = null!;
        public string Language { get; set; } = null!;
        public DateOnly DateOfBirth { get; set; }
        public string? ImagePath { get; set; }

        public ICollection<Relationship>? Relationships { get; set; }
    }
}
