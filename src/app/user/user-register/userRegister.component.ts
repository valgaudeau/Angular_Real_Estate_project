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
    // console.log(this.registrationForm.value);
    this.submitted = true;

    // if the form is invalid, we don't do anything just return
    if(this.registrationForm.invalid){
      return;
    }

    alert("Success");
  }

}
