import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'carItem',
    template: require("./carListItem.component.html"),
    inputs: ["car"],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]    
})
export class CarItemComponent {
    constructor() { }
}