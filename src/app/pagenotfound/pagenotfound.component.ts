import { Component, OnInit } from '@angular/core';
import {Globals} from '../auth/globals';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {
	logintype:boolean = false;
	constructor(private globals:Globals) { }

	ngOnInit() {
		if(localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token')){
		   this.logintype = true;
		}else{
			
		  this.logintype = false;
		}
	}
}
