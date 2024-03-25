using DataModel;
using DataModel.Model;
using DataModel.Repositories;
using DataModel.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [EnableCors("ActiveInfoCORSPolicy")]
    public class InsurancePolicyController : DBController<InsurancePolicy, IInsurancePolicyRepository>
    {
        public InsurancePolicyController(ILogger<InsurancePolicyController> logger,
            IInsurancePolicyRepository repository) : base( logger, repository)
        {
        }

        [HttpPost]
        public DBActionResponse<InsurancePolicy> GetInsuranePoliciesForUser(KeyRequest userId)
        {
            return _repository.GetInsuranePoliciesForUser(userId);
        }
    }
}