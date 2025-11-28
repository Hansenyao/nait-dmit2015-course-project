using CShap.RestApi.BLL.Interfaces;
using cshap_restapi.ViewModels;

namespace cshap_restapi.BLL.Interfaces
{
    public interface IAuthService
    {
        Task<SResult<LoginResponse>> LoginAsync(LoginRequest dto);
        Task<SResult> LogoutAsync();
    }
}
