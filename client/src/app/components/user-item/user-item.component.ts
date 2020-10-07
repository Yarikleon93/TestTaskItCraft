import { Component, OnInit, Input } from '@angular/core';
import { UsersList } from '../../models/userList';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() item:UsersList;
  constructor() { }

  ngOnInit(): void {
  }

}