import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControllerService } from '../services/controller.service';
import { UserListComponent } from './Components/user-list.component';
import { UserRecordComponent } from './Components/user-record.component';
import { ToastaModule } from 'ngx-toasta';
import { InsurancePolicyComponent } from './Components/insurance-policy-record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InsurancePolicyFilterComponent } from './Components/insurance-policy-filter.component';
import { UserEditComponent } from './Components/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserRecordComponent,
    InsurancePolicyComponent,
    InsurancePolicyFilterComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastaModule.forRoot()
  ],
  providers: [
    ControllerService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
