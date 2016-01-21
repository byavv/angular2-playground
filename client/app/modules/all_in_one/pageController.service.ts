
import {Injectable} from 'angular2/core';
import * as Rx from 'rxjs';
import * as filters from './filters/filterItems/filters';

export interface IPage {
    page?: number;
}
export class Page implements IPage {
    page: number;
    constructor() {
        this.page = 0;
    }
}

@Injectable()
export class PageController {
    private _page: Page = new Page();
    PageSubject: Rx.Subject<IPage> = new Rx.Subject();

    constructor() {}

    public set page(value: IPage) {
        Object.assign(this._page, value);
    }
    public get page(): IPage {
        return this._page;
    }
    public createFromRouteParams(params): any {
        this.page = {
            page: +params["page"] || 0
        }
        this.PageSubject.next(this.page);
        return this.page;
    }
    public convertToRouteParams(): any {
        return this.page;
    }
}