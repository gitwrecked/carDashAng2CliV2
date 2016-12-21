import { Injectable, OnInit } 			 	from '@angular/core';
import { Http, RequestOptions, Response } 	from '@angular/http';
import { headers } 							from '../common/headers';
import { Observable } 						from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionService implements OnInit {
	public sessionUser;	

	constructor(private http: Http) {
		this.sessionUser = JSON.parse(localStorage.getItem('sessionUser') || "{}");
	}

	ngOnInit():void {
		this.sessionUser = JSON.parse(localStorage.getItem('sessionUser') || "{}");
	}

	isLoggedIn():Boolean {
		return !!JSON.parse(localStorage.getItem('sessionUser') || "{}").cd_token;
	}

	getSession():any {		
		return JSON.parse(localStorage.getItem('sessionUser') || "{}");
	}

	login(data: string): Observable<any> {		 
	    return this.http.post('/api/v1/auth/login', data, { headers: headers})
	      .map((response:Response) => {
	          let res = response.json();	      
	          if(res.success) {    
	            this.sessionUser.email = res.email;
	          	this.sessionUser.cd_token = res.cd_token;  
	          	this.sessionUser.admin = res.admin;        
	            localStorage.setItem('sessionUser', JSON.stringify(this.sessionUser));            	                       
	          }
	          return res;
	        },
	        error => {          
	          console.error(error.text());
	        }
	      ); 
	};

	logout(): void {
		localStorage.removeItem('sessionUser');
		this.sessionUser = null;		
	};
}