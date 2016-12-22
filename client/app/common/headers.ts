import {Headers} from '@angular/http';

export const headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');
headers.append(
    'cd_token',
    JSON.parse(localStorage.getItem('sessionUser') || '{}').cd_token);
