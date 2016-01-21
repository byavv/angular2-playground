import {Component, provide} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {CarsHomeComponent} from './carHome.component';
import {CarsSeachComponent} from './carsSearch.component';
import {CarDetailsComponent} from './carDetails.component';
import {CARS_MODULE_PROVIDERS} from './cars.module';
import {Loader} from '../http_explore/loader.component';
import {API_SERVICE_PROVIDERS} from "../../services/api.service.ts"
import {Http, ConnectionBackend, XHRBackend, BaseRequestOptions,HTTP_PROVIDERS} from 'angular2/http';

import {ExtHttp} from "../http_explore/extHttp";

@Component({
  selector: 'carseach',
  template: `
  <div>
    <div loader></div>
     <router-outlet>
     </router-outlet>
  </div>
  `,
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, CarsHomeComponent, CarsSeachComponent, Loader],
  providers:[
      HTTP_PROVIDERS, XHRBackend, BaseRequestOptions, 
      provide(Http, {useFactory: (backend, defaultOptions) => {
        return new ExtHttp(backend, defaultOptions);
      }, deps: [XHRBackend, BaseRequestOptions]}),
      CARS_MODULE_PROVIDERS, API_SERVICE_PROVIDERS //todo: rename
  ],
      styles:[`
        .cmn-t-underline {
            position: relative;
            color: #ff3296; 
            height: 5px;           
        }
        .cmn-t-underline:after {
            display: block;
            position: absolute;
            left: 0px;
            top: 0px;
            width: 0;
            height: 3px;
            background-color: #3B678E;
            content: "";            
            width: 100%;
        }       
    `],  
  
  
})
@RouteConfig([
  { path: '/', as: 'HomeSearch', component: CarsHomeComponent, useAsDefault: true },
  { path: '/seach/:manufacter/:year/:price/', as: 'SearchList', component: CarsSeachComponent },
  { path: '/details/:id', as: 'Details', component: CarDetailsComponent },
])
export class CarSearchComponent {
  constructor() { }
} 
