import { Component, OnInit } from '@angular/core';
import {BossDataService} from "../indexboss/bossData.service";
import {NoticeService} from "../../../shared/services/notice.service";
var Highcharts = require('highcharts');
import * as theme from '../chart.theme';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NoticeModalComponent} from "../modals/noticeModal/noticeModal.component";
@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['../public.scss','./finance.component.scss'],
  providers:[BossDataService,NoticeService]
})
export class FinanceComponent implements OnInit {
  // any 任何数据类型
  yesterdayAchievement:Array<any>;
  noticeList:any;
  purchaseSummary:Array<any>;
  moneyData:any;
  orderData:any;
  constructor(private bossData:BossDataService,
              private noticeService: NoticeService,
              private modalService:NgbModal) { }

  ngOnInit() {
    this.yesterdayAchievement=this.bossData.yesterdayAchievement;
    this.purchaseSummary=this.bossData.purchaseSummary;
    this.moneyData=this.bossData.InSevenDayMoney;
    this.orderData=this.bossData.InSevenDayOrder;
    this.initlineChart();
    this.loadData();
  }
  loadData() {
    this.noticeService.getAnnouncementPageList(1, 15, 'Show').subscribe(data => {
      this.noticeList = data.content.items;
    });
  }
  initlineChart(){
    Highcharts.theme = {}
    var options={
      chart: {type: 'spline'},
      title: {text: '七天订单总额走势',
        style: {
          color: '#FF9900',
          fontWeight:'bold'
        }},
      xAxis: {type:'datetime', xDateFormat: '%m-%d', categories:[]},
      yAxis: {
        title: {text: 'Money'},
        labels: {formatter: function () {return this.value + ' ' +'$';}}
      },
      series: [{name:'Money', data:[], color:'#fff'}]
    };
    var options1={
      chart: {type: 'spline'},
      title: {text: '七天订单总量走势',
        style: {
          color: '#a8a8ff',
          fontWeight:'bold'
        }},
      xAxis: {type:'datetime', xDateFormat: '%m-%d', categories:[]},
      yAxis: {
        title: {text: 'Order'},
        labels: {formatter: function () {return this.value + ' ' +'单';}}
      },
      series: [{name:'Order', data:[], color:'#fff'}]
    };
    //初始化option,金额走势数据
    let money:string[]=[];
    let date:string[]=[];
    for(var i=0;i<this.moneyData.length;i++){
      money.push(this.moneyData[i].money);
      date.push(this.moneyData[i].date);
    }
    options.series[0].data=money;
    options.xAxis.categories=date;
    //初始化option,订单数量走势数据
    let order:string[]=[];
    for(var i=0;i<this.orderData.length;i++){
      order.push(this.orderData[i].order);
    }
    options1.series[0].data=order;
    options1.xAxis.categories=date;
    Highcharts.setOptions(theme.getLineChartTheme());
    Highcharts.chart('container',options);
    Highcharts.chart('container1',options1);
  }
  openNoticeModal(i) {
    this.noticeService.getAnnouncementPageDetail(i).subscribe(data => {
      const activeModal = this.modalService.open(NoticeModalComponent,{ size: 'lg', backdrop: 'static' });
        activeModal.componentInstance.noticeInfo = data.content;
        activeModal.result.then((result) => {
        }, (reason) => {
          console.info(`Dismissed ${reason}`);
        });
      },
      error => {

      });
  }
}
