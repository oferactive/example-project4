import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../../services/controller.service';


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
}
