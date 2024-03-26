import { EventEmitter } from "@angular/core";

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
  IsVisible: boolean;
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

export class InsurancePolicyFilter
{
  
  private _StartDateFrom: Date;
  private _StartDateTo: Date;

  OnChange = new EventEmitter();
  
  public get StartDateFrom(): Date 
  {
    return this._StartDateFrom;
  }
  public set StartDateFrom(value: Date) 
  {
    this._StartDateFrom = value;
    this.OnChange.emit();
  }
  
  public get StartDateTo(): Date 
  {
    return this._StartDateTo;
  }
  public set StartDateTo(value: Date) 
  {
    this._StartDateTo = value;
    this.OnChange.emit();
  }

  Clear() 
  {
    this._StartDateFrom = null;
    this._StartDateTo = null;
    this.OnChange.emit();
  }
  
}
