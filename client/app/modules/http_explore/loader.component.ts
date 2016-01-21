import {Directive, ElementRef, Renderer, View } from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Control, FormBuilder, ControlGroup, Validators} from 'angular2/common';

import {AnimationBuilder} from 'angular2/src/animate/animation_builder';

import {Http} from 'angular2/http';
import {ExtHttp, Action} from "./extHttp";

/**
 * Naive loader
 */
@Directive({
    selector: '[loader]',

})
export class Loader {
    http: ExtHttp;
    trackedRequests: Array<any> = [];
    currentValue: number = 0;
    loadingTimer: any;
    constructor(private element: ElementRef, private renderer: Renderer, http: Http, private _ab: AnimationBuilder) {

        renderer.setElementClass(element.nativeElement, "cmn-t-underline", true)
        this.renderer.setElementStyle(this.element.nativeElement, "width", "0");
        this.http = <ExtHttp>http;
        this.http.process.subscribe((value) => {            
            if (value == Action.QueryStart) {
                this.trackedRequests.push(value);
                this._render(Action.QueryStart);
            }
            if (value == Action.QueryStop) {
                this.trackedRequests.pop();
                this._render(Action.QueryStop);
            }
        })
    }

    _render(action) {
        this._stopLoadingEmulation();
        if (this.trackedRequests.length > 0) {
            let newValue;
            if (action == Action.QueryStart) {
                if(this.currentValue == 0){
                    newValue = 10; //start position
                }else{
                    newValue = this.currentValue - this.currentValue / 3;
                }                
            } else {
                newValue = this.currentValue + ((100 - this.currentValue) / 3);
                if (newValue >= 100) {
                    newValue = 95;
                }
            }
            this.animateTransitionToNewValue(this.currentValue, newValue);
            this._startLoadingEmulation();
            this.currentValue = newValue;
        } else {
            this.currentValue = 100;
            this._stopLoadingEmulation();
            this.animateTransitionToNewValue(this.currentValue, 100);
            setTimeout(() => {
                this.animateTransitionToNewValue(this.currentValue, 0);
                this.currentValue = 0;
            },200)
        }
    }

    animateTransitionToNewValue(from, to) {
        this.renderer.setElementStyle(this.element.nativeElement, "width", to + '%')
    }

    _startLoadingEmulation() {
        this.loadingTimer = setInterval(() => {
            let oldValue = this.currentValue;
            this.currentValue += this._inc();
            this.animateTransitionToNewValue(oldValue, this.currentValue);
        }, 250);
    }

    _stopLoadingEmulation() {
        if (this.loadingTimer) {
            clearInterval(this.loadingTimer);
        }
    }

    // Inspired by https://github.com/chieffancypants/angular-loading-bar/blob/master/src/loading-bar.js
    _inc() {
        if (this.currentValue >= 100) {
            return;
        }
        if (this.currentValue >= 0 && this.currentValue < 25) {
            return (Math.random() * (5 - 3 + 1) + 3);
        } else if (this.currentValue >= 25 && this.currentValue < 60) {
            return (Math.random() * 3);
        } else if (this.currentValue >= 60 && this.currentValue < 90) {
            return (Math.random() * 2) / 100;
        } else if (this.currentValue >= 90 && this.currentValue < 99) {
            return 0.5;
        } else {
            return -0.5;
        }
    }
}





