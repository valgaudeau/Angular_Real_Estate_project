import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-userRegister',
  templateUrl: './userRegister.component.html',
  styleUrls: ['./userRegister.component.css']
})
export class UserRegisterComponent implements OnInit {

  // registrationForm: FormGroup;
  // user: any = { } // the open brackets here signal that this is just a blank JS object. We can fill it with the values we receive from our registration form in the onSubmit method
  registrationForm = new FormGroup({
    userName: new FormControl("", [Validators.required, Validators.minLength(5)]),
    email: new FormControl("", [Validators.required, Validators.email]), // we pass an array of validators
    password: new FormControl("", [Validators.required, Validators.minLength(8)])
  })
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl('Mark', Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]), // Here we use an array of validators passed in the second argument. This is how we have multiple validators with Reactive Forms
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   // confirmPassword: new FormControl(null, [Validators.required])
    // });
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
    console.log(this.registrationForm.value);
  }

}
