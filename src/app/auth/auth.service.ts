import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Login} from '../login/login';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Globals} from './globals';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: Http, private router: Router, private globals: Globals) {}
	
	/*Get employee data on success load */
	public employeeData() {
		return this.http.get(environment.authUrl + "/employeedetails")
			.map((response: Response) => {
				if (response.json()
					.length > 0) {
					return response;
				} else {
					return false;
				}
			});
	};
	
	public login(users) {
		return this.http.get(environment.authUrl + "/userlogin?username=" + users.username + "&loginpwd=" + users.loginpwd)
			.map(response => {
				if (response.json().length > 0) {
					this.globals.isUserLoggedIn.next(true);
					this.setStorage(true, response.json());
					return true;
				} else {
					return false;
				}
			});
	};
	
	public logout(): void {
		this.setStorage(false, "/login");
	};
	
	/*Checking user login-in status from server*/
	public isloggedin() {
		let getId = localStorage.getItem('token')
			.split("-", 2);
		let id = (parseInt(getId[1])) ? parseInt(getId[1]) : "";
		return this.http.get(environment.authUrl + "/isloggedin/" + id).map(response => {
				return response;
		}, error => {
			console.log("Something went wrong. Please try again.");
		});
	};
	
	/*Update user login/logout status to server*/
	public updateToken(type) {
		let users = new Login();
		let getId = localStorage.getItem('token')
			.split("-", 2);
		users.id = parseInt(getId[1]);
		users.loggedin = (type == "login") ? true : false;
		let headers = new Headers({
			'Content-Type': 'application/json'
		});
		let options = new RequestOptions({
			headers: headers
		});
		let body = JSON.stringify(users);
		return this.http.put(environment.authUrl + "/isloggedin/" + users.id, body, options)
			.map((response: Response) => {});
	};
	
	/*Generate user token using Current dateTime and user ID*/
	public getToken() {
		return new Date()
			.toLocaleString()
			.replace(",", "")
			.replace(/\//g, "")
			.replace(/ /g, "")
			.replace(/:/g, "");
	};
	
	/*Set localStroage as per user login/logout status*/
	public setStorage(type, pageResp) {
		if (!type) {
			localStorage.removeItem('token');
			localStorage.removeItem('currentUser');
			(pageResp == "/login")?window.location.href=pageResp:this.router.navigate([pageResp]);
		} else {
			localStorage.setItem('token', this.getToken() + "-" + pageResp[0]["id"]);
			localStorage.setItem('currentUser', pageResp[0]["firstname"]);
		}
		localStorage.setItem('isLoggedIn', type);
	};
}
