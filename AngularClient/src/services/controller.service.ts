import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserDataLoader } from "./user-data-loader";
import { InsurancePolicyDataLoader } from "./insurance-policty-data-loader";
import { DBActionResponse, DBActionResult, InsurancePolicy, InsurancePolicyFilter, User } from "../data-model/DataModel";
import { ToastaConfig, ToastaService } from "ngx-toasta";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Injectable()
export class ControllerService
{
  
  UserLoader: UserDataLoader;
  InsurancePolicyLoader: InsurancePolicyDataLoader;

  SelectedUser: User;
  SelectedInsurancePolicy: InsurancePolicy;
  UserList = new Array<User>();
  InsurancePolicyList = new Array<InsurancePolicy>();
  AllInsurancePolicyList = new Array<InsurancePolicy>();

  InsurancePolicyFilter = new InsurancePolicyFilter();

  constructor(private client: HttpClient, 
    private toast: ToastaService,
    private toastaConfig: ToastaConfig,
    private builder: FormBuilder)
  {
    this.UserLoader = new UserDataLoader(client, 'User');
    this.InsurancePolicyLoader = new InsurancePolicyDataLoader(client, 'InsurancePolicy');

    this.toastaConfig.theme = 'default';
    this.toastaConfig.position = 'bottom-center';

    this.InsurancePolicyFilter.OnChange.subscribe( () => this.FilterInsurancePolicyList());
  }

  LoadUserList()
  {
    const result = this.UserLoader.List();
    result.subscribe(data =>
      {
        if (data.result == DBActionResult.Success)
        {
          this.UserList.length = 0;
          data.list.forEach(record => this.UserList.push(record));
        }
      });
    return result;
  }

  SelectUser(id: string) 
  {
    this.AllInsurancePolicyList.length = 0;
    if ( this.UserList.length == 0)
    {
      this.LoadUserList()
        .subscribe( data =>
          {
            this.DoSelectUser( id);
          })
    }
    else
    {
      this.DoSelectUser( id);
    }
  }

  DoSelectUser(id: string) 
  {
    this.SelectedUser = this.UserList.find( x => x.id == id);
    if ( this.SelectedUser)
    {
      this.InsurancePolicyLoader.GetInsuranePoliciesForUser( id)
      .subscribe( data =>
        {
          if ( data.result == DBActionResult.Success)
          {
            if ( data.list)
            {
              data.list.forEach( x => this.AllInsurancePolicyList.push( x));
            }

            this.FilterInsurancePolicyList();
          }
        })
    }
  }

  DeleteUser(record: User) : Observable<DBActionResponse<User>>
  {
    const confirmed = confirm( "Should User " + record.name + " Be Deleted?");
    if ( confirmed)
    {
      const result = this.UserLoader.Delete( record.id);
      result.subscribe( data => 
        {
          if ( data.result == DBActionResult.Success)
          {
            this.toast.info( "User " + record.name + " Was Deleted");

            const index = this.UserList.indexOf( record);
            this.UserList.splice( index, 1);
          }
        });
      return result;
    }
    return null;
  }
  

  DeleteInsurancePolity(record: InsurancePolicy) 
  {
    const confirmed = confirm( "Should Insurance Policty " + record.policyNumber + " Be Deleted?");
    if ( confirmed)
    {
      this.InsurancePolicyLoader.Delete( record.id)
      .subscribe( data => 
        {
          if ( data.result == DBActionResult.Success)
          {
            this.toast.info( "Insurance Policty " + record.policyNumber + " Was Deleted");

            const index = this.AllInsurancePolicyList.indexOf( record);
            this.AllInsurancePolicyList.splice( index, 1);
            this.FilterInsurancePolicyList();
          }
        })
    }
  }

  SelectInsurancePolicy( record: InsurancePolicy)
  {
    this.SelectedInsurancePolicy = record;
  }

  BuildInsurancePolicyForm( record: InsurancePolicy): FormGroup
  {
    const result = this.builder.group({
      "policyNumber": [ '', Validators.required],
      "insuranceAmount": [ 0, Validators.required],
      "startDate": [ '', Validators.required],
      "endDate": [ '', Validators.required]
    });
    if ( record)
    {
      result.get( "policyNumber").setValue( record.policyNumber);
      result.get( "insuranceAmount").setValue( record.insuranceAmount);
      result.get( "startDate").setValue( this.formatDate( record.startDate));
      result.get( "endDate").setValue( this.formatDate( record.endDate));
    }
    else
    {
      const now = new Date();
      const startDate = new Date( now.getFullYear(), now.getMonth(), 1);
      const endDate = new Date( startDate);
      endDate.setFullYear( endDate.getFullYear() + 1);
      result.get( "startDate").setValue( this.formatDate( startDate));
      result.get( "endDate").setValue( this.formatDate( endDate));
    }
    return result;
  }

