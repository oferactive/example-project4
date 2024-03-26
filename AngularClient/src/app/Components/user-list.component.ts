import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../../services/controller.service';
import { User } from '../../data-model/DataModel';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
  // styleUrl: './app.component.css'
})
export class UserListComponent implements OnInit
{
  
  constructor(private controller: ControllerService)
  { }

  ngOnInit()
  {
    this.controller.LoadUserList();
  }

  get UserList()
  {
    return this.controller.UserList;
  }


  title = 'AngularClient';

  Delete( record: User)
  {
    this.controller.DeleteUser( record);
  }
}
