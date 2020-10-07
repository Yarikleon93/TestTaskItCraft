import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthComponent } from './components/auth/auth.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CheckFormService } from './service/check-form.service';
import { AuthService } from './service/auth.service'
import { FlashMessagesModule } from 'angular2-flash-messages';
import { IsLogged } from './isLogged.guard';
import { Logged } from './loggedUser.guard';
import { UserItemComponent } from './components/user-item/user-item.component';

const appRout: Routes = [
  {path: '', component: HomeComponent},
  {path: 'registration', component: RegistrationComponent, canActivate:[Logged]},
  {path: 'auth', component: AuthComponent, canActivate:[Logged]},
  {path: 'userlist', component: UserListComponent, canActivate:[IsLogged]}
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    AuthComponent,
    UserListComponent,
    HeaderComponent,
    HomeComponent,
    UserItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRout),
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule
  ],
  providers: [CheckFormService, AuthService, IsLogged, Logged],
  bootstrap: [AppComponent]
})
export class AppModule { }
