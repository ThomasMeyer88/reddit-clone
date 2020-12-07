import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    UserLoginComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
