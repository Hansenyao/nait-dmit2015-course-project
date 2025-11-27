using CShap.RestApi.BLL.Interfaces;
using CShap.RestApi.DAL;
using CShap.RestApi.Entities;
using CShap.RestApi.ViewModels;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace CShap.RestApi.BLL
{
    public class BillDtoService : IBillDtoService
    {
        private readonly AppDbContext _context;

        #region Map Entity to View
        private static BillDto MapToView(bill entity)
        {
            return new BillDto
            {
                BillID = entity.billid,
                PayeeName = entity.payeename,
                PaymentDue = entity.paymentdue,
                Paid = entity.paid,
                CreatedBy = entity.createdby,
                CreatedAt = entity.createdat,
                UpdatedAt = entity.updatedat
            };
        }
        #endregion

        #region Map View to Entity
        private static void MapToEntity(BillDto view, ref bill entity)
        {
            entity.payeename = view.PayeeName;
            entity.paymentdue = view.PaymentDue;
            entity.paid = view.Paid;
            entity.createdby = view.CreatedBy;
        }
        #endregion

        public BillDtoService(AppDbContext context)
        {
            if (context == null) throw new ArgumentNullException("context is null");
            _context = context;
        }

        public async Task<SResult<List<BillDto>>> GetAllAsync()
        {
            try
            {
                var billDtos = await _context.bills
                    .OrderBy(b => b.createdat)
                    .Select(b => MapToView(b))
                    .ToListAsync();
                if (billDtos == null || billDtos.Count == 0)
                    return SResult<List<BillDto>>.Fail("No any bills was found");

                return SResult<List<BillDto>>.Ok(billDtos);
            }
            catch (Exception ex)
            {
                return SResult<List<BillDto>>.Fail(ex.Message);
            }
        }

        public async Task<SResult<List<BillDto>>> GetByNameAsync(string name)
        {
            try
            {
                var billDtos = await _context.bills
                    .OrderBy(b => b.createdat)
                    .Where(b => b.createdby == name)
                    .Select(b => MapToView(b))
                    .ToListAsync();
                if (billDtos == null || billDtos.Count == 0)
                    return SResult<List<BillDto>>.Fail($"No any bills was found with Name: {name}");

                return SResult<List<BillDto>>.Ok(billDtos);
            }
            catch (Exception ex)
            {
                return SResult<List<BillDto>>.Fail(ex.Message);
            }
        }

        public async Task<SResult<BillDto>> GetByIdAsync(int id)
        {
            try
            {
                var billDto = await _context.bills
                    .Where(b => b.billid == id)
                    .Select(b => MapToView(b))
                    .FirstOrDefaultAsync();
                if (billDto == null)
                    return SResult<BillDto>.Fail($"No any bill was found with ID: {id}");

                return SResult<BillDto>.Ok(billDto);
            }
            catch (Exception ex)
            {
                return SResult<BillDto>.Fail(ex.Message);
            }
        }

        public async Task<SResult<BillDto>> GetByIdAndNameAsync(int id, string name)
        {
            try
            {
                var billDto = await _context.bills
                    .Where(b => b.billid == id && b.createdby == name)
                    .Select(b => MapToView(b))
                    .FirstOrDefaultAsync();
                if (billDto == null)
                    return SResult<BillDto>.Fail($"No any bill was found with ID: {id} and Name: {name}");

                return SResult<BillDto>.Ok(billDto);
            }
            catch (Exception ex)
            {
                return SResult<BillDto>.Fail(ex.Message);
            }
        }

        public async Task<SResult<BillDto>> CreateAsync(BillDto dto)
        {
            try
            {
                bill billEntity = new bill();
                MapToEntity(dto, ref billEntity);

                var now = DateTime.UtcNow;
                billEntity.createdat = now;
                billEntity.updatedat = now;

                _context.bills.Add(billEntity);
                await _context.SaveChangesAsync();

                dto.BillID = billEntity.billid;
                dto.CreatedAt = billEntity.createdat;
                dto.UpdatedAt = billEntity.updatedat;

                return SResult<BillDto>.Ok(dto);
            }
            catch (Exception ex)
            {
                _context.ChangeTracker.Clear();
                return SResult<BillDto>.Fail(ex.Message);
            }
        }

        public async Task<SResult> UpdateAsync(int id, BillDto dto)
        {
            try
            {
                var billEntity = await _context.bills
                    .Where(b => b.billid == id)
                    .FirstOrDefaultAsync();
                if (billEntity == null)
                    return SResult.Fail($"No any bill was found with ID: {id}");

                MapToEntity(dto, ref billEntity);
                billEntity.updatedat = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                return SResult.Ok();
            }
            catch (Exception ex)
            {
                _context.ChangeTracker.Clear();
                return SResult.Fail(ex.Message);
            }
        }

        public async Task<SResult> DeleteAsync(int id)
        {
            try
            {
                var billEntity = await _context.bills
                    .Where(b => b.billid == id)
                    .FirstOrDefaultAsync();
                if (billEntity == null)
                    return SResult.Fail($"No any bill was found with ID: {id}");

                _context.Remove(billEntity);
                await _context.SaveChangesAsync();
                return SResult.Ok();
            }
            catch (Exception ex)
            {
                _context.ChangeTracker.Clear();
                return SResult.Fail(ex.Message);
            }
        }
    }
}
