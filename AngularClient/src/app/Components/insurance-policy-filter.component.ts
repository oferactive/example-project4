import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControllerService } from '../../services/controller.service';
import { ActivatedRoute } from '@angular/router';
import { DBActionResult, InsurancePolicy, User } from '../../data-model/DataModel';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-insurance-policy-filter',
  templateUrl: './insurance-policy-filter.component.html'
  // styleUrl: './app.component.css'
})
export class InsurancePolicyFilterComponent implements OnInit
{
  
  get Filter()
  {
    return this.controller.InsurancePolicyFilter;
  }

  constructor(private controller: ControllerService)
  { 

  }

  ngOnInit(): void 
  {
    
  }

  Clear()
  {
    this.Filter.Clear();
  }

}
