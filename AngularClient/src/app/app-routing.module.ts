import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRecordComponent } from './Components/user-record.component';
import { AppComponent } from './app.component';
import { UserListComponent } from './Components/user-list.component';

const routes: Routes = [
  { 
    path: 'user/:id', 
    component: UserRecordComponent, 
  },
  {
    path: '',
    pathMatch: 'full',
    component: UserListComponent,
  },
  {
    path: 'userlist',
    component: UserListComponent, 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
