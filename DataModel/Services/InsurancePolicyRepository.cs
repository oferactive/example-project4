using DataModel.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel.Services
{
    public class InsurancePolicyRepository : BaseRepository<InsurancePolicy>,
        IInsurancePolicyRepository

    {
        public override void UpdateRecord(InsurancePolicy source, InsurancePolicy target)
        {
            target.PolicyNumber = source.PolicyNumber;
            target.InsuranceAmount = source.InsuranceAmount;
            target.StartDate = source.StartDate;
            target.EndDate = source.EndDate;
            target.UserId = source.UserId;
        }

        public DBActionResponse<InsurancePolicy> GetPoliciesForUser(Guid? UserId)
        {
            var result = CreateResult();
            result.List = DB.InusrancePolicies
                .Where( x => x.UserId == UserId )
                .ToList();
            result.Result = DBActionResult.Success;
            return result;
        }
    }
}
