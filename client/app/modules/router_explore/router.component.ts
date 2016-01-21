import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {HooksComponent} from './hooks.component';

@Component({
    selector: 'router',
    template: `    
        <div class='row'>
            <ul class="nav nav-tabs">
                <li><a [routerLink]="['Hooks']">Router hooks</a></li>                                      
            </ul>
        </div>
        <div class='row'>
            <router-outlet>
            </router-outlet>
        </div>   
    `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
    styles: [
        `.router-link-active { background:cornsilk !important; }`
    ]
})
// todo: explore otherwise : #2965
// https://github.com/angular/angular/issues/2965
@RouteConfig([
    { path: '/hooks/', as: 'Hooks', component: HooksComponent, useAsDefault: true },    
])
export class RouterExplore { }








  