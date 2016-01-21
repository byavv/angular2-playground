
import {Injectable} from 'angular2/core';
import * as Rx from 'rxjs';
import * as filters from './filters/filterItems/filters';

export interface ISearchParams {
    limit?: number;
    sort?: string;
    page?: number;
}
export class SearchParams implements ISearchParams {
    limit: number;
    sort: string;
    page: number;

    constructor() {
        this.limit = 20;
        this.sort = "price";
        this.page = 0;
    }
}

@Injectable()
export class SearchParamsController {
    private _currentParams: SearchParams = new SearchParams();
    searchParamsSubject: Rx.Subject<ISearchParams> = new Rx.Subject();

    constructor() { }

    public set params(value: ISearchParams) {
        Object.assign(this._currentParams, value);
    }
    public get params(): ISearchParams {
        return this._currentParams;
    }
    public createFromRouteParams(params): any {
        this.params = {
            sort: params["sort"] || "price",
            limit: +params["limit"] || 20,
            page: +params["page"] || 0
        }
        this.searchParamsSubject.next(this.params);
        return this.params;
    }
    public convertToRouteParams(): any {        
        return this.params;
    }
}