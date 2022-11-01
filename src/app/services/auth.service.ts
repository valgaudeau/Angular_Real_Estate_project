import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

authenticateUser(user: any){
  let userArray = [];
  // We check if the user exists in the local storage. Remember that we are saving user registrations in the local storage at the moment
  if(localStorage.getItem('Users')) {
    userArray = JSON.parse(localStorage.getItem('Users') || '{}');
  }
  // in order for the line below to work, I had to add the following line in tsconfig file: tsconfig file "noImplicitAny": false - Otherwise I get an error
  // Also notice I'm accessing the properties with ['propertyName']. If I just write p.userName, TS gets confused. See https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type-never
  return userArray.find(p => p['userName'] == user.userName && p['password'] == user.password);
}

}
