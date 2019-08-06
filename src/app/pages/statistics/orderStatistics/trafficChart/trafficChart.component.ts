import {Component, Input, OnInit} from '@angular/core';

import * as Chart from 'chart.js';

@Component({
  selector: 'traffic-chart',
  templateUrl: './trafficChart.html',
  styleUrls: ['./trafficChart.scss']
})

export class TrafficChart implements OnInit{
  @Input()  doughnutData?: Array<any>;
  @Input()  TotalValue?:number;
  @Input()  Character?:string;
  @Input()  tableData?:object;
  @Input()  TableTitle?:string[];
  @Input()  CircleTitle?:string[];
  constructor() {
  }
  ngOnInit() {
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
