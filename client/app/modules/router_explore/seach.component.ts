import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, RouteParams, Router} from 'angular2/router';


@Component({
    selector: 'seach',
    template: `
    <div> 
        <strong>Brand: </strong>{{query.brand}}        
        <strong>Type: </strong>{{query.type}}        
        <strong>Category: </strong>{{query.category}}
    </div>
  `,
    directives: [ROUTER_DIRECTIVES]
})
export class SeachComponent {
    query: any = {
        brand: "",
        type: "",
        category: ""
    }
    constructor(private _routeParams: RouteParams, private _router: Router) {
        this.query = _routeParams.params;
      
    }
}
