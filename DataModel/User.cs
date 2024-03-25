using System;
using System.Collections.Generic;
using System.Text;

namespace DataModel
{
    public class User: BaseRecord
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
