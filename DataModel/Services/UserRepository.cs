using DataModel.Model;
using DataModel.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel.Services
{
    public class UserRepository : BaseRepository<User>,
        IUserRepository
    {
        protected IInsurancePolicyRepository InsurancePolicyRepository { get; set; }
        
        public UserRepository( IInsurancePolicyRepository ipRepository) 
        { 
            this.InsurancePolicyRepository = ipRepository;
        }

        public override void UpdateRecord(User source, User target)
        {
            target.Name  = source.Name;
            target.Email = source.Email;
        }

        public override void BeforeDelete(User record)
        {
            InsurancePolicyRepository.DeleteInsurancePoliciesForUser(new KeyRequest()
            {
                Id = record.ID
            });
        }
    }
}
