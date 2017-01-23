import { Component } from '@angular/core';

@Component({
	selector: 'directory-app',
	template: `
		<h1>{{title}}</h1>
		<router-outlet></router-outlet>
	`,
})
export class AppComponent { name = 'Employee Directory'; }
