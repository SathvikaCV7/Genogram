using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Domain.Interfaces.IRepository
{
    public interface IRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes);
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includes);
        Task AddAsync(T entity);
        void Remove(T entity);
    }
}
