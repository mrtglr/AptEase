using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;

namespace AptEase_server.Models
{
    public class Transection
    {
        [Key]
        public int Id { get; set; }
        public int? BillId { get; set; }
        public int TransectionStatus { get; set; } // 0: pending, 1: approved, 2: rejected
        [NotMapped]
        public string TransectionStatusToString 
        { get { switch (TransectionStatus)
                {
                    case 0:
                        return "Pending";
                        break;
                    case 1:
                        return "Approved";
                        break;
                    case 2:
                        return "Rejected";
                        break;
                    default:
                        return "pending";
                        break;
                }
            } 
        }
        public DateTime TransectionDate { get; set; }
        public DateTime ModifyDate { get; set; }

        [ForeignKey("BillId")]
        public virtual Bill? Bill { get; set; }
    }
}
