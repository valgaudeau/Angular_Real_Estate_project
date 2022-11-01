import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor() { }

  // To make TypeScript tolerate parameters without declare type, you can edit the tsconfig.json file, see https://stackoverflow.com/questions/47848778/parameter-implicitly-has-an-any-type.
  // Instead I just declared user type as any here in the parameter of this function
  addUser(user : any){
    let userList: Array<any> = [];
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
