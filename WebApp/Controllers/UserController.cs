using DataModel.Model;
using DataModel.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [EnableCors("ActiveInfoCORSPolicy")]
    public class UserController : DBController<User, IUserRepository>
    {
        public UserController(ILogger<UserController> logger,
            IUserRepository repository) : base( logger, repository)
        {
        }
    }
}