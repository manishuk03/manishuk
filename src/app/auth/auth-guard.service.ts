import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Globals } from '../auth/globals';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router : Router,public authService: AuthService,public globals: Globals){}

	canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|boolean {
		let url = state.url;
		if(localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token')){
		 /*If localStorage is true then authenticating loggedin value from Fake Server*/	
		 return this.authService.isloggedin().pipe(map((auth) =>{
			if (auth.json().loggedin) {
				/*Updating isUserLoggedIn globally*/
				this.globals.isUserLoggedIn.next(true); 
                return true;
            }else{
				/*Removing localstroage Values and Redirecting User to Not Authorized Page*/	
				this.authService.setStorage(false,"403");
				this.globals.isUserLoggedIn.next(false); 
				return false;
			}
		}));
		}else{
			this.authService.setStorage(false,"403");
			return false;
		}
	}
}
