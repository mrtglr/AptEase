using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptEase_server.Models
{
    public class BillPaymentRule
    {
        [Key]
        public int Id { get; set; }
        public decimal BillAmount { get; set; }
        public DateTime CutOffDate { get; set; }
        public DateTime ModifyDate { get; set; }
        public DateTime DueDate { get; set; }
        [NotMapped]
        public string CutOffDateToString { get { return this.CutOffDate.ToString("dd/MM/yyyy hh:mm tt"); } }
        [NotMapped]
        public string ModifyDateToString { get { return this.ModifyDate.ToString("dd/MM/yyyy hh:mm tt"); } }
        [NotMapped]
        public string DueDateToString { get { return this.DueDate.ToString("dd/MM/yyyy hh:mm tt"); } }
    }
}
