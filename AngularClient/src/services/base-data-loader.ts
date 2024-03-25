import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseRecord, DBActionResponse, DBActionResult } from "../data-model/DataModel";
import { Observable, Subject } from "rxjs";
import { environment } from "../environments/emvironment";

export class BaseDataLoader<TRecord extends BaseRecord>
{

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'ngsw-bypass': '1'
  });

  constructor(private client: HttpClient,
    private className: string)
  {
  }

  PrepareRecord(record: TRecord)
  {

  }

  List(): Observable<DBActionResponse<TRecord>>
  {
    return this.Send("List", null);
  }

  Get(Id: string): Observable<DBActionResponse<TRecord>>
  {
    return this.Send("Get", { id: Id});
  }

  Delete(Id: string): Observable<DBActionResponse<TRecord>>
  {
    return this.Send("Delete", { id: Id});
  }

  Post(record: TRecord): Observable<DBActionResponse<TRecord>>
  {
    const result = this.Send("Post", record);
    result.subscribe(data =>
    {
      if (data.result == DBActionResult.Success)
      {
        record.id = data.key;
      }
    })
    return result;
  }

  Put(record: TRecord): Observable<DBActionResponse<TRecord>>
  {
    const result = this.Send("Put", record);
    result.subscribe(data =>
    {
      
    })
    return result;
  }

  Send(methodName: string, data: any):
      Observable<DBActionResponse<TRecord>>
  {
    const url = environment.serverAddress + '/api/' + this.className + '/' + methodName;

    const result = new Subject<DBActionResponse<TRecord>>();

    this.client.post<DBActionResponse<TRecord>>( url, data, { headers: this.headers })
      .subscribe(
        (values: DBActionResponse<TRecord>) =>
        {
          if (values.record)
          {
            this.PrepareRecord(values.record);
          }
          if (values.list)
          {
            values.list.forEach(record => this.PrepareRecord(record));
          }

          result.next( values);
        },
        (error: any) =>
        {
          result.error(error);
        }
      );

    return result;
  }
}
