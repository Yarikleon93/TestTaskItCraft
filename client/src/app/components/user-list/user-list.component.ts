import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Users } from '../../models/users';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:Users;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.authService.userList().subscribe(data => this.users = data);
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
}
