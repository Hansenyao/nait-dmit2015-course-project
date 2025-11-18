using CShap.RestApi.DAL;
using cshap_restapi.BLL.Interfaces;
using cshap_restapi.ViewModels;

namespace cshap_restapi.BLL
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
            return SResult<List<BillDto>>.Fail("No implement");
        }

        public async Task<SResult<BillDto>> GetByIdAsync(int id)
        {
            return SResult<BillDto>.Fail("No implement");
        }

        public async Task<SResult<BillDto>> CreateAsync(BillDto dto)
        {
            return SResult<BillDto>.Fail("No implement");
        }

        public async Task<SResult> UpdateAsync(int id, BillDto dto)
        {
            return SResult.Fail("No implement");
        }

        public async Task<SResult> DeleteAsync(int id)
        {
            return SResult.Fail("No implement");
        }
    }
}
