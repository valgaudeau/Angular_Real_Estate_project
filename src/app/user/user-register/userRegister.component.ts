import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-userRegister',
  templateUrl: './userRegister.component.html',
  styleUrls: ['./userRegister.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  submitted = false;
  user : any = { };

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: new FormControl("", [Validators.required, Validators.minLength(5)]),
      email: new FormControl("", [Validators.required, Validators.email]), // we pass an array of validators
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    })
  }

  // passwordMatchingValidator(fg: FormGroup): Validators
  // {
  //     return fg.get('password').value === fg.get('confirmPassword').value ? { notmatched: false } : { notmatched: true };
  // }

  get userName(){
    return this.registrationForm.get('user');
  }

  onSubmit(){
    // console.log(form);
    this.submitted = true;

    // if the form is invalid, we don't do anything just return
    if(this.registrationForm.invalid){
      alertify.error("Error encountered");
      return;
    }

    console.log(this.registrationForm.value);
    this.user = Object.assign(this.user, this.registrationForm.value);
    // localStorage.setItem('Users', JSON.stringify(this.user));
    this.userService.addUser(this.user);
    // alert("Success");
    alertify.success("You have successfully registered!");
    this.registrationForm.reset(); // reset form when its submitted
    this.submitted = false; // if we go into this block of code, the form submission was successful, and we can now set this boolean to false again
  }

}
