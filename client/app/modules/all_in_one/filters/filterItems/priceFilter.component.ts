import {Component, EventEmitter, Input, Output, AfterViewInit} from 'angular2/core';
import {CORE_DIRECTIVES, Control, ControlGroup} from 'angular2/common';
import {Filter, convert} from "../../decorators/decorators";

@Component({
    selector: 'priceWrapper',
    template: `  
       <form [ngFormModel]="form" >    
             <div class="row">
                <div class="col-md-12">
                    <label class="control-label">Price</label>
                </div>              
                <div class="form-group col-md-6 moved-left">
                     <input class="form-control" 
                        type="number" min="0"
                        name="priceFrom" 
                        id="priceFrom"
                        #priceFrom="ngForm"
                        placeholder="From"  
                        ngControl="priceFrom" 
                        [(ngModel)]="filterValue.priceFrom"/> 
                </div>                  
                <div class="form-group col-md-6 moved-right">
                       <input class="form-control"
                            type="number" min="0" 
                            name="priceUp" 
                            id="priceUp"
                            #priceUp="ngForm"
                            placeholder="Up" 
                            ngControl='priceUp'
                            [(ngModel)]="filterValue.priceUp"/> 
                </div>                 
             </div>               
       </form>
  `,
    directives: [CORE_DIRECTIVES]
})
@Filter({ filterName: "price", params: ['price'] })
export class PriceFilterComponent implements AfterViewInit {
    @Input()
    active: boolean;
    @Input()
    filterValue: any = {};
    @Output()
    changed: EventEmitter<any> = new EventEmitter();
    priceFrom: Control;
    priceUp: Control;
    form: ControlGroup;
    pricesUp: Array<number> = [];
    pricesFrom: Array<number> = [];
    constructor() {
        this.priceFrom = new Control();
        this.priceUp = new Control();
        this.form = new ControlGroup({
            priceFrom: this.priceFrom,
            priceUp: this.priceUp
        });

    }
    ngAfterViewInit() {
        this.form.valueChanges
            .distinctUntilChanged()
            .debounceTime(500)
            .subscribe(value=> {
                this.changed.next(value);
            })
    }
    @convert
    viewValue() {
        return this.filterValue;
    }
}