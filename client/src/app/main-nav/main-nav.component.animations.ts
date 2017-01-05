import {animate, state, style, transition, trigger} from '@angular/core';

export const MainNavComponentAnimations: any = [
	trigger('navState', [
	  state('loading', style({transform: 'translateY(-100%)'})),
	  state('loaded', style({transform: 'translateY(0)'})),
	  transition('loading <=> loaded', animate('1s ease-in-out'))
	]),
	trigger('brandState', [
	  state('loading', style({transform: 'translateX(1.5em)', opacity:0})),
	  state('loaded', style({transform: 'translateX(0)', opacity:1})),
	  transition('loading <=> loaded', animate('.5s ease-in-out'))
	])
];
