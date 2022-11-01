import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userLogin',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm){
    console.log(loginForm);
    const user = this.authService.authenticateUser(loginForm.value);
    if(user){
      console.log('Login was successful');
    } else {
      console.log('Login was not successful');
    }
  }

}
