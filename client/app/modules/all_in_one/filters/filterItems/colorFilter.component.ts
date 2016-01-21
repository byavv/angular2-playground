import {Component, EventEmitter, Input, Output, AfterViewInit} from 'angular2/core';
import {CORE_DIRECTIVES, Control, ControlGroup} from 'angular2/common';
import {Filter, convert} from "../../decorators/decorators";

import {ColorPickerControl} from "../../controls/colorSelector.component";

@Component({
    selector: 'color-filter',
    template: ` 
   <div class="form-group">
       <form [ngFormModel]="form" >    
             <div class="row">
                <div class="col-md-12">
                    <label class="control-label">Color (exterior)</label>
                    <colorPicker
                        ngControl="colors" 
                        multy="true"
                        [(ngModel)]="filterValue.colors">
                    </colorPicker>
                </div>       
             </div>               
       </form>
  </div>
  
  
  `,
    directives: [CORE_DIRECTIVES, ColorPickerControl]
})
@Filter({ filterName: "color", params: ['colors'] })
export class ColorFilterComponent implements AfterViewInit {
    @Input()
    active: boolean;
    @Input()
    filterValue: any = {};
    @Output()
    changed: EventEmitter<any> = new EventEmitter();
    colors: Control;
    form: ControlGroup;

    constructor() {       
        this.colors = new Control();
        this.form = new ControlGroup({
            colors: this.colors,
        });
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