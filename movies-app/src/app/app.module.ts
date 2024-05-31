import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { SignupComponent } from './Components/Authentication/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { NumericInputDirective } from './shared/directives/numeric-input.directive';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    LoginComponent,
    SignupComponent,
    NumericInputDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000, positionClass: 'toast-top-left', progressBar: true, progressAnimation: 'increasing'

    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
