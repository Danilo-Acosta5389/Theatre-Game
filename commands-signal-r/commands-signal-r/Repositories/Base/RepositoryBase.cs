using commands_signal_r.DataContext;
using commands_signal_r.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace commands_signal_r.Repositories.Base
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected AppDbContext AppDbContext { get; set; }
        protected DbSet<T> DbSet { get; }

        public RepositoryBase(AppDbContext dbContext)
        {
            AppDbContext = dbContext;
            DbSet = AppDbContext.Set<T>();
        }

        public IQueryable<T> GetAll()
            => DbSet.AsNoTracking();

        public IQueryable<T> GetByCondition(Expression<Func<T, bool>> expression)
            => DbSet.Where(expression).AsNoTracking();

        public void Update(T entity)
            => DbSet.Update(entity);

        public void Delete(T entity)
            => DbSet.Remove(entity);

        public Task CreateAsync(T entity)
            => DbSet.AddAsync(entity).AsTask();

        public Task SaveAsync()
            => AppDbContext.SaveChangesAsync();
    }
}
