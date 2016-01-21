import {Component, EventEmitter, Input, Output, AfterViewInit, ViewEncapsulation} from 'angular2/core';
import {CORE_DIRECTIVES, Control, ControlGroup} from 'angular2/common';
import {Filter, convert} from "../../decorators/decorators";

@Component({
    selector: 'milage-filter',
    template: ` 
  
       <form [ngFormModel]="form" >    
             <div class="row">
                <div class="col-md-12">
                    <label class="control-label">Milage</label>
                </div>              
                <div class="form-group col-md-6 moved-left" >
                     <input class="form-control" 
                        type="number" min="0"
                        name="milageFrom" 
                        id="milageFrom"
                        #milageFrom="ngForm"  
                        ngControl="milageFrom" 
                        placeholder="From"
                        [(ngModel)]="filterValue.milageFrom"/> 
                </div>
                  
                <div class="form-group col-md-6 moved-right" >
                       <input class="form-control"
                            type="number" min="0" 
                            name="milageUp" 
                            id="milageUp"
                            #milageUp="ngForm" 
                            placeholder="Up"
                            ngControl='milageUp'
                            [(ngModel)]="filterValue.milageUp"/> 
                </div>                 
             </div>               
       </form>
  
  
  
  `,
    styles: [`
  .moved-left{
      padding-right:7px;
  }
  .moved-right{
      padding-left:7px;
  }
  @media (max-width: 992px) {
      .moved-right, 
      .moved-left{
          padding-left:15px;
          padding-right:15px;
      }
  }

  `],
    directives: [CORE_DIRECTIVES],
    encapsulation: ViewEncapsulation.None
})
@Filter({ filterName: "milage", params: ['milageFrom', 'milageUp'] })
export class MilageFilterComponent implements AfterViewInit {
    @Input()
    active: boolean;
    @Input()
    filterValue: any = {};
    @Output()
    changed: EventEmitter<any> = new EventEmitter();
    milageFrom: Control;
    milageUp: Control;
    form: ControlGroup;
    milagesUp: Array<number> = [];
    milagesFrom: Array<number> = [];
    constructor() {
        this.milageFrom = new Control();
        this.milageUp = new Control();
        this.form = new ControlGroup({
            milageFrom: this.milageFrom,
            milageUp: this.milageUp
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