import { Component, OnInit } from '@angular/core';
import { TabelChartService } from "../tabelChart.service";
import * as theme from '../../chart.theme';
import { findBigSmallvalue } from "../../function";
import { AuthorityComponent } from "../../../../shared/component/authority.component";
import { ActivatedRoute, Router } from "@angular/router";
var Highcharts = require('highcharts');
@Component({
  selector: 'app-order-freight',
  templateUrl: './order-freight.component.html',
  styleUrls: ['../../public.scss', '../order-head/order-head.component.scss', './order-freight.component.scss']
})
export class OrderFreightComponent extends AuthorityComponent implements OnInit {
  //筛选项部分
  clickbottom: number = 0;
  clicktop: number = 0;
  storages: Array<any> = [{ id: -1, text: '本地仓库' }, { id: 1, text: '海外仓库' }];
  selectedstorages = -1;
  deliverTime: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '昨天' }, { id: 2, text: '7天内' }, { id: 3, text: '30天内' }, { id: 4, text: '自定义' }];
  selecteddeliverTime = -1;
  logisticsWay: Array<any> = [{ id: -1, text: '京东' }, { id: 1, text: '顺风' }, { id: 2, text: '邮政' }, { id: 3, text: '韵达' }, { id: 4, text: '天天' }];
  selectedlogisticsWay = -1;
  goodsWay: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: 'abc' }, { id: 2, text: 'efg' }, { id: 3, text: 'hij' }];
  selectedgoodsWay = -1;
  ifconfirm: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '是' }, { id: 2, text: '否' }];
  selectedifconfirm = -1;
  goodsWayProducts: Array<any> = [
    { id: 1, products: [{ id: -1, text: 'abc-product1' }, { id: 1, text: 'abc-product2' }] },
    { id: 2, products: [{ id: -1, text: 'efg-product1' }, { id: 1, text: 'efg-product2' }] },
    { id: 3, products: [{ id: -1, text: 'hij-product1' }] },
  ];
  goodsWayProductsList = [];
  selectedgoodsWayProducts = -1;

  //走势图数据部分
  freightTableInfo: any = [];
  LineFreightConfirm: any = [];
  LineFreightestimate: any = [];
  types = { type: 'freight', des: '' };
  lineData = [];

  toggle: boolean = true;
  PageInfo = { pageSize: 5, pageIndex: 1, totalCount: 0 };

  timeSearchStart = new Date();
  timeSearchEnd = new Date();
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };
  biggestmoneyindex = [];
  smallestmoneyindex = [];
  constructor(private tabelChartService: TabelChartService, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
    this.freightTableInfo = tabelChartService.freightInfo;
    this.LineFreightConfirm = tabelChartService.InSevenDayFreightConfirm;
    this.LineFreightestimate = tabelChartService.InSevenDayFreightestimate;
  }

  ngOnInit() {
    this.OnQuery();
    this.lineData.push(this.LineFreightConfirm);
    this.lineData.push(this.LineFreightestimate);
    this.initlineChart(this.lineData);
  }
  //高级筛选按钮
  toggle1(val: any) {
    if (val == 0) {
      this.clickbottom = 1;
    }
    else {
      this.clickbottom = 0;
    }
  }
  //图表表格切换
  toggleBar(val: any) {
    if (val) {
      this.toggle = true;
    }
    else {
      this.toggle = false;
    }
  }
  selectgoodsWay(val) {
    this.selectedgoodsWay = val;
    this.goodsWayProductsList = this.goodsWayProducts.find((value) => value.id == this.selectedgoodsWay).products;
  }
  pageChanged(pn) {
    this.PageInfo.pageIndex = pn;
    this.OnQuery();
  }
  OnQuery() {
    this.PageInfo.totalCount = this.freightTableInfo.length;
    let moneyindex = findBigSmallvalue(this.freightTableInfo, 'actualMoney');
    this.biggestmoneyindex = moneyindex.biggestindex;
    this.smallestmoneyindex = moneyindex.smallestindex;
  }
  initlineChart(list: any) {
    Highcharts.theme = {};
    var options = {
      chart: { type: 'spline' },
      title: { text: `7天订单运费金额走势` },
      xAxis: { type: 'datetime', xDateFormat: '%m-%d', categories: [] },
      yAxis: {
        title: { text: this.types.type.toUpperCase() },
        labels: { formatter: function () { return this.value + ' ' + '$'; } }
      },
      series: [{ name: '', data: [], color: '#fff' }]
    };


    let list1 = list[0];
    let list2 = list[1];

    let actualMoney: string[] = [];
    let actualMoneydate: string[] = [];

    let estimateMoney: string[] = [];
    let estimateMoneydate: string[] = [];

    for (var i = 0; i < list1.length; i++) {
      actualMoney.push(list1[i].actualMoney);
      actualMoneydate.push(list1[i].date);
    }
    for (var i = 0; i < list2.length; i++) {
      estimateMoney.push(list2[i].estimateMoney);
      estimateMoneydate.push(list2[i].date);
    }

    //折线1
    options.series[0].data = actualMoney;
    options.series[0].name = '实际运费';
    //折线2
    options.series.push({ name: '预估运费', data: [], color: '#ff001a' });
    options.series[1].data = estimateMoney;

    options.xAxis.categories = actualMoneydate;

    Highcharts.setOptions(theme.getLineChartTheme());
    Highcharts.chart('container', options);
  }
}
