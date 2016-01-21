import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteParams, OnReuse, ComponentInstruction} from 'angular2/router';
import {CarItemComponent} from './carListItem.component'

@Component({
    selector: 'carsList',
    template: `
     <div class="row">
       <div class="col-md-12">
            <ul class="cars-list">        
                <li *ngFor="#car of cars">
                    <carItem  [car]=car></carItem>
                </li>           
            </ul>  
       </div>     
     </div>
    `,
    directives: [CORE_DIRECTIVES, CarItemComponent],
    styles: [`
        .cars-list{
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .cars-list li {
            border-bottom: 1px solid #ebebeb;
            padding:5px 0;            
        }       
    `]
})
// Root component to contain filters and finded cars list
export class CarsListComponent {
    @Input()
    cars: Array<any> = [];
    constructor() { }
}