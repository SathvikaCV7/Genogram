using Genogram.Domain.DTOs;

namespace Genogram.Domain.Interfaces.IServices
{
    public interface IRelationshipService
    {
        public Task SetOnlyOnePrimaryContactAsync(int childId, bool isPrimaryContact);
        public  Task AddRelationshipAsync(RelationshipDto relationshipDto);
        public Task UpdateRelationshipAsync(RelationshipDto relationshipDto);
        public Task DeleteRelationshipAsync(int? id);

    }
}
