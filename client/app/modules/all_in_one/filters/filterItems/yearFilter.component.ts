import {Component, EventEmitter, Output, Input, AfterViewInit} from 'angular2/core';
import {CORE_DIRECTIVES, Control, FORM_DIRECTIVES, ControlGroup} from 'angular2/common';
import {Filter, convert} from "../../decorators/decorators";


@Component({
    selector: 'yearWrapper',
    template: `  
       <form [ngFormModel]="form" >    
          <div class="row">
             <div class="col-md-12">
                    <label class="control-label">Registration (date)</label>
                </div> 
                <div class="form-group col-md-6 moved-left">
                   <select class="form-control" 
                      name="yearFrom" 
                      id="yearFrom"
                      #yearFrom="ngForm"  
                      ngControl="yearFrom" 
                      [(ngModel)]="filterValue.yearFrom">
                        <option value="">Any</option>
                        <option *ngFor="#year of yearsFrom" 
                          [class.hidden]="year > yearUp.control.value && !!yearUp.control.value"
                          [value]="year">{{year}}</option>            
                    </select> 
                </div>                  
                <div class="form-group col-md-6 moved-right">
                    <select class="form-control" 
                        name="yearUp" 
                        id="yearUp"
                        #yearUp="ngForm" 
                        ngControl='yearUp'
                        [(ngModel)]="filterValue.yearUp">
                         <option value="">Any</option>
                         <option *ngFor="#year of yearsUp" 
                             [class.hidden]="year < yearFrom.control.value && !!yearFrom.control.value"
                             [value]="year">{{year}}</option>                       
                     </select> 
                </div>                 
            </div>               
       </form>
  `,
    inputs: ["active"],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
@Filter({ filterName: "year", params: ['year'] })
export class YearFilterComponent implements AfterViewInit {
    @Input()
    active: boolean;
    @Input()
    filterValue: any = {
        yearUp: '',
        yearFrom: ''
    };
    @Output()
    changed: EventEmitter<any> = new EventEmitter();
    yearFrom: Control;
    yearUp: Control;
    form: ControlGroup;
    yearsUp: Array<number> = [];
    yearsFrom: Array<number> = [];
    constructor() {
        this.yearFrom = new Control("");
        this.yearUp = new Control("");
        this.form = new ControlGroup({
            yearFrom: this.yearFrom,
            yearUp: this.yearUp
        });
        for (let i = 1980; i <= new Date().getFullYear(); i++) {
            this.yearsUp.push(i);
            this.yearsFrom.push(i);
        }
    }

    ngAfterViewInit() {
        this.form.valueChanges
            .distinctUntilChanged()
            .subscribe(value=> {
                this.changed.next(value);
            })
    }

    @convert
    viewValue() {
        return this.filterValue;
    }
}