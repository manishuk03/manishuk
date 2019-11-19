import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AuthGuardService} from '../auth/auth-guard.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Globals} from '../auth/globals';

@Component({
	selector: 'app-commonheader'
	, templateUrl: './commonheader.component.html'
	, styleUrls: ['./commonheader.component.css']
})

export class CommonheaderComponent implements OnInit {
	isUserLoggedIn: boolean;
	username: string;
	
	constructor(private router: Router, public authService: AuthService, public globals: Globals) {}
	
	ngOnInit() {
		/*Setting "isUserLoggedIn" value globally*/
		this.globals.isUserLoggedIn.subscribe(value => {
			this.isUserLoggedIn = value;
			this.username = this.glocalVal('currentUser');
		});
		
		if (this.glocalVal('isLoggedIn') == "true" && this.glocalVal('token')) {
			this.isUserLoggedIn = true;
			this.username = this.glocalVal('currentUser');
		} else {
			this.isUserLoggedIn = false;
		}
	};
	
	public logout() {
		/*Updating logged-in value to server*/
		this.authService.updateToken("logout")
			.subscribe(d => {
				/*After update and response, initiating logout*/
				this.authService.logout();
			})
		this.isUserLoggedIn = false;
	};
	
	public glocalVal(val) {
		return localStorage.getItem(val);
	}
}
