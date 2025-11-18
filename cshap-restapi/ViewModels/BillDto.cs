using CShap.RestApi.Entities;
using System.Runtime.InteropServices;

namespace cshap_restapi.ViewModels
{
    public class BillDto
    {
        public int BillID { get; set; }
        public string PayeeName { get; set; } = string.Empty;
        public double PaymentDue {  get; set; }
        public bool Paid { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
