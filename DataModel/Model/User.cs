using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModel.Model
{
    public class User : BaseRecord
    {
        public string Name { get; set; }
        public string Email { get; set; }
        [InverseProperty( "User")]
        public ICollection<InsurancePolicy> InsurancePolicyList { get; set; }
    }
}
