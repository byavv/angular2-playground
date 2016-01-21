import {Component, NgZone} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Control, FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {PolymerFormComponent} from './polymerForm.component';
import {PolymerD3} from './polymerD3.component';

@Component({
    selector: 'polimer',
    template: `
    
        <div class='row'>
            <ul class="nav nav-tabs">
                <li role="presentation"><a [routerLink]="['D3']">D3 charts</a></li>
                <li role="presentation"><a [routerLink]="['Form']">Form experiments</a></li>
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
    ]
})
@RouteConfig([
    { path: '/form', as: 'Form', component: PolymerFormComponent },
    { path: '/d3', as: 'D3', useAsDefault: true, component: PolymerD3 },
])
export class PolymerExplore {}








  