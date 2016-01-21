import {Component, View} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Routes} from '../../../config/routes.config';


@Component({
  selector: 'app-header'
})
@View({
  template: require('./header.component.html'),
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  styles: [`
  .headerButton{
    font-size: 1.1em;
  }
  `]
})
export class Header {
  routes = Routes;
  isAuthenticated: boolean = false;
  constructor(private router: Router) {

  }

}