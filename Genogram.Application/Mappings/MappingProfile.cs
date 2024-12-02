using AutoMapper;
using Genogram.Domain.DTOs;
using Genogram.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Application.Mappings
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<RelationshipDto, Relationship>();
            CreateMap<ChildDto, Child>();
        }
    }
}
