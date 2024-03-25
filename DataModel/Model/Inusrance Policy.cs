using System;
using System.Collections.Generic;
using System.Text;
using DataModel.Model;

namespace DataModel
{
    public class InsurancePolicy: BaseRecord
    {
        public string PolicyNumber { get; set; }
        public double? InsuranceAmount{ get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public Guid? UserId { get; set; }
        
        public User User { get; set; }
    }
}

