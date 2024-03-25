using DataModel.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel.Services
{
    public abstract class BaseRepository<TRecord>: IBaseRepository<TRecord>
        where TRecord: BaseRecord
    {
        protected ModelDbContext DB;
        
        public abstract void UpdateRecord(TRecord source, TRecord target);

        public virtual DBActionResponse<TRecord> CreateResult()
        {
            DBActionResponse<TRecord> result = new DBActionResponse<TRecord>();
            return result;
        }
        public BaseRepository() 
        { 
            DB = new ModelDbContext();
        }
        public virtual DBActionResponse<TRecord> Get(Guid Id)
        {
            var result = CreateResult();
            TRecord record = DB.Find<TRecord>(Id);
            if (record != null)
            {
                result.Record = record;
                result.Result = DBActionResult.Success;
            }
            else
                result.Result = DBActionResult.RecordNotFound;
            return result;
        }

        public virtual DBActionResponse<TRecord> Save(TRecord record)
        {
            var result = CreateResult();
            TRecord existing = DB.Find<TRecord>( record.ID);
            if (existing != null) 
            {
                UpdateRecord(record, existing);
                DB.SaveChanges();
                result.Result = DBActionResult.Success;
            }
            else
            {
                result.Result = DBActionResult.RecordNotFound;
            }
            return result;
        }
        public virtual DBActionResponse<TRecord> Insert(TRecord record)
        {
            var result = CreateResult();
            DB.Add( record);
            DB.SaveChanges();
            result.Key = record.ID;
            result.Result = DBActionResult.Success;
            return result;
        }

        public virtual DBActionResponse<TRecord> GetAll()
        {
            var result = CreateResult();
            result.List = DB.Set<TRecord>()
                .AsNoTracking()
                .ToList();
            return result;
        }

        public virtual DBActionResponse<TRecord> Delete(Guid Id)
        {
            var result = CreateResult();
            TRecord record = DB.Find<TRecord>(Id);
            if (record != null)
            {
                DB.Set<TRecord>().Remove(record);
                DB.SaveChanges();
                result.Result = DBActionResult.Success;
            }
            else
                result.Result = DBActionResult.RecordNotFound;
            return result;
        }
    }
}
