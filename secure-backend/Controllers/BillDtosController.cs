using CShap.RestApi.BLL.Interfaces;
using CShap.RestApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CShap.RestApi.Controllers
{
    [ApiController]
    [Route("restapi/[controller]")]
    public class BillDtosController : Controller
    {
        private readonly IBillDtoService _billDtoService;

        public BillDtosController(IBillDtoService billDtoService)
        {
            if (billDtoService == null) throw new ArgumentNullException(nameof(billDtoService));
            _billDtoService = billDtoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _billDtoService.GetAllAsync();
            if (!result.Success) 
                return NotFound(result.Message);
            return Ok(result.Data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _billDtoService.GetByIdAsync(id);
            if (!result.Success)
                return NotFound(result.Message);
            return Ok(result.Data);
        }

        [HttpPost]
        public async Task<IActionResult> Create(BillDto dto)
        {
            var result = await _billDtoService.CreateAsync(dto);
            if (!result.Success)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, BillDto dto)
        {
            if (id != dto.BillID)
                return BadRequest("ID is not matching");

            var result = await _billDtoService.UpdateAsync(id, dto);
            if (!result.Success)
                return BadRequest(result.Message);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _billDtoService.DeleteAsync(id);
            if (!result.Success)
                return BadRequest(result.Message);
            return NoContent();
        }
    }
}
