import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, RouteParams, Router} from 'angular2/router';


@Component({
    selector: 'params',
    template: `
    <div class="col-md-4 col-md-offset-4">
     <h5 class="col-md-12 text-center">SEACH FORM</h5>
        <div class="form-group">
            <label for="brand">Brand</label> 
            <input type="text" class="form-control" id="brand" 
                        placeholder="Apple..."                     
                        [(ngModel)]="query.brand">
        </div>
        <div class="form-group">
            <label for="category">Category</label> 
            <input type="text" class="form-control" id="category" 
                        placeholder="Electronic..."                     
                        [(ngModel)]="query.category">
        </div>
        <div class="form-group">
            <label for="brand">Type</label> 
            <input type="text" class="form-control" id="type" 
                        placeholder="Mobile phones..."                     
                        [(ngModel)]="query.type">
        </div>
        <button class="btn btn default" (click)="click()">Navigate</button>           
    </div>
  `,
    directives: [ROUTER_DIRECTIVES]
})
export class QueryComponent { 
    query: any = {
        brand: "",
        category: "",
        type: ""
    }
    constructor(private _router: Router, private _routeParams: RouteParams) {
        _router.subscribe((next) => {
            console.log(next)
        });
    }
    click() {
        this._router.navigate(['Seach', {
            brand: this.query.brand,
            category: this.query.category,
            type: this.query.type,
        }])
    }
}
