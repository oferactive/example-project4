import { Observable } from "rxjs";
import { DBActionResponse, InsurancePolicy } from "../data-model/DataModel";
import { BaseDataLoader } from "./base-data-loader";

export class InsurancePolicyDataLoader extends BaseDataLoader<InsurancePolicy>
{
  GetInsuranePoliciesForUser(userId: string): Observable<DBActionResponse<InsurancePolicy>>
  {
    return this.Send( "GetInsuranePoliciesForUser", { id: userId});
  }

  override PrepareRecord(record: InsurancePolicy)
  {
    if (record.startDate)
    {
      record.startDate = new Date(record.startDate);
    }

    if (record.endDate)
    {
      record.endDate = new Date(record.endDate);
    }
  }
}
