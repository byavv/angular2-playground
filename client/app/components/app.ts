/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {Header} from './common/header/header.component'
import {HomeComponent} from "./pages/home/home.component"

/*
 * Angular Directives
 */
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {COMMON_COMPONENTS} from './common/common.components';
/** 
 * Root Component 
 */
@Component({
  selector: 'app',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, COMMON_COMPONENTS],

  template: `
  <div class='container-fluid'>
    <app-header>
    </app-header>
    <section>
      <router-outlet>
      </router-outlet>
    </section>
    </div>
  `
})
@RouteConfig(
  [
    { path: '/pg/...', as: 'Home', component: HomeComponent, useAsDefault: true }
  ]
)
export class App {
  constructor() {
  }
  ngAfterViewInit() {
  }
}
