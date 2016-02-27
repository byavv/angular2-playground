/**
 * App Dependencies
 */
require('jquery');
require('bootstrap');

import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';


/**
 * Angular Modules
 */
import {FORM_PROVIDERS} from 'angular2/common';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';

/**
 * Global styles
 */

require('font-awesome');
require('../assets/index.less');
require('../assets/animate.css');

require('d3');  

/**
 * App Services
 * our collection of injectables services
 */
import {APP_SERVICES_BINDINGS} from './services/services';
 
/**
 * App Root Component 
 */
import {App} from './components/app';

/**
 * Angular and app custom providers
 */
const PROVIDERS = [
    HTTP_PROVIDERS,
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,

    provide(APP_BASE_HREF, { useValue: '/' }),
    APP_SERVICES_BINDINGS
];
 
/**
 * Bootstrap Angular app
 */

// start angular after all polymer html imports are resolved and elements are registered
window.addEventListener('WebComponentsReady', (e) => {
    bootstrap(
        App,
        PROVIDERS
    ).then((app) => {
        // do smth with app
        // app.injector.get...
        // app.instance.someValue...
    }, error => console.log(error))
})