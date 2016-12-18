import { TestBed, async } 		from '@angular/core/testing';
import { LoginComponent } 		from './login.component';
import { RouterTestingModule } 	from '@angular/router/testing';
import { Http }           		from '@angular/http';
import { Router }         		from '@angular/router';
import { MockBackend } 			from '@angular/http/testing';
import { UsersService }			from '../users-service/users.service';

describe( 'Car Dash Login', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				LoginComponent
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
			],
			import: [
				RouterTestingModule.withRoutes([
				{
					path: '/login',
					component: LoginComponent
				}
				])
			]
		});			
		const usersService = TestBed.get(UsersService);
		const http = TestBed.get(Http);		
		const router = TestBed.get(Router);				
	});

	it('should render title in h1 tag', async(() => {	
	    let fixture = TestBed.createComponent(LoginComponent);
	    fixture.detectChanges();
	    let compiled = fixture.debugElement.nativeElement;
	    expect(compiled.querySelector('h1').textContent).toBe('Login');
	}));
});