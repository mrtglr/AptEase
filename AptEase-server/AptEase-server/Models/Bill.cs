using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptEase_server.Models
{
    public class Bill
    {
        [Key]
        public int Id { get; set; }
        public string BillDescription { get; set; }
        public decimal BillAmount { get; set; }
        public decimal OriginalBillAmount { get; set; }
        public bool isPaid { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime CutOffDate { get; set; }
        public DateTime? DateOfPaid { get; set; }
        public DateTime DueDate { get; set; }
        public string? ApplicationUserId { get; set; }

        [ForeignKey("ApplicationUserId")]
        public virtual ApplicationUser? ApplicationUser { get; set; }
    }

    public class BillGenericModel
    {
        public decimal BillAmount { get; set; }
        public DateTime CutOffDate { get; set; }
        public DateTime DueDate { get; set; }
    }

    public class UserDebtAnalisysModel
    {
        public string Name { get; set; }
        public decimal Value { get; set; }
    }

    public class BillAnalisysModel : UserDebtAnalisysModel
    {

    }
}
