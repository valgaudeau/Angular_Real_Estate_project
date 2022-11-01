import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userLogin',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm){
    console.log(loginForm);
    const token = this.authService.authenticateUser(loginForm.value);
    if(token){
      localStorage.setItem('token', token['userName']);
      // console.log('Login was successful');
      alertify.set("notifier", "position", "top-center");
      alertify.success("You have successfully logged in!");
      this.router.navigate(['/']); // upon successful login, we redirect our users to the front page of the app
    } else {
      // console.log('Login was not successful');
      alertify.set("notifier", "position", "top-center");
      alertify.error("Error encountered, please make sure that you are registered or that your credentials are correct");
    }
  }

}
