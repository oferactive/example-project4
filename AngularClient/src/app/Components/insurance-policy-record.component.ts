import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControllerService } from '../../services/controller.service';
import { ActivatedRoute } from '@angular/router';
import { DBActionResult, InsurancePolicy, User } from '../../data-model/DataModel';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-insurance-policy',
  templateUrl: './insurance-policy-record.component.html'
  // styleUrl: './app.component.css'
})
export class InsurancePolicyComponent implements OnInit
{
  id: string;
  Form: FormGroup;
  
  @Input()
  Record: InsurancePolicy;

  @Input()
  User: User;

  @Output()
  OnCancel = new EventEmitter();


  get IsNewRecord()
  {
    return this.Record == null;
  }

  get ValidForm()
  {
    return this.Form.valid;
  }

  get List()
  {
    return this.controller.InsurancePolicyList;
  }


  constructor(private controller: ControllerService)
  { 

  }

  ngOnInit(): void 
  {
    this.Form = this.controller.BuildInsurancePolicyForm( this.Record);  
  }

  Cancel()
  {
    if ( this.Record)
    {
      this.Record.IsVisible = false;
    }

    this.OnCancel.emit();
  }

  Save()
  {
    if ( !this.Form.valid)
    {
      return;
    }
    this.controller.SaveInsurancePolicy( 
      this.User,
      this.Record, 
      this.Form.value as InsurancePolicy)
      .subscribe( data =>
        {
          if ( data.result == DBActionResult.Success)
          {
            if ( this.Record)
            {
              this.Record.IsVisible = false;
            }
            else
            {
              this.OnCancel.emit();
            }
          }
        })
  }


}
