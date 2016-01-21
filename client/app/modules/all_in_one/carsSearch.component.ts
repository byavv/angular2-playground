import {Component, EventEmitter, AfterViewInit, ViewQuery, QueryList, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {ApiService} from '../../services/api.service.ts';
import {ROUTER_DIRECTIVES, RouteParams, Router, OnReuse, ComponentInstruction} from 'angular2/router';
import * as filters from './filters/filterItems/filters';

import {CarFilterPanelComponent} from './carFilterPanel.component'
import {CarsListComponent} from './carList.component';
import {CarsSearchPanelComponent} from './carSearchPanel.component';
import {PagePanelComponent} from './searchPage.component';
import {PageController} from './pageController.service';
//
import * as Rx from 'rxjs';

import {FilterService} from './filterController.service';
import {SearchParamsController} from './searchParamsController.service'
@Component({
    selector: 'carSeach',
    template: `
        <section>        
            <div class="col-md-3">
                <carFilterPanel #filterPanel (changed)="filterChanged()"></carFilterPanel>       
            </div>
            <div class="col-md-9">
                <div class="panel panel-default">
                    <div class="panel-heading"> 
                        <carsSearchPanel #seachViewPanel (changed)="searchViewChanged()"></carsSearchPanel>
                    </div>
                    <div class="panel-body">
                        <carsList [cars]="cars"></carsList>
                    </div>
                    <div class="panel-footer">
                        <searchPage 
                            [totalPages]="totalCount" 
                            [limit]="limit" 
                            [currentPage]="page"
                            (changed)="pageChanged()">
                        </searchPage>
                    </div>
                </div>
            </div>
        </section>
    `,
    directives: [
        CORE_DIRECTIVES,
        ROUTER_DIRECTIVES,
        CarsListComponent,
        CarFilterPanelComponent,
        CarsSearchPanelComponent,
        PagePanelComponent
    ]
})
// Root component to contain filters and finded cars list
export class CarsSeachComponent implements OnReuse, OnInit {
    cars: Array<any> = [];
    totalCount: any;
    limit: any;
    page: any;
    constructor(
        private apiService: ApiService,
        private router: Router,
        private params: RouteParams,
        private filterService: FilterService,
        private searchParamsContr: SearchParamsController,
        private pageContr: PageController) { }

    routerCanReuse() {
        return true;
    }

    routerOnReuse(instruction: ComponentInstruction) {
        var queryObject = Object.assign({},
            this.filterService.createFromRouteParams(instruction.params),
            this.searchParamsContr.createFromRouteParams(instruction.params));
        console.info('Search object: ', queryObject);
        this.seach(queryObject);
        this.limit = queryObject.limit;
        this.page = queryObject.page;
    }
    ngOnInit() {
        var queryObject = Object.assign({},
            this.filterService.createFromRouteParams(this.params.params),
            this.searchParamsContr.createFromRouteParams(this.params.params));
        this.seach(queryObject);
        this.limit = queryObject.limit;
        this.page = queryObject.page;
    }

    seach(filter) {
        this.apiService
            .seachCars(filter)
            .subscribe((result: any) => {
                this.cars = result.cars;
                this.totalCount = +result.count;
            }, (err) => { console.error(err) })
    }


    filterChanged() {
        var route = Object.assign({},
            this.filterService.convertToRouteParams(),
            this.searchParamsContr.convertToRouteParams(),
            this.pageContr.convertToRouteParams(),
            { page: 0 }); // return to the first page, when filter changing         
        this.router.navigate(['SearchList', route])
    }

    searchViewChanged() {
        var route = Object.assign({},
            this.filterService.convertToRouteParams(),
            this.searchParamsContr.convertToRouteParams(),
            this.pageContr.convertToRouteParams());        
        this.router.navigate(['SearchList', route])
    }

    pageChanged() {
        var route = Object.assign({},
            this.filterService.convertToRouteParams(),
            this.searchParamsContr.convertToRouteParams(),
            this.pageContr.convertToRouteParams());
        this.router.navigate(['SearchList', route])
    }
}