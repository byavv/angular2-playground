import {Component, ViewQuery, QueryList, ElementRef, EventEmitter, OnDestroy} from 'angular2/core';
import {CORE_DIRECTIVES, Control, FORM_DIRECTIVES} from 'angular2/common';
import * as rx from 'rxjs';
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';
import {ApiService} from '../api.service';
import {Http, Response, Headers} from 'angular2/http';

@Component({
    selector: 'autocomplete',
    template: require('./autocomplete.component.html'),
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    outputs: ['changed']
})

export class AutoComplete {
    visible = true;
    seachText: Control;
    seachTextModel: string;
    results: Array<string>;
    message: string;
    opened: boolean = false;
    changed: EventEmitter<any> = new EventEmitter();


    constructor(
        private _ab: AnimationBuilder,
        @ViewQuery('sbSearch, sbSearchResults') private elList: QueryList<ElementRef>,
        private api: ApiService) {

        this.seachText = new Control();
        this.resetAutocomplete();
        this.seachText
            .valueChanges
            .do(value => {
                if (value) {
                    this.message = 'searching...';
                }
            })
            .debounceTime(500)
            .map((value: string) => value.toLowerCase())
            .distinctUntilChanged()
            .flatMap((value: string) => this.api.searchManufacters(value))
            .subscribe((value) => {
                this.toggleResults(value);
            }, (err) => {
                /* dont care in playground */
            })
    }
    resutSelected(result) {
        this.changed.next(result);
    }

    toggleResults(results = null) {
        if (results.length) {
            this.results = results;
            this.message = null;
        } else {
            this.results = [];
            this.message = 'no cars found'
        }
    }

    resetAutocomplete() {
        this.seachTextModel = '';
        this.results = [];
        this.message = null;
    }

    toggleControlState(open: boolean = false) {
        if (!open) {
            this.resetAutocomplete();
            this.animateClose()
        } else {
            this.animateOpen();
        }
    }

    animateOpen() {
        let animation = this._ab.css();
        animation
            .setDuration(700);
        animation.setFromStyles({ width: '45px' })
            .setToStyles({ width: '400px' })
        animation.start(this.elList.first.nativeElement);
    }

    animateClose() {
        let animation = this._ab.css();
        animation
            .setDuration(700);
        animation.setFromStyles({ width: '400px' })
            .setToStyles({ width: '45px' });
        animation.start(this.elList.first.nativeElement);
    }
}
