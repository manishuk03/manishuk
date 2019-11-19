import { Component, OnInit } from '@angular/core';
import {AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: string;
  employeeList: any[];
  constructor(public authService: AuthService) { }

  ngOnInit() {
	  this.authService.employeeData()
	.subscribe(data => { 
		if(data){
			this.employeeList = data.json();
			
			
		}else{
		this.message = "No Record Found";	
		}
		},
      error => {
      
        this.message = "Sorry.";
		
      });
	  
  }

}
