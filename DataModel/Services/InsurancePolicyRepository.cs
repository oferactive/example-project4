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

        public override void BeforeCreate(InsurancePolicy record)
        {
            if ( record.PolicyNumber == null)
            {
                string topPolicyNumber = DB.InusrancePolicies
                    .OrderByDescending( x => x.PolicyNumber)
                    .Select( x => x.PolicyNumber )
                    .FirstOrDefault();
                if ( string.IsNullOrEmpty( topPolicyNumber))
                {
                    record.PolicyNumber = "1";
                }
                else
                {
                    int topPolicyNumberValue = Int32.Parse( topPolicyNumber );
                    record.PolicyNumber = (topPolicyNumberValue + 1).ToString();
                }
            }
        }

        public DBActionResponse<InsurancePolicy> GetInsuranePoliciesForUser(KeyRequest userId)
        {
            var result = CreateResult();
            if (userId == null || !userId.Id.HasValue)
            {
                result.Result = DBActionResult.RecordkKeyNotProvided;
                return result;
            }
            result.List = DB.InusrancePolicies
                .Where( x => x.UserId == userId.Id)
                .ToList();
            result.Result = DBActionResult.Success;
            return result;
        }
    }
}
