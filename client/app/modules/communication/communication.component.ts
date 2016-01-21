import {Component, NgZone} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Control, FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {ServiceComComponent, SimpleCommunicationService} from './serviceCom.component';
import {QueryComComponent} from './queryCom.component';
import {SubjectsComponent, CommunicationService} from './subjectsCom.component';

@Component({
    selector: 'communication',
    template: `
    
        <div class='row'>
            <ul class="nav nav-tabs">
                <li><a [routerLink]="['Quer']">Query in view</a></li>
                <li><a [routerLink]="['Comp']">Simple service</a></li>
                <li><a [routerLink]="['Subj']">Rx to the rescue</a></li>                
            </ul>
        </div>
        <div class='row'>
            <router-outlet>
            </router-outlet>
        </div>
   
    `,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES],
    styles: [
        `.router-link-active { background:cornsilk !important; }`
    ],
    providers: [SimpleCommunicationService, CommunicationService]
})
@RouteConfig([
    { path: '/comp', as: 'Comp', component: ServiceComComponent},
    { path: '/subj', as: 'Subj',  component: SubjectsComponent },
    { path: '/quer', as: 'Quer',  component: QueryComComponent, useAsDefault: true },
])
export class CommunicationExplore {}








  