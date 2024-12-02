using AutoMapper;
using Genogram.Domain.DTOs;
using Genogram.Domain.Entities;
using Genogram.Domain.Interfaces.IRepository;
using Genogram.Domain.Interfaces.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genogram.Application.Services
{
    public class ChildService : IChildService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ChildService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Child?> GetChildByIdAsync(int id)
        {
            try
            {
                var child = await _unitOfWork.Children.GetByIdAsync(c => c.Id == id, c => c.Relationships);
                return child;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving the child.");
            }
        }

        public async Task<IEnumerable<Child>> GetAllChildrenAsync()
        {
            try
            {
                var children = await _unitOfWork.Children.GetAllAsync();
                return children;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving the children.");
            }
        }

        public async Task AddChildAsync(ChildDto childDto)
        {
            try
            {
                var child = _mapper.Map<Child>(childDto);
                await _unitOfWork.Children.AddAsync(child);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while creating the child.");
            }
        }

        public async Task UpdateChildAsync(ChildDto childDto)
        {
            try
            {
                var child = _mapper.Map<Child>(childDto);
                await _unitOfWork.Children.UpdateAsync(child);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the child.");
            }
        }
    }
}
