import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable()
export class IsLogged{
    constructor(private router: Router, private authService: AuthService) {}
    
    canActivate() {
        if(this.authService.isLogged()) {
            return true
        }
        this.router.navigate(['auth']);
        return false
    }
}