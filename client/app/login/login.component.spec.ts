import {async, TestBed} from '@angular/core/testing';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {UsersService} from '../users-service/users.service';

import {LoginComponent} from './login.component';

describe('Car Dash Login', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {
          provide: UsersService,
          useValue: {isLoggedIn: true, user: {name: 'Test User'}}
        },
        {provide: Http, useValue: MockBackend},
        {provide: Router, useValue: MockBackend}
      ],
      import: [RouterTestingModule.withRoutes(
          [{path: '/login', component: LoginComponent}])]
    });
  });

  it('should render title in h1 tag', async(() => {
       let fixture = TestBed.createComponent(LoginComponent);
       fixture.detectChanges();
       let compiled = fixture.debugElement.nativeElement;
       expect(compiled.querySelector('h1').textContent).toBe('Login');
     }));
});
