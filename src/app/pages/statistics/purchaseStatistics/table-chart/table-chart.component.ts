import { Component, Input, OnInit } from '@angular/core';
import { TabelChartService } from "./tabelChart.service";
import * as theme from '../../chart.theme';
var Highcharts = require('highcharts');
@Component({
  selector: 'app-table-chart',
  templateUrl: './table-chart.component.html',
  styleUrls: ['../../public.scss', './table-chart.component.scss']
})
export class TableChartComponent implements OnInit {
  PageInfo = { pageSize: 10, pageIndex: 1, totalCount: 2 };
  @Input() tableinfo = [];
  @Input() type: string = '';
  @Input() lineData: any = [];
  @Input() title: string = "";

  Topage: number = null;
  toggle: boolean = true;
  orderData: any = [];
  constructor() {

  }

  toggleBar(val: any) {
    if (val) {
      this.toggle = true;
    }
    else {
      this.toggle = false;
    }
  }
  ngOnInit() {
    this.OnQuery();
    this.initlineChart(this.lineData, this.title);
  }
  topage() {

  }
  tolast() {

  }
  pageChanged(pn) {
    this.PageInfo.pageIndex = pn;
    this.OnQuery();
  }
  OnQuery() {
    this.PageInfo.totalCount = this.tableinfo.length;
  }
  initlineChart(list: any, title: any) {
    Highcharts.theme = {};
    var options = {
      chart: { type: 'spline' },
      title: { text: `${title}` },
      xAxis: { type: 'datetime', xDateFormat: '%m-%d', categories: [] },
      yAxis: {
        title: { text: this.type.toUpperCase() },
        labels: { formatter: function () { return this.value + ' ' + '$'; } }
      },
      series: [{ name: this.type, data: [], color: '#fff' }]
    };


    switch (this.type) {
      //初始化option,金额走势数据
      case 'money': {
        let money: string[] = [];
        let moneydate: string[] = [];
        for (var i = 0; i < list.length; i++) {
          money.push(list[i].money);
          moneydate.push(list[i].date);
        }
        options.series[0].data = money;
        options.xAxis.categories = moneydate;
        break;
      }
      //初始化option,数量走势数据
      case 'num': {
        let num: string[] = [];
        let numdate: string[] = [];
        for (var i = 0; i < list.length; i++) {
          num.push(list[i].num);
          numdate.push(list[i].date);
        }
        options.series[0].data = num;
        options.xAxis.categories = numdate;

        //去除Y轴的单位
        options.yAxis.labels = { formatter: function () { return this.value; } };
        break;
      }
    }




    Highcharts.setOptions(theme.getLineChartTheme());
    Highcharts.chart('container', options);
  }
}
