import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app-routes';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonheaderComponent } from './commonheader/commonheader.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { Globals } from './auth/globals';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CommonheaderComponent,
    PagenotfoundComponent,
    UnauthorizedComponent
   
	
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpClientModule, 
    HttpModule,
	ReactiveFormsModule,
     RouterModule.forRoot(appRoutes)
  ],
  providers: [ AuthService,AuthGuardService,Globals ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
