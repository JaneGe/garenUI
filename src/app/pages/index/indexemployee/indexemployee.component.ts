import { Component, OnInit } from '@angular/core';

import * as theme from '../chart.theme'
import { EmployeeData } from "./employeeData";
import { BossDataService } from "../indexboss/bossData.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NoticeModalComponent } from '../modals/noticeModal/noticeModal.component';
import { NoticeService } from "../../../shared/services/notice.service";

var Highcharts = require('highcharts');

@Component({
  selector: 'app-indexemployee',
  templateUrl: './indexemployee.component.html',
  styleUrls: ['../todo.scss', '../public.scss', '../calendar.scss','./indexemployee.component.scss'],
  providers: [EmployeeData, BossDataService,NoticeService]
})
export class IndexemployeeComponent implements OnInit {
  public calendarConfiguration: any;

  ChannelData: Array<any>; TargetValue: number; Character: string = 'employee';
  tableData: { target: number, finished: number, profit: number, finishedpercentage: number } = { target: 0, finished: 0, profit: 0, finishedpercentage: 0 };
  TableTitle: string[] = ['目标金额', '当前销售金额', '当前预估利润汇总', '完成百分比'];

  moneyData: any;
  orderData: any;
  todolist: Array<any>;
  noticeList:any;
  constructor(private employeeData: EmployeeData,
    private modalService: NgbModal,
    private noticeService: NoticeService) {
    this.moneyData = this.employeeData.InSevenDayMoney;
    this.orderData = this.employeeData.InSevenDayOrder;
    this.calendarConfiguration = this.employeeData.getData();
    this.ChannelData = this.employeeData.getChannelData();
    this.todolist = this.employeeData.Todo;
  }
  ngOnInit() {
    this.initLineChart();
    this.initChannelData();
    this.loadData();
  }
  initChannelData() {
    let unfinished: number = 0;
    let finished: number = 0;
    let profit: number = 0;
    var finishedpercentage;
    var unfinishedpercentage;
    var unfinishedColor;
    var finishedColor;
    for (var i = 0; i < this.ChannelData.length; i++) {
      var obj = this.ChannelData[i];
      for (var j in obj) {
        if (j == 'target') { this.TargetValue = obj.target }
        if (j == 'label' && obj[j] == 'finished') { finished = obj.value; profit = obj.profit; }
      }
    }
    for (var i = 0; i < this.ChannelData.length; i++) {
      var obj = this.ChannelData[i];
      for (var j in obj) {
        if (j == 'label' && obj[j] == 'unfinished') { obj.value = this.TargetValue - finished }
      }
    }
    unfinished = this.TargetValue - finished;
    finishedpercentage = (finished / this.TargetValue * 100).toFixed(2);
    unfinishedpercentage = (unfinished / this.TargetValue * 100).toFixed(2);
    for (var i = 0; i < this.ChannelData.length; i++) {
      var obj = this.ChannelData[i];
      for (var j in obj) {
        if (j == 'profit') { obj.percentage = finishedpercentage; obj.label = '已完成' }
        if (obj.label == 'unfinished') { obj.percentage = unfinishedpercentage; obj.label = '未完成' }
      }
    }
    for (var i = 0; i < this.ChannelData.length; i++) {
      var obj = this.ChannelData[i];
      for (var j in obj) {
        if (j == 'target') { this.ChannelData.splice(i, 1) };
      }
    }
    this.tableData.target = this.TargetValue;
    this.tableData.finished = finished;
    this.tableData.profit = profit;
    this.tableData.finishedpercentage = finishedpercentage;
  }
  initLineChart() {
    Highcharts.theme = {};
    var options = {
      chart: { type: 'spline' },
      title: { text: '七天订单金额走势' ,
        style: {
          color: '#FF9900',
          fontWeight:'bold'
        }},
      xAxis: { type: 'datetime', xDateFormat: '%m-%d', categories: [] },
      yAxis: {
        title: { text: 'Money'},
        labels: { formatter: function () { return this.value + ' ' + '$'; } }
      },
      series: [{ name: 'Money', data: [], color: '#fff' }]
    };
    var options1 = {
      chart: { type: 'spline' },
      title: { text: '七天订单数量走势',
        style: {
        color: '#a8a8ff',
        fontWeight:'bold'
       }
      },
      xAxis: { type: 'datetime', xDateFormat: '%m-%d', categories: [] },
      yAxis: {
        title: { text: 'Order' },
        labels: { formatter: function () { return this.value + ' ' + '单'; } }
      },
      series: [{ name: 'Order', data: [], color: '#fff' }]
    };
    //初始化option,金额走势数据
    let money: string[] = [];
    let date: string[] = [];
    for (var i = 0; i < this.moneyData.length; i++) {
      money.push(this.moneyData[i].money);
      date.push(this.moneyData[i].date);
    }
    options.series[0].data = money;
    options.xAxis.categories = date;
    //初始化option,订单数量走势数据
    let order: string[] = [];
    for (var i = 0; i < this.orderData.length; i++) {
      order.push(this.orderData[i].order);
    }
    options1.series[0].data = order;
    options1.xAxis.categories = date;
    Highcharts.setOptions(theme.getLineChartTheme());
    Highcharts.chart('container', options);
    Highcharts.chart('container1', options1);
  }
  delete(target: any) {
    var li = target.parentNode;
    li.parentNode.removeChild(li);
  }
  loadData() {
    this.noticeService.getAnnouncementPageList(1, 15, 'Show').subscribe(data => {
      this.noticeList = data.content.items;
      // console.log(this.noticeList);
    });
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
