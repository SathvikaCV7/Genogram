using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Domain.DTOs
{
    public class RelationshipDto
    {
        public int? Id { get; set; }
        public int ChildId { get; set; }
        public string FirstName { get; set; } = null!;
        public string? LastName { get; set; }
        public string RelationshipType { get; set; } = null!;
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public bool IsPrimaryContact { get; set; }
        public string? Remarks { get; set; }
    }
}
