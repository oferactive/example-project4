using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public enum DBActionResult
    {
        Success = 1,
        Failed = 2,
        Error = 3,
        RecordNotFound = 4,
        RecordkKeyNotProvided = 5,
        UserNotAuthorized = 10,
    }
}
