using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel.Repositories
{
    public class DBActionResponse<TRecord>
        where TRecord: BaseRecord
    {
        public Guid? Key { get; set; }
        public DBActionResult Result { get; set; } = DBActionResult.Failed;
        public TRecord Record { get; set; }
        public ICollection<TRecord> List { get; set; }
    }
}
