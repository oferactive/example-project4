using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel.Repositories
{
    public interface IBaseRepository<TRecord>
        where TRecord: BaseRecord
    {
        DBActionResponse<TRecord> Get(KeyRequest Id);
        DBActionResponse<TRecord> Save(TRecord record);
        DBActionResponse<TRecord> Insert(TRecord record);
        DBActionResponse<TRecord> GetAll();
        DBActionResponse<TRecord> Delete(KeyRequest Id);

    }
}
