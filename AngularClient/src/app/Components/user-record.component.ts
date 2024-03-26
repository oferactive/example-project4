import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../../services/controller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DBActionResult, InsurancePolicy } from '../../data-model/DataModel';


@Component({
  selector: 'app-user-record',
  templateUrl: './user-record.component.html'
  // styleUrl: './app.component.css'
})
export class UserRecordComponent implements OnInit
{
  id: string;

  InsertRecord = false;

  get Selected()
  {
    return this.controller.SelectedUser;
  } 
  
  get List()
  {
    return this.controller.InsurancePolicyList;
  }


  constructor(private controller: ControllerService,
    private route: ActivatedRoute,
    private router: Router)
  { 

  }

  ngOnInit()
  {
    this.id = this.route.snapshot.paramMap.get('id');
    this.controller.SelectUser( this.id)
  }

  Delete( record: InsurancePolicy)
  {
    this.controller.DeleteInsurancePolity( record);
  }

  Edit( record: InsurancePolicy)
  {
    this.controller.SelectInsurancePolicy( record);
  }

  DeleteUser()
  {
    const result = this.controller.DeleteUser( this.Selected);
    if ( result)
    {
      result.subscribe( data =>
        {
          if ( data.result == DBActionResult.Success)
          {
              this.router.navigate([ "/" ]);
          }
        });
    
      }
  }

}
