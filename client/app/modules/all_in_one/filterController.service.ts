
import {Injectable} from 'angular2/core';
import * as Rx from 'rxjs';
import * as filters from './filters/filterItems/filters';

export interface IFilterModel {
    manufacter?: string;
    model?: string;
    year?: string;
    price?: number;
    yearUp?: number;
    yearFrom?: number;
    priceUp?: number;
    priceFrom?: number;
    limit?: number;
    sort?: string;
    page?: number;
    colors?: Array<any>;
    milageFrom?: number;
    milageUp?: number;
}
export class FilterModel implements IFilterModel {
    manufacter: string;
    model: string;
    year: string;
    price: number;
    yearUp: number;
    yearFrom: number;
    priceUp: number;
    priceFrom: number;
    colors: Array<any>;
    milageFrom: number;
    milageUp: number;

    constructor() {
        this.manufacter = "";
        this.priceUp = 0;
        this.priceFrom = 0;
        this.model = '';
        this.yearUp = 0;
        this.yearFrom = 0;
        this.colors = [];
        this.milageFrom = 0;
        this.milageUp = 0;
    }
}
/**
 * Manages filter value, creates this value gaining all values from filters
 */
@Injectable()
export class FilterService {
    private _currentState: FilterModel = new FilterModel();
    filtersSubject: Rx.Subject<Array<any>> = new Rx.Subject();
    filterStateSubject: Rx.Subject<IFilterModel> = new Rx.Subject();
    filterDefaults: any;
    _sortState: string;
    _limit: number;
    _page: number;
    _resultsCountState: string;
    _filters: Array<any> = [];
    constructor() { }

    public set filter(value: IFilterModel) {
        Object.assign(this._currentState, value);
        this.filterStateSubject.next(this._currentState);
    }
    public get filter(): IFilterModel {
        return this._currentState;
    }
    /**
     * Converts route params to the filter state passing them through all the filters, 
     * which perform conversion to working values.
     */
    public createFromRouteParams(params): any {
        this._filters = [];
        let filter = {};
        for (let type in filters) {
            // filterName is static property, added by decorator, 
            // as like as 'convert' and 'convertBack' functions, 
            // so applied filter acts like component and the value converter at the same time.
            if (!!filters[type].filterName) {
                let filterName = filters[type].filterName;
                // if filter was decorated properly, it contains static memebers (convert, convertBack, requiredParams)
                if (typeof filters[type].convert != 'function' || !filters[type].requiredParams) {
                    console.error(`There is no converter for filter ${type}, or it has wrong config`);
                } else {
                    var filterParams = [];
                    filters[type].requiredParams.forEach((paramName) => {
                        //get params from route
                        filterParams.push(params[paramName]);
                    }); 
                    // convert them to filter value
                    // ex.  "2000..2005" --> {yearFrom: 2000, yearUp: 2005},
                    //      "red, green" --> ["red", "green"]                  
                    let filterValue = filters[type].convert(filterParams);
                    // init filter with given values !!
                    Object.assign(filter, filterValue);
                    this._filters.push({ name: filterName, value: filterValue });
                }
            } else {
                console.error(`Filter ${type} should be decorated with @Filter({filterName:'myFilterName'})`);
            }
        }
        this.filter = filter;
        this.filtersSubject.next(this._filters);
        return this.filter;
    }
    /**
     * Backward operation. Converts filter state to route params
     */
    public convertToRouteParams(): any {
        var route = {};      
        // filters defined
        for (let type in filters) {
            if (!!filters[type].filterName) {
                let filterName = filters[type].filterName;
                Object.assign(route, filters[type].convertBack(this.filter));
            } else {
                console.error(`Filter ${type} should be decorated with @Filter({filterName:'myFilterName'})`);
            }
        }
        return route;
    }
}

