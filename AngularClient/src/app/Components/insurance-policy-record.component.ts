import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../../services/controller.service';
import { ActivatedRoute } from '@angular/router';
import { InsurancePolicy } from '../../data-model/DataModel';


@Component({
  selector: 'app-insurance-policy',
  templateUrl: './insurance-policy-record.component.html'
  // styleUrl: './app.component.css'
})
export class InsurancePolicyComponent implements OnInit
{
  id: string;

  get Selected()
  {
    return this.controller.SelectedUser;
  } 

  
  get List()
  {
    return this.controller.InsurancePolicyList;
  }


  constructor(private controller: ControllerService,
    private route: ActivatedRoute)
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
}
