import {Component, Input, OnInit} from '@angular/core';

import * as Chart from 'chart.js';

@Component({
  selector: 'traffic-chart',
  templateUrl: './trafficChart.html',
  styleUrls: ['../public.scss','./trafficChart.scss']
})

// TODO: move chart.js to it's own component
export class TrafficChart implements OnInit{
  @Input()  doughnutData?: Array<any>;
  @Input()  TotalValue?:number;
  @Input()  Money?:number[]=[];
  @Input()  PlatForms?:string[];
  @Input()  Character?:string;
  @Input()  tableData?:object;
  @Input()  TableTitle?:string[];
  bigMoney:number=-1;
  constructor() {
  }
  ngOnInit() {
    for(var i=0;i<this.Money.length;i++){
      if(this.Money[i]>this.bigMoney){this.bigMoney=this.Money[i];}
    }
  }
  ngAfterViewInit() {
    this._loadDoughnutCharts();
  }
  private _loadDoughnutCharts() {
    let el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
    new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true
    });
  }
}
