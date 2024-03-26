using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel.Repositories
{
    public interface IInsurancePolicyRepository: IBaseRepository<InsurancePolicy>
    {
        DBActionResponse<InsurancePolicy> GetInsuranePoliciesForUser(KeyRequest userId);
        DBActionResponse<InsurancePolicy> DeleteInsurancePoliciesForUser(KeyRequest userId);

    }
}
