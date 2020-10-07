import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor() { }

  checkName(name) {
    if( name == undefined || name.length < 3 || name.length > 255) {
      return false;
    }
    else {
      return true;
    }
  }

  checkLogin(login) {
    if( login == undefined || login.length < 3 || login.length > 255) {
      return false;
    }
    else {
      return true;
    }
  }

  checkPassword(password) {
    if( password == undefined || password.length < 3 || password.length > 255) {
      return false;
    }
    else {
      return true;
    }
  }

  checkSecondPassword(password, second_pass) {
    if( password != second_pass) {
      return false;
    }
    else {
      return true;
    }
  }
}
