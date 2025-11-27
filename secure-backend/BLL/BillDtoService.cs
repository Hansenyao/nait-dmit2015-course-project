using CShap.RestApi.DAL;
using CShap.RestApi.Entities;
using CShap.RestApi.BLL.Interfaces;
using CShap.RestApi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace CShap.RestApi.BLL
{
    public class BillDtoService : IBillDtoService
    {
        private readonly AppDbContext _context;

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
                    .Select(b => new BillDto
                    {
                        BillID = b.billid,
                        PayeeName = b.payeename,
                        PaymentDue = b.paymentdue,
                        Paid = b.paid,
                        CreatedAt = b.createdat,
                        UpdatedAt = b.updatedat
                    })
                    .OrderBy(x => x.CreatedAt)
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

        public async Task<SResult<BillDto>> GetByIdAsync(int id)
        {
            try
            {
                var billDto = await _context.bills
                    .Where(b => b.billid == id)
                    .Select(b => new BillDto
                    {
                        BillID = b.billid,
                        PayeeName = b.payeename,
                        PaymentDue = b.paymentdue,
                        Paid = b.paid,
                        CreatedAt = b.createdat,
                        UpdatedAt = b.updatedat
                    })
                    .OrderBy(x => x.CreatedAt)
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

        public async Task<SResult<BillDto>> CreateAsync(BillDto dto)
        {
            try
            {
                var now = DateTime.UtcNow;

                var billEntity = new bill
                {
                    payeename = dto.PayeeName,
                    paymentdue = dto.PaymentDue,
                    paid = dto.Paid,
                    createdat = now,
                    updatedat = now
                };

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

                billEntity.payeename = dto.PayeeName;
                billEntity.paymentdue = dto.PaymentDue;
                billEntity.paid = dto.Paid;
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
