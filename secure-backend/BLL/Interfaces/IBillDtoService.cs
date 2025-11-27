using CShap.RestApi.ViewModels;

namespace CShap.RestApi.BLL.Interfaces
{
    public interface IBillDtoService
    {
        Task<SResult<List<BillDto>>> GetAllAsync();
        Task<SResult<List<BillDto>>> GetByNameAsync(string name);

        Task<SResult<BillDto>> GetByIdAsync(int id);

        Task<SResult<BillDto>> GetByIdAndNameAsync(int id, string name);

        Task<SResult<BillDto>> CreateAsync(BillDto dto);

        Task<SResult> UpdateAsync(int id, BillDto dto);

        Task<SResult> DeleteAsync(int id);
    }
}
