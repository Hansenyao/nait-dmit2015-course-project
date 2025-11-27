using CShap.RestApi.BLL.Interfaces;
using CShap.RestApi.ViewModels;
using cshap_restapi.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace CShap.RestApi.Controllers
{
    [ApiController]
    [Route("restapi/[controller]")]
    public class BillDtosController : Controller
    {
        private readonly IBillDtoService _billDtoService;

        private string UserName => User.Claims.FirstOrDefault(c => c.Type == "name")?.Value ?? "";
        private string Role => User.FindFirst(ClaimTypes.Role)?.Value ?? "";

        public BillDtosController(IBillDtoService billDtoService)
        {
            if (billDtoService == null) throw new ArgumentNullException(nameof(billDtoService));
            _billDtoService = billDtoService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            // Accounting return all items
            // ActiveStudent can only return personal items
            var result = (Role == Roles.Accounting) 
                       ? await _billDtoService.GetAllAsync()
                       : await _billDtoService.GetByNameAsync(UserName);
            if (!result.Success) 
                return NotFound(result.Message);
            return Ok(result.Data);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = Roles.ActiveStudent)]
        public async Task<IActionResult> GetById(int id)
        {
            // ActiveStudent can only return personal item
            var result = await _billDtoService.GetByIdAndNameAsync(id, UserName);
            if (!result.Success)
                return NotFound(result.Message);
            return Ok(result.Data);
        }

        [HttpPost]
        [Authorize(Roles = Roles.ActiveStudent)]
        public async Task<IActionResult> Create(BillDto dto)
        {
            // Set current user to view model
            dto.CreatedBy = UserName;

            var result = await _billDtoService.CreateAsync(dto);
            if (!result.Success)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = Roles.ActiveStudent)]
        public async Task<IActionResult> Update(int id, BillDto dto)
        {
            if (id != dto.BillID)
                return BadRequest("ID is not matching");

            // ActiveStudent can only update personal items
            if (UserName != dto.CreatedBy)
                return Forbid("No Permission");

            var result = await _billDtoService.UpdateAsync(id, dto);
            if (!result.Success)
                return BadRequest(result.Message);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.ActiveStudent)]
        public async Task<IActionResult> Delete(int id)
        {
            // ActiveStudent can only delete personal items
            var findResult = await _billDtoService.GetByIdAndNameAsync(id, UserName);
            if (!findResult.Success)
                return Forbid("No Permission");

            var deleteResult = await _billDtoService.DeleteAsync(id);
            if (!deleteResult.Success)
                return BadRequest(deleteResult.Message);
            return NoContent();
        }
    }
}
