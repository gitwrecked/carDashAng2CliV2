/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MockBackend } 			from '@angular/http/testing';
import { Http }           		from '@angular/http';
import { Router }         		from '@angular/router';
import { MainNavComponent } from './main-nav.component';
import { UsersService }   from '../users-service/users.service';

describe('Car Dash Nav', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [        
        MainNavComponent
      ],
      providers: [
			{
				provide: UsersService, useValue: {
					isLoggedIn: true,
      				user: { name: 'Test User'}
				}
			},
			{
				provide: Http, useValue: MockBackend
			},
			{
				provide: Router, useValue: MockBackend
			}
		]
    });
    const usersService = TestBed.get(UsersService);
	const http = TestBed.get(Http);		
	const router = TestBed.get(Router);				
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(MainNavComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.componentInstance;
    expect(compiled).toBeTruthy();
  }));
});
