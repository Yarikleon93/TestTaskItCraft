import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Users } from '../models/users';
import { RegisterResponse } from '../models/registerResponse';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  token:any;
  user:any;

  constructor(private http: HttpClient) { }
 
  registerUser(user) {
    return this.http.post<RegisterResponse>('http://localhost:5000/api/users', user);
  }

  loginUser(user){
    return this.http.post<RegisterResponse>('http://localhost:5000/api/auth', user);
  }

  userList(){
    let headers = new HttpHeaders().append('Authorization', `Bearer ${localStorage.token}`);
    return this.http.get<Users>('http://localhost:5000/api/users',{headers: headers});
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  saveToken(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }
  isLogged() {
    return window.localStorage.getItem('token');
  }
}
