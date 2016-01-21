import {Component, Input, Output, EventEmitter, OnInit, AfterViewInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, ControlGroup, Control} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteParams, OnReuse, ComponentInstruction} from 'angular2/router';
import {CarItemComponent} from './carListItem.component'
import {FilterService} from './filterController.service';
import {PageController} from './pageController.service';
import {PaginationControlsCmp} from '../../components/common/pagination/pagination.component';

@Component({
    selector: 'searchPage',
    template: `
    
           <div class="text-center">
                <pagination 
                    [currentPage]="currentPage"
                    [itemsPerPage]="limit"
                    [totalItems]="totalPages"
                    (pageChange)="pageChanged($event)">
                </pagination>
           </div> 
    `,
    styles: [`
        
    `],
    directives: [CORE_DIRECTIVES, PaginationControlsCmp]
})


// Root component to contain filters and finded cars list
export class PagePanelComponent implements AfterViewInit {
    private _totalPages: number;
    private _limit: number;
    private _currentPage: number;
    @Input()
    set totalPages(value) {
        this._totalPages = value;
    };
    get totalPages() {
        return this._totalPages;
    }
    @Input()
    set limit(value) {
        this._limit = value;
    };
    get limit() {
        return this._limit;
    }
    @Input()
    set currentPage(value) {
        this._currentPage = value;
    };
    get currentPage() {
        return this._currentPage;
    }

    @Output()
    changed: EventEmitter<any> = new EventEmitter();


    constructor(private pageController: PageController) {
        this.pageController
            .PageSubject
            .subscribe((page) => {
                this.currentPage = page.page;
            })
    }
    ngAfterViewInit() {
    }


    pageChanged(page) {
        this.currentPage = page;
        this.onSeachParamsChanged({ page: this.currentPage });
    }
    onSeachParamsChanged(newValue) {
        this.pageController.page = newValue;
        this.changed.next(this.pageController.page);
    }
}