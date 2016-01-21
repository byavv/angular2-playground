import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {CORE_DIRECTIVES} from 'angular2/common';


export interface IPage {
    label: string;
    value: any;
}

@Component({
    selector: 'pagination',
    template: `
    <ul class="pagination pagination-sm">
        <li class="page-prev" [class.disabled]="isFirstPage()" >
            <span [class.disabled]="isFirstPage()" (click)="setPage(currentPage - 1)">
                <i class="glyphicon glyphicon-chevron-left"></i>
            </span>           
        </li>
        <li [class.active]="currentPage === page.value" *ngFor="#page of shownPages">
            <span (click)="setPage(page.value)">                
                <span>{{ page.label }}</span>
            </span>
        </li>
        <li class="page-next" [class.disabled]="isLastPage()" >
            <span (click)="setPage(currentPage + 1)" [class.disabled]="isLastPage()">
                <i class="glyphicon glyphicon-chevron-right"></i>
            </span>            
        </li>
    </ul>
    `,
    directives: [CORE_DIRECTIVES],
    styles: [`
    .pagination span{
        cursor: pointer;
    }
    .page-prev span.disabled, 
    .page-next span.disabled{
         pointer-events: none;
         cursor: default;
         opacity:0.5;
    }
    .pagination i {
        font-size:0.8em;
    }
    .pagination{
        margin: 2px 0;
    }
    `],
    host: {
        '[style.display]': 'isVisible()'
    }
})
export class PaginationControlsCmp {
    private _currentPage: number = 0;
    private _totalItems;
    private _currentMin;
    private _currentMax;
    private _itemsPerPage;


    public shownPages: IPage[] = [];
    public allPages: IPage[] = [];

    @Input() maxSize: number = 6;
    @Input()
    set totalItems(value) {
        this._totalItems = value;
        this._createPageArray();
    };
    get totalItems() {
        return this._totalItems;
    };
    @Input()
    set itemsPerPage(value) {
        this._itemsPerPage = +value;
        this._createPageArray();

    };
    get itemsPerPage() {
        return this._itemsPerPage;
    };
    @Input()
    set currentPage(value) {
        this._currentPage = value;
        this._createPageArray();
    };
    get currentPage() {
        return this._currentPage;
    };
    @Output() pageChange: EventEmitter<number> = new EventEmitter();

    constructor() {
        this._currentMax = this.maxSize;
        this._currentMin = 0;
    }

    isFirstPage(): boolean {
        return this.currentPage === 0;
    }

    isLastPage(): boolean {
        return Math.ceil(this.totalItems / this.itemsPerPage) === this.currentPage + 1;
    }

    isVisible() {
        return this.allPages.length > 1 ? "block" : "none"
    }

    setPage(value) {
        if (this.currentPage != value) {
            this.currentPage = value;
            this.pageChange.next(value);
        }
    }

    _createPageArray() {
        this.allPages = [];
        if (!!this.totalItems && !!this.itemsPerPage) {
            let totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
            for (let i = 0; i < totalPages; i++) {
                this.allPages.push({
                    label: i + 1 + "",
                    value: i
                });
            }
            // Happens, we need to correct range, because currentPage has impossible value
            if (this.currentPage > totalPages - 1) {
                this._currentMax = totalPages - 1;
                this._currentMin = this._currentMax - this.maxSize;
                return this.setPage(totalPages - 1); 
            }            
            // works like window, we move it depending on page value
            // if current page is out of boundaries, correct window position accordingly
            if (this.currentPage + 1 > this._currentMax || this.currentPage + 1 < this._currentMin) {
                this._currentMin = this.currentPage - Math.ceil(this.maxSize / 2);
                this._currentMax = this.currentPage + Math.floor(this.maxSize / 2);
                if (this._currentMax > this.allPages.length) {
                    this._currentMax = this.allPages.length;
                    this._currentMin = this._currentMax - this.maxSize;
                }
                if (this._currentMin < 0) {
                    this._currentMin = 0;
                    this._currentMax = this.maxSize;
                }
            }
            // click on the right boundary - move window to the right        
            if (this.currentPage + 1 == this._currentMax) {
                this._currentMin += Math.ceil(this.maxSize / 2);
                this._currentMax += Math.ceil(this.maxSize / 2);
                if (this._currentMax > this.allPages.length) {
                    this._currentMax = this.allPages.length;
                    this._currentMin = this._currentMax - this.maxSize;
                }
            }
            // click on the left boundary - move window to the left
            if (this.currentPage == this._currentMin) {
                this._currentMin -= Math.ceil(this.maxSize / 2);
                this._currentMax -= Math.ceil(this.maxSize / 2);
                if (this._currentMin < 0) {
                    this._currentMin = 0;
                    this._currentMax = this.maxSize;
                }
            }
            this.shownPages = this.allPages.slice(this._currentMin, this._currentMax);
        }
    }
}