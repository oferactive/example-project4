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

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserRecordComponent,
    InsurancePolicyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ToastaModule
  ],
  providers: [
    ControllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
