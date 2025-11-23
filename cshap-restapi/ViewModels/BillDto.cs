using CShap.RestApi.Entities;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace CShap.RestApi.ViewModels
{
    public class BillDto
    {
        public int BillID { get; set; }
        [Required(ErrorMessage = "PayeeName is required")]
        [MinLength(1, ErrorMessage = "PayeeName cannot be empty")]
        public string PayeeName { get; set; } = default!;
        [Range(0.01, double.MaxValue, ErrorMessage = "PaymentDue must be greater than 0")]
        public double PaymentDue {  get; set; } = default!;
        public bool Paid { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
