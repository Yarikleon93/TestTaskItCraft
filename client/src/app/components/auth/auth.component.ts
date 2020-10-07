import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CheckFormService } from '../../service/check-form.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login: String;
  password: String;

  constructor(
    private checkForm: CheckFormService, 
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  userLogin(){
    const user = {
      login: this.login,
      password: this.password
    }
    if (!this.checkForm.checkLogin(user.login)) {
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
    }

    this.authService.loginUser(user).pipe(catchError(response => of({user:response.error.user, success: response.error.success, message: response.error ? response.error.message : response.message, token: response.error.token}))).subscribe(data => {
      if(!data.success) {
        this.flashMessages.show(data.message, {
          cssClass: 'alert-danger',
          timeout: 2500
        });
        //this.router.navigate(['/registration']);
      } else {
        this.flashMessages.show(data.message, {
          cssClass: 'alert-success',
          timeout: 2500
        });
        this.router.navigate(['/userlist']);
        this.authService.saveToken(data.token, data.user);
      }
    })

  }

}
