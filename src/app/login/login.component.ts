import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from './login';
import { AuthService } from '../auth/auth.service';
import {Globals} from '../auth/globals';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	message: string;
	returnUrl: string;
	isUserLoggedIn: boolean = false;
	showLoading: boolean = false;
	
	constructor(private formBuilder: FormBuilder, private router: Router, private globals: Globals, public authService: AuthService) {}
	
	ngOnInit() {
		/*Setting localStorage values*/
		this.setLoggedIn();
		
		/*Setting Login form validations*/
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			loginpwd: ['', Validators.required]
		},{
			updateOn: 'blur'
		});
		
		this.returnUrl = '/dashboard';
	}
	
	public loginSubmit() {
		this.showLoading = true;
		let f = this.loginForm.controls;
		if (this.loginForm.invalid) {
			this.showLoading = false;
			return;
		} else {
			let user = new Login();
			user.username = f.username.value;
			user.loginpwd = f.loginpwd.value;
			this.authService.login(user)
				.subscribe(data => {
					if (data) {
						this.authService.updateToken("login")
							.subscribe(d => {
								this.router.navigate(['/dashboard']);
								setTimeout(function() {
								this.showLoading = false;
								}, 3000);
							})
					} else {
						this.message = "Please check your username and password";
						this.showLoading = false;
					}
				}, error => {
					this.message = "Something went wrong. Please try again.";
					this.showLoading = false;
				});
		}
	};
	
	public setLoggedIn() {
		if (localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token')) {
			this.isUserLoggedIn = true;
		} else {
			this.globals.isUserLoggedIn.subscribe(value => {
				this.isUserLoggedIn = value;
			});
			this.isUserLoggedIn = false;
		}
	}
}
