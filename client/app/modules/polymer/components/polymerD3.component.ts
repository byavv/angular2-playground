import {Component, ViewQuery, QueryList, ElementRef} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'polimer',
    template: `    
    <div class="row">   
        <div class="col-md-12 button-bar"> 
            <paper-button raised (click)="updateCharts()">Update</paper-button>            
        </div>   
        <div class="col-md-12" *ngFor="#symbol of symbols; #s = index">
            <div class="chart-container">
                <stock-graph #chart [ratio]='5' [months]="months[symbol]" [symbol]="symbol"></stock-graph>       
            </div>      
        </div>   
    </div>
    `,
    directives: [CORE_DIRECTIVES],
    styles: [`
    .chart-container {
        background: rgba(255, 255, 255, 0.68);
        opacity: 0.8;
        margin: 5px;
        padding: 0 15px;
        box-shadow: 0px 2px 5px 0 rgba(189, 189, 189, 0.68);
    }
    .button-bar{
        padding-top:10px;
        padding-bottom:10px;
    }
    `]
})

export class PolymerD3 {
       
    symbols: Array<string> = ["GOOG", "ORCL", "MSFT", "YHOO", "AAPL", "CSCO"];
    months: any = {};
    test: Array<number> = [6, 12];
    charts: QueryList<ElementRef>;
    
    constructor(@ViewQuery("chart") charts: QueryList<ElementRef>) {
        this.charts = charts;
        this.symbols.forEach(symbol => {
            this.months[symbol] = 6;
        });
    }
      
    updateCharts() {
        this.charts.toArray().forEach((chart) => {
            chart.nativeElement.updateChart();
        })
    }
}








  