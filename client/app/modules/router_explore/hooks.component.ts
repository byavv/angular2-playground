import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES, ControlGroup, Control} from 'angular2/common';
import {ROUTER_DIRECTIVES, CanReuse, OnReuse, RouteParams, Router, ComponentInstruction} from 'angular2/router';
import {URLSearchParams, JSONP_PROVIDERS, Jsonp, Http} from 'angular2/http';

@Component({
    selector: 'hooks',
    template: `
        <div class="clo-md-12">
        <div class="col-md-8" style="padding:20px 0;">
            <form class="form-inline" [ngFormModel]="form" (ngSubmit)="onSubmit(form.value)">
                <div class="form-group">
                    <label for="count">Per page</label>
                    <input type="number" min="10" class="form-control" id="count" 
                        [(ngModel)]="perPage" 
                        ngControl="perPage">
                </div>
                <div class="form-group">
                    <label for="seach">Seach</label>
                    <input type="text" class="form-control" id="seach" placeholder="Pretzels... " 
                        [(ngModel)]="searchTag" 
                        ngControl="searchTag">
                </div>
                <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
            </form>
        </div>
        <div class="col-md-4">
            <div class="form-group pull-right">
                <nav>
                    <ul class="pagination pagination-sm">
                        <li *ngFor="#page of pages; #i=index" [class.active]="i==currentPage">
                            <a href="#" (click)="navigateOnPage(i)">
                                <span>
                                        <span aria-hidden="true">{{i+1}}</span>
                                </span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    <div class="col-md-12 clearfix">
        <div class="flickr-img" *ngFor="#img of imagesToShow">
            <img style="width:100%; height: 100%;" class="img-thumbnail" [src]="img.url" alt="Car">
        </div>
    </div>
  `,
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES],
    providers: [JSONP_PROVIDERS],
    styles: [`
        .flickr-img{
            width: 150px;
            color: white;
            margin: 5px;
            display: inline-block;            
            height: 100px;  
        }
        .flickr-result-container{
            
        }    
    `]
})
export class HooksComponent implements CanReuse, OnReuse, OnInit {
    used: number = 0;
    images: Array<any> = [];
    imagesToShow: Array<any> = [];
    currentPage: number = 0;
    searchTag: string;
    perPage: number;
    form: ControlGroup;
    pages: Array<number> = []; // limited by 100 (20 for public api) for example's sake
    
    constructor(private _routeParams: RouteParams, private router: Router, private jsonp: Jsonp, private http: Http) {
        this.form = new ControlGroup({
            perPage: new Control(),
            searchTag: new Control()
        })
        this.currentPage = +this._routeParams.get("page") || 0;
        this.perPage = +this._routeParams.get("perPage") || 20;
        this.searchTag = this._routeParams.get("searchTag") || '';
    }

    ngOnInit() {
        if (this.searchTag) {
            this.getNew(this.searchTag);
        }
    }

    onSubmit(value) {
        if (value.searchTag)
            this.getNew(value.searchTag);
        this.router.navigate(["Hooks", {
            page: this.currentPage,
            searchTag: value.searchTag,
            perPage: value.perPage
        }])
    }
    
    routerCanReuse() {
        return true;
    }

    routerOnReuse(instruction: ComponentInstruction) {             
        this.currentPage = +instruction.params["page"] || 0;
        this.perPage = +instruction.params["perPage"] || 20;
        this.searchTag = instruction.params["searchTag"] || "";
        if (!!this.searchTag)
            this.updateView();
    }

    getNew(tags) {
        var search = new URLSearchParams();
        search.set('tags', tags);
        search.set('format', 'json');
        return this.jsonp 
        
            /*   .get('http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=JSONP_CALLBACK', { search })
               .map((response) => response.json())
               .map(result=> result.items)
               .map(result=> {
                   return result.map((item) => {
                       return {
                           url: item.media.m,
                           title: item.title
                       }
                   })
               })*/               
               
            // if you have a flickr api key, uncomment this code. It works much better.
            .get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=74233effb558074e0175a128d7d4aa4b&privacy_filter=1&content_type=1&extras=url_m&format=json&jsoncallback=JSONP_CALLBACK', { search })
            .map((response) => response.json())
            .map(result=> result.photos)
            .map(result=> {
                return result.photo.map((item) => {
                    return {
                        url: item.url_m,
                        title: item.title
                    }
                })
            })
            .subscribe((items) => {
                this.images = items;
                var total = items.length / this.perPage;
                this.pages = [];
                for (var i = 0; i < total; i++) {
                    this.pages.push(i);
                }
                this.updateView();
            })
    }
    updateView() {
        this.imagesToShow = this.images
            .slice(this.perPage * this.currentPage, this.perPage * this.currentPage + this.perPage)
    }
    navigateOnPage(pageNumber) {
        this.router.navigate(["Hooks", {
            page: pageNumber,
            searchTag: this.searchTag,
            perPage: this.perPage
        }])
    }
}





  