  BuildUserForm( record: User): FormGroup
  {
    const result = this.builder.group({
      "name": [ '', Validators.required],
      "email": [ '', Validators.required]
    });
    if ( record)
    {
      result.get( "name").setValue( record.name);
      result.get( "email").setValue( record.email);
    }
    return result;
  }

  private formatDate(date: Date) 
  {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  SaveUser(record: User, value: User)  : 
      Observable<DBActionResponse<User>>
  {
    const saved = new User();
    saved.name = value.name;
    saved.email = value.email;
    if ( record)
    {
      saved.id = record.id;
      const result = this.UserLoader.Put( saved);
      result.subscribe( result =>
        {
          if ( result.result == DBActionResult.Success)
          {
            record.name = saved.name;
            record.email = saved.email;

            record.IsVisible = false;

            this.FilterInsurancePolicyList();

            this.toast.info( "User  " + saved.name + " Saved");
          }
        });
      return result;
    }
    else
    {
      const result = this.UserLoader.Post( saved);
      result.subscribe( result =>
        {
          if ( result.result == DBActionResult.Success)
          {
            const inserted = result.record;
            this.UserList.push( inserted);

            this.toast.info( "User " + inserted.name + " Created");
          }
        });
      return result;
    }
  }
  

  SaveInsurancePolicy( user:User, record: InsurancePolicy, value: InsurancePolicy) : 
      Observable<DBActionResponse<InsurancePolicy>>
  {
    const saved = new InsurancePolicy();
    saved.policyNumber = value.policyNumber + '';
    saved.insuranceAmount = value.insuranceAmount;
    saved.startDate = new Date( value.startDate);
    saved.endDate = new Date( value.endDate);
    saved.userId = user.id;

    if ( record)
    {
      saved.id = record.id;
      const result = this.InsurancePolicyLoader.Put( saved);
      result.subscribe( result =>
        {
          if ( result.result == DBActionResult.Success)
          {
            record.policyNumber = saved.policyNumber;
            record.insuranceAmount = saved.insuranceAmount;
            record.startDate = saved.startDate;
            record.endDate = saved.endDate;

            record.IsVisible = false;

            this.FilterInsurancePolicyList();

            this.toast.info( "Insurance Policy " + saved.policyNumber + " Saved");
          }
        });
      return result;
    }
    else
    {
      const result = this.InsurancePolicyLoader.Post( saved);
      result.subscribe( result =>
        {
          if ( result.result == DBActionResult.Success)
          {
            const inserted = result.record;
            this.AllInsurancePolicyList.push( inserted);

            this.FilterInsurancePolicyList();

            this.toast.info( "Insurance Policy " + inserted.policyNumber + " Created");
          }
        });
      return result;
    }
  }

  FilterInsurancePolicyList()
  {
    this.InsurancePolicyList.length = 0;

    let fromDate: Date = null;
    let toDate: Date = null;
    if ( this.InsurancePolicyFilter.StartDateFrom)
    {
      fromDate = new Date( this.InsurancePolicyFilter.StartDateFrom)
    }
    if ( this.InsurancePolicyFilter.StartDateTo)
    {
      toDate = new Date( this.InsurancePolicyFilter.StartDateTo)
    }


    if ( !this.InsurancePolicyFilter.StartDateFrom &&
      !this.InsurancePolicyFilter.StartDateTo)
    {
      this.AllInsurancePolicyList.forEach( x => 
        this.InsurancePolicyList.push( x));
    }
    else
    {
      this.AllInsurancePolicyList.forEach( record => 
      {
        if ( fromDate)
        {
          if ( record.startDate.valueOf() < fromDate.valueOf())
          {
            return;
          }
        }

        if ( toDate)
        {
          if ( record.startDate.valueOf() > toDate.valueOf())
          {
            return;
          }
        }

        this.InsurancePolicyList.push( record);
      });
    }
  }
  
}
