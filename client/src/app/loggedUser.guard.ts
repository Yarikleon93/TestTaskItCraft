import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable()
export class Logged{
    constructor(private router: Router, private authService: AuthService) {}
    
    canActivate() {
        if(this.authService.isLogged()) {
            this.router.navigate(['userlist']);
            return false
        }
        return true
    }
}