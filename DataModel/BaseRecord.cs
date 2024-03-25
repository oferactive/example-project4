using System;
using System.Collections.Generic;
using System.Text;

namespace DataModel
{
    public class BaseRecord
    {
        public BaseRecord()
        { 
            this.ID = Guid.NewGuid();
        }

        public Guid ID { get; set; }
    }
}
