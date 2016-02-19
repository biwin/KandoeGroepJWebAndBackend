import {Component} from 'angular2/core';
import {NavigationBar} from './navigationBar';

@Component({
    selector: 'my-app',
    template: '<navigation-bar></navigation-bar>',
    directives: [NavigationBar]
})

export class AppComponent {

}