
export enum DBActionResult
{
  Success = 1,
  Failed = 2,
  Error = 3,
  RecordNotFound = 4,
  RecordkKeyNotProvided = 5,
  UserNotAuthorized = 10,
}

export class DBActionResponse<TRecord extends BaseRecord>
{
  key: string;
  result: DBActionResult;
  record: TRecord 
  list : Array<TRecord>
}

export class BaseRecord
{
  id: string
}
export class InsurancePolicy extends BaseRecord
{
  policyNumber: string;
  insuranceAmount: number;
  startDate: Date;
  endDate: Date;
  userId: string;
}

export class User extends BaseRecord
{
  name: string;
  email: string;
}
