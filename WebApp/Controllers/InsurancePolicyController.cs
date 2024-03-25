using DataModel;
using DataModel.Model;
using DataModel.Repositories;
using DataModel.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class InsurancePolicyController : DBController<InsurancePolicy, IInsurancePolicyRepository>
    {
        public InsurancePolicyController(ILogger<InsurancePolicyController> logger,
            IInsurancePolicyRepository repository) : base( logger, repository)
        {
        }
    }
}