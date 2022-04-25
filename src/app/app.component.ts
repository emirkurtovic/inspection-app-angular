import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountApiService } from './shared/account-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WebAPI1-angular';

  constructor(private accountService:AccountApiService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  } 

  setCurrentUser(){
    this.accountService.setCurrentUser(JSON.parse(String(localStorage.getItem('user'))));
  }
}

