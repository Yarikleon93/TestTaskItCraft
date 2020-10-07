import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../../service/check-form.service';
import { AuthService } from '../../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  name: String;
  login: String;
  password: String;
  second_pass: String;


  constructor(
    private checkForm: CheckFormService, 
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  userRegister() {
    const user = {
      name: this.name,
      login: this.login,
      password: this.password,
      second_pass: this.second_pass
    };
    
    if(!this.checkForm.checkName(user.name)) {
      this.flashMessages.show("Введите от 3 до 255 символов имени", {
        cssClass: 'alert-danger',
        timeout: 2500
      });
      return false
    } else if (!this.checkForm.checkLogin(user.login)) {
      this.flashMessages.show("Введите от 3 до 255 символов логина", {
        cssClass: 'alert-danger',
        timeout: 2500
      });
      return false
    } else if (!this.checkForm.checkPassword(user.password)) {
      this.flashMessages.show("Введите от 3 до 255 символов пароля", {
        cssClass: 'alert-danger',
        timeout: 2500
      });
      return false
    } else if (!this.checkForm.checkSecondPassword(user.password, user.second_pass)) {
      this.flashMessages.show("Пароли не равны", {
        cssClass: 'alert-danger',
        timeout: 2500
      });
      return false
    }

    this.authService.registerUser(user).pipe(catchError(response => of({success: response.error.success, message: response.error ? response.error.message : response.message, token: response.error.token, user: response.error.user}))).subscribe(data => {
      if(!data.success) {
        this.flashMessages.show(data.message, {
          cssClass: 'alert-danger',
          timeout: 2500
        });
      } else {        
        this.router.navigate(['/userlist']);
        this.authService.saveToken(data.token, data.user);
      }
    })

  }

}
