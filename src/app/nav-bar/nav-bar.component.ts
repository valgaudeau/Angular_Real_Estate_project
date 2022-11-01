import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loggedIn(){
    // retrieve the token that gets stored on login (see UserLogin component)
    return localStorage.getItem('token');
  }

  onLogout(){
    // Delete the token stored on login
    localStorage.removeItem('token');
  }

}
