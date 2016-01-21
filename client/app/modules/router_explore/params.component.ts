import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, RouteParams, Router} from 'angular2/router';

import {SeachComponent} from './seach.component';
import {QueryComponent} from './query.component';

@Component({
    selector: 'params',
    template: `
    <div>      
    {{action}}
         <router-outlet>
         </router-outlet>
    </div>
  `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/seach/:brand', as: 'Seach', component: SeachComponent },
  //  { path: '/**', redirectTo: ['Query'] },
    { path: '/query/', as: 'Query', component: QueryComponent, useAsDefault: true },
])
export class ParamsComponent {

    constructor(private _router: Router, private _routeParams: RouteParams) {
        _router.subscribe((next) => {

        })
    }
}





  