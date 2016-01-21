import {Component, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {DynamicComponentLoader, ElementRef, OnInit} from 'angular2/core';
import * as filters from './filterItems/filters';

@Component({
    selector: 'filterWrapper',
    template: `
    <div class="filters-container">
        <div class="filter-wrapper" #filterContainer></div>        
    <div>    
    `,
    inputs: ["filterValue", "filterName"],
    outputs: ["changed"],
    directives: [CORE_DIRECTIVES]
})
export class FilterWrapperComponent implements OnInit {
    filterValue: any;
    filterName: string;
    changed: EventEmitter<any> = new EventEmitter();
    constructor(private dcl: DynamicComponentLoader, private elementRef: ElementRef) {}
    ngOnInit() {
        for (let type in filters) {
            if (filters[type].filterName === this.filterName) {
                this.dcl
                    .loadIntoLocation(filters[type], this.elementRef, 'filterContainer')
                    .then((component) => {
                        component.instance.filterValue = this.filterValue;
                        //todo experiment with params in html code
                        component.instance.changed.subscribe((value) => {                            
                            this.changed.next(value);
                        });
                    });
            }
        }
    }
}