using cshap_restapi.BLL.Interfaces;
using cshap_restapi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace cshap_restapi.Controllers
{
    [ApiController]
    [Route("restapi/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest dto)
        {
            var result = await _authService.LoginAsync(dto);
            if (!result.Success)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }
    }
}
