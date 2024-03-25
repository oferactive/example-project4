using DataModel;
using DataModel.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    public abstract class DBController<TRecord, TRepository> : ControllerBase
        where TRecord: BaseRecord
        where TRepository: IBaseRepository<TRecord>
    {
        protected readonly ILogger<DBController<TRecord, TRepository>> _logger;
        protected readonly TRepository _repository;

        public DBController(
            ILogger<DBController<TRecord, TRepository>> logger, 
            TRepository repository)
        {
            _logger = logger;
            _repository = repository;
        }

        [HttpPost]
        public DBActionResponse<TRecord> List()
        {
            return _repository.GetAll();
        }

        [HttpPost]
        public ActionResult Get( Guid Id)
        {
            return null;
        }

        [HttpPost]
        public ActionResult Post( TRecord record)
        {
            return null;
        }


        [HttpPost]
        public ActionResult Put(TRecord record)
        {
            return null;
        }

        [HttpPost]
        public ActionResult Delete(Guid? key)
        {
            return null;
        }

    }
}
