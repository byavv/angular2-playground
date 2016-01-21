
import {Component, OnInit, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {ROUTER_DIRECTIVES, RouteParams, Router} from 'angular2/router';
import {FilterService, FilterModel} from './filterController.service';
import {FilterWrapperComponent} from './filters/filterWrapper.component'
import * as filters from './filters/filterItems/filters';
import {ApiService} from '../../services/api.service.ts';

@Component({
    selector: 'carFilterPanel',
    template: `    
    <div class="panel panel-default">
        <div class="panel-heading" style="background-color: #fff">
            <span class="link" (click)="detailedSeach()">Detailed Seach
                <i class="glyphicon glyphicon-circle-arrow-right"></i>
            </span>
        </div>
        <div class="panel-body">
             <filterWrapper *ngFor="#filter of filters" 
                [filterValue]="filter.value" 
                [filterName]="filter.name" (changed)="onFilterValueChanged($event, filter.name)">
            </filterWrapper>
            <div class="form-group">
                <button class="btn btn-primary sch-button" (click)="showAll()">
                <i class="glyphicon glyphicon-search"></i>
                {{count}} results</button>
            </div>           
        </div>
    </div>
`,
    inputs: ["car"],
    outputs: ['changed'],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, FilterWrapperComponent],
    styles: [`
        .sch-button{
            width: 100%;
            color: #fff;
            outline: none;
            background-color: #337ab7;
            border-color: #006DCC #005CAB #00559E;;
            -webkit-box-shadow: 0 1px .5px 0 rgba(0,0,0,.25);
            box-shadow: 0 1px .5px 0 rgba(0,0,0,.25);
        }
        .link{
            color: #337ab7;
            text-decoration: underline;
            cursor: pointer;
            font-size:16px;
        }
    `]

})
/*
 * Left filter panel, Loads all filters dynamically end emits event when value of any of them is changed
 */
export class CarFilterPanelComponent {
    filters: any[] = [];
    changed: EventEmitter<any> = new EventEmitter();
    count: number;

    constructor(private filterState: FilterService, private apiService: ApiService) {
        filterState.filtersSubject.subscribe((value) => {
            this.filters = value;
        })
        filterState.filterStateSubject
            .flatMap(flterModel=> {
                return this.apiService
                    .getCarsCount(flterModel)
            })
            .subscribe((result: any) => {
                this.count = +result.count;
            })
    }

    onFilterValueChanged(newValue, filterName) {
        console.debug(`The ${filterName} filter's value changed to: `, newValue);
        this.filterState.filter = newValue;
    }
    showAll() {
        this.changed.next(this.filterState.filter);
    }
    detailedSeach() {
        console.warn("This feature has not been released yet");
    }

}
