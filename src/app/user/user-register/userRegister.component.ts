import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-userRegister',
  templateUrl: './userRegister.component.html',
  styleUrls: ['./userRegister.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  submitted = false;
  user : any = { };

  constructor(private fb: FormBuilder) { }

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
      return;
    }

    console.log(this.registrationForm.value);
    this.user = Object.assign(this.user, this.registrationForm.value);
    // localStorage.setItem('Users', JSON.stringify(this.user));
    this.addUser(this.user);
    alert("Success");
  }

  // To make TypeScript tolerate parameters without declare type, you can edit the tsconfig.json file, see https://stackoverflow.com/questions/47848778/parameter-implicitly-has-an-any-type.
  // Instead I just declared user type as any here in the parameter of this function
  addUser(user : any){
    let userList = [];
    if(localStorage.getItem('Users')){
      // we need an or condition on the code line below because localStorage.getItem('Users') can return a null, and JSON.parse function only takes a string arg.
      // See https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
      userList = JSON.parse(localStorage.getItem('Users') || '{}');
      userList = [user, ...userList];
    } else {
      userList = [user];
    }
    localStorage.setItem('Users', JSON.stringify(userList));
  }

}
