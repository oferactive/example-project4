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
        public DBActionResponse<TRecord> Get(KeyRequest Id)
        {
            return _repository.Get( Id);
        }

        [HttpPost]
        public DBActionResponse<TRecord> Post( TRecord record)
        {
            return _repository.Insert( record);
        }


        [HttpPost]
        public DBActionResponse<TRecord> Put(TRecord record)
        {
            return _repository.Save(record);
        }

        [HttpPost]
        public DBActionResponse<TRecord> Delete(KeyRequest key)
        {
            return _repository.Delete( key);
        }

    }
}
