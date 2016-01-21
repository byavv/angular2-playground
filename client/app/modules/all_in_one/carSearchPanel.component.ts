import {Component, Input, Output, EventEmitter, OnInit, AfterViewInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, ControlGroup, Control} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteParams, OnReuse, ComponentInstruction} from 'angular2/router';
import {CarItemComponent} from './carListItem.component'
import {FilterService} from './filterController.service';
import {SearchParamsController} from './searchParamsController.service';
import {PaginationControlsCmp} from '../../components/common/pagination/pagination.component';

@Component({
    selector: 'carsSearchPanel',
    template: `
    
      <form class="form-inline" [ngFormModel]="form">
            <div class="form-group">
                <label for="sort">Sort by</label>
                <select class="form-control" 
                    [(ngModel)]="sort"                 
                    ngControl="sort"  
                    name="sort" id="sort">
                    <option value="price">Price (ascending)</option>
                    <option value="-price">Price (descending)</option>
                    <option value="milage">Milage (ascending)</option>
                    <option value="-milage">Milage (descending)</option>
                    <option value="year">Year (ascending)</option>
                    <option value="-year">Year (descending)</option>
                </select>
            </div>
            <div class="form-group">
                <label for="limit">Show</label>
                <select class="form-control" 
                    [(ngModel)]="limit"                                    
                    ngControl="limit" name="limit" id="limit">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>                     
        </form>
    
    `,
    styles: [`
        
    `],
    directives: [CORE_DIRECTIVES]
})


// Root component to contain filters and finded cars list
export class CarsSearchPanelComponent implements AfterViewInit {
    private _totalPages: number;
    @Input()
    set totalPages(value) {
        this._totalPages = value;
        this.count = Math.ceil(value / this.limit);
    };
    get totalPages() {
        return this._totalPages;
    }

    @Output()
    changed: EventEmitter<any> = new EventEmitter();
    @Output()
    limitChanged: EventEmitter<any> = new EventEmitter();   

    count: number;
    limit: number;
    sort: string;
    form: ControlGroup;
    sortControl: Control;
    limitControl: Control;
    constructor(private searchController: SearchParamsController) {
        this.searchController
            .searchParamsSubject
            .subscribe((filter) => {
                this.sort = filter.sort;
                this.limit = filter.limit;
                this.sortControl = new Control(this.sort);
                this.limitControl = new Control(this.limit);
                this.form = new ControlGroup({
                    sort: this.sortControl,
                    limit: this.limitControl
                });
                this.searchController.params = {
                    sort: this.sort,
                    limit: this.limit
                }
            })
    }

    ngAfterViewInit() {
        this.form
            .valueChanges
            .subscribe((value) => {
                this.onSeachParamsChanged(value)
            });
        this.limitControl.valueChanges.subscribe((value)=>{
            this.limitChanged.next(value);
        })
    }

    onSeachParamsChanged(newValue) {
        this.searchController.params = newValue;
        this.count = Math.ceil(this.totalPages / this.limit);
        this.changed.next(this.searchController.params);
    }
}