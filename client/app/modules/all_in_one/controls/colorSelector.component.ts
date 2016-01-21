//

import {Component, EventEmitter} from 'angular2/core';
import {
CORE_DIRECTIVES,
FORM_DIRECTIVES,
Validators,
Control,
ControlGroup,
NgControl,
ControlValueAccessor} from 'angular2/common';
import {allColors} from "../config/carColors";

@Component({
    selector: 'colorPicker[ngControl]',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    template: `
        <div>
           <div *ngFor="#color of colors, #i=index" class="color">                 
                <div class="color-picker" 
                    [class.active]="color.active" 
                    (click)="selectColor(i)"                 
                    [style.background-color]="color.color">                   
                </div>
           </div>
        </div>
    `,
    styles: [`
        .color-picker{
            width: 33px;
            height: 33px;
            float: left;
            margin: 0 5px 5px 0;
            border-radius: 4px;
            border: 1px solid rgba(0,0,0,.2);
            cursor: pointer;
        }
        .color-picker.active{
            background-image: url('/build/images/check.png');
            background-repeat: no-repeat;
            background-position: center;
        }
    `]
})

export class ColorPickerControl implements ControlValueAccessor {

    colors: Array<any> = [];
    onChange: EventEmitter<any> = new EventEmitter();
    onTouched: any;
    constructor(private cd: NgControl) {
        cd.valueAccessor = this;
    }
    selectColor(index) {
        this.colors[index].active = !this.colors[index].active;
        var activeColors = this.colors.filter((color) => color.active);
        this.onChange.next(activeColors.map((color)=>color.color));
    }
    
    /**
     * ControlValueAccessor
     */
    writeValue(value: Array<string>) {
        if (value) {
            this.colors = allColors().map((color) => {
                return value.indexOf(color) > -1
                    ? { active: true, color: color }
                    : { active: false, color: color }
            })
        } else {
            this.colors = allColors().map((color) => {
                return {
                    active: false,
                    color: color
                }
            });
        }

    }
    registerOnChange(fn): void {
        this.onChange.subscribe(fn);
    }
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }
}