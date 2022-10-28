import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-userRegister',
  templateUrl: './userRegister.component.html',
  styleUrls: ['./userRegister.component.css']
})
export class UserRegisterComponent implements OnInit {

  // registrationForm!: FormGroup;
  constructor() { }

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

  onSubmit(){
    // console.log(this.registrationForm);
  }

}
