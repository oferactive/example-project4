import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserDataLoader } from "./user-data-loader";
import { InsurancePolicyDataLoader } from "./insurance-policty-data-loader";
import { DBActionResult, InsurancePolicy, User } from "../data-model/DataModel";
import { ToastaConfig, ToastaService } from "ngx-toasta";

@Injectable()
export class ControllerService
{
  
  UserLoader: UserDataLoader;
  InsurancePolicyLoader: InsurancePolicyDataLoader;

  SelectedUser: User;
  SelectedInsurancePolicy: InsurancePolicy;
  UserList = new Array<User>();
  InsurancePolicyList = new Array<InsurancePolicy>();

  
  constructor(private client: HttpClient, 
    private toast: ToastaService,
    private toastaConfig: ToastaConfig)
  {
    this.UserLoader = new UserDataLoader(client, 'User');
    this.InsurancePolicyLoader = new InsurancePolicyDataLoader(client, 'InsurancePolicy');

    this.toastaConfig.theme = 'default';
    this.toastaConfig.position = 'bottom-left';
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
    this.InsurancePolicyList.length = 0;
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

  SelectInsurancePolicy( record: InsurancePolicy)
  {
    this.SelectedInsurancePolicy = record;
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
              data.list.forEach( x => this.InsurancePolicyList.push( x));
            }
          }
        })
    }
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

            const index = this.InsurancePolicyList.indexOf( record);
            this.InsurancePolicyList.splice( index, 1);
          }
        })
    }
  }
  
}
