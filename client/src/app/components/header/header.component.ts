import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  get isLogged(): boolean {
    return !!this.authService.isLogged();
}
  constructor(public authService: AuthService, private router: Router) {
   }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }


}
