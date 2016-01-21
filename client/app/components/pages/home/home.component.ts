import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {RxExploreComponent} from '../../../modules/rx_explore/components/rxExplore.component';
import {PolymerExplore} from '../../../modules/polymer/components/polymer.component';
import {CarSearchComponent} from '../../../modules/all_in_one/cars.component';

import {CommunicationExplore} from '../../../modules/communication/communication.component';
import {FormsExplore} from '../../../modules/forms_explore/forms.component';
import {HttpExplore} from '../../../modules/http_explore/http.component';
import {RouterExplore} from '../../../modules/router_explore/router.component';
@Component({
    selector: 'home',
    template: require("./home.component.html"),
    directives: [ROUTER_DIRECTIVES],
    styles: [
        `.router-link-active { background:cornsilk !important; }`
    ]
})
@RouteConfig([
    { path: '/rxexplore', as: 'Rx', component: RxExploreComponent },
    { path: '/polymer/...', as: 'Polymer', component: PolymerExplore },
    { path: '/communication/...', as: 'Communication', component: CommunicationExplore },
    { path: '/forms', as: 'Forms', useAsDefault: true, component: FormsExplore },
    { path: '/http', as: 'Http', component: HttpExplore },
    { path: '/router/...', as: 'Router', component: RouterExplore },

    { path: '/all/...', as: 'All', component: CarSearchComponent },
])
export class HomeComponent {
    constructor() { }

}