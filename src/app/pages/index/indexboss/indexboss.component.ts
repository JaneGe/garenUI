import { Component, OnInit } from '@angular/core';
import * as theme from '../chart.theme';

var Highcharts = require('highcharts');
import {BossDataService} from "./bossData.service";
@Component({
  selector: 'app-indexboss',
  templateUrl: './indexboss.component.html',
  styleUrls: ['../public.scss','./indexboss.component.scss','../calendar.scss'],
  providers:[BossDataService]
})
export class IndexbossComponent implements OnInit {
  moneyData:any;
  orderData:any;
  url:string='../../../assets/country';
  public calendarData:any;

  GroupData:Array<any>;groupUpdateTime:string; bigProfit:number=-1;bigOrders:number=-1;bigMoney:number=-1;
  smProfit:number=100000;smOrders:number=100000;smMoney:number=100000;

  public ChannelData: Array<any>; PlatForms:string[]=[];Money:number[]=[];
  ebayValue:number;AmazonValue:number;SMTValue:number;WishValue:number;handValue:number;
  CdiscountValue:number;TotalValue:number;
  ebayMoney:string;AmazonMoney:string;SMTMoney:string;WishMoney:string;handMoney:string;
  CdiscountMoney:string;Character:string='boss';

  yesterdayAchievement:Array<any>;

  purchaseSummary:Array<any>;

  deliverySummary:Array<any>;pickPackage:number;alreadyDelivery:number;purchaseTotal:number;
  openPackage:number;inStorageNum:number;deliverySummaryUpdateTime:string;

  countryOrders:Array<any>;bigCountryOrder:number=-1;bigCounryMoney:number=-1;TotalOrders:number=0;
  coutryOdersupdateTime:string;
  TotalMoney:number=0;
  constructor(private bossData:BossDataService) {
    this.moneyData=this.bossData.InSevenDayMoney;
    this.orderData=this.bossData.InSevenDayOrder;
    this.calendarData = this.bossData.getCalndarData();
    this.ChannelData = this.bossData.getChannelData();
    this.yesterdayAchievement=this.bossData.yesterdayAchievement;
    this.deliverySummary=this.bossData.deliverySummary;
    this.countryOrders=this.bossData.countryOrders;
    this.purchaseSummary=this.bossData.purchaseSummary;
    this.GroupData=this.bossData.GroupData;
  }

  ngOnInit() {
    this.inityesterdaydeliverySummary();
    this.initlineChart();
    this.initCountryOrder();
    this.initChannelData();
    this.initGroup();
  }
  initGroup(){            //找出最大和最小值
    for(var i=0;i<this.GroupData.length;i++){
      var obj=this.GroupData[i];
      if(obj.profit>this.bigProfit){this.bigProfit=obj.profit}
      if(obj.orders>this.bigOrders){this.bigOrders=obj.orders}
      if(obj.money>this.bigMoney){this.bigMoney=obj.money}
      if(obj.profit<this.smProfit){this.smProfit=obj.profit}
      if(obj.orders<this.smOrders){this.smOrders=obj.orders}
      if(obj.money<this.smMoney){this.smMoney=obj.money}
      for(var j in obj){
        if(j=='updateTime'){
          this.groupUpdateTime=obj.updateTime;
        }
      }
    }
  }
  initChannelData(){
    for(var i=0;i<this.ChannelData.length;i++){
      var obj=this.ChannelData[i];
      this.PlatForms.push(obj.label);
      this.Money.push(obj.money);
      for(var j in obj){
        if(obj.label=='ebay'){this.ebayValue=obj.value;this.ebayMoney=obj.money}
        if(obj.label=='Amazon'){this.AmazonValue=obj.value;this.AmazonMoney=obj.money}
        if(obj.label=='速卖通'){this.SMTValue=obj.value;this.SMTMoney=obj.money}
        if(obj.label=='Wish'){this.WishValue=obj.value;this.WishMoney=obj.money}
        if(obj.label=='手工订单'){this.handValue=obj.value;this.handMoney=obj.money}
        if(obj.label=='Cdiscount'){this.CdiscountValue=obj.value;this.CdiscountMoney=obj.money}
      }
    }
    this.TotalValue=this.ebayValue+this.AmazonValue+this.SMTValue+this.WishValue+this.handValue
      +this.CdiscountValue;
    var ebayPercentage=(this.ebayValue/this.TotalValue*100).toFixed(1);
    var AmazonPercentage=(this.AmazonValue/this.TotalValue*100).toFixed(1);
    var SMTPercentage=(this.SMTValue/this.TotalValue*100).toFixed(1);
    var WishPercentage=(this.WishValue/this.TotalValue*100).toFixed(1);
    var handPercentage=(this.handValue/this.TotalValue*100).toFixed(1);
    var CdiscountPercentage=(this.CdiscountValue/this.TotalValue*100).toFixed(1);
    for(var i=0;i<this.ChannelData.length;i++){
      var obj=this.ChannelData[i];
      for(var j in obj) {
        if (obj.label == 'ebay') {obj.percentage = ebayPercentage;}
        if (obj.label == 'Amazon') {obj.percentage = AmazonPercentage;}
        if (obj.label == '速卖通') {obj.percentage = SMTPercentage;}
        if (obj.label == 'Wish') {obj.percentage = WishPercentage;}
        if (obj.label == '手工订单') {obj.percentage = handPercentage;}
        if (obj.label == 'Cdiscount') {obj.percentage = CdiscountPercentage;}
      }
    }
  }
  inityesterdaydeliverySummary(){
    for(let i:number=0;i<this.deliverySummary.length;i++){
      var obj=this.deliverySummary[i];
      for(var j in obj){
        if(j=='pickPackage'){this.pickPackage=obj[j];}
        if(j=='alreadyDelivery'){this.alreadyDelivery=obj[j];}
        if(j=='purchaseTotal'){this.purchaseTotal=obj[j];}
        if(j=='openPackage'){this.openPackage=obj[j];}
        if(j=='inStorageNum'){this.inStorageNum=obj[j];}
        if(j=='updateTime'){this.deliverySummaryUpdateTime=obj[j];}
      }
    }
  }
  initlineChart(){
    Highcharts.theme = {}
    var options={
      chart: {type: 'spline'},
      title: {text: '七天订单总额走势',
        style: {
          color: '#FF9900',
          fontWeight:'bold'
        }
      },
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
  initCountryOrder(){
    for(var i=0;i<this.countryOrders.length;i++){
      var obj=this.countryOrders[i];
      for(var a in obj){
        if(a=='updateTime'){this.coutryOdersupdateTime=obj[a];}
      }
    }
    for(var i=0;i<this.countryOrders.length;i++){
      var obj=this.countryOrders[i];
      for(var a in obj){
        if(a=='updateTime'){this.countryOrders.splice(i,1)}
      }
    }
    for(var i=0;i<this.countryOrders.length;i++){
      var obj=this.countryOrders[i];
      this.TotalOrders+=obj.order;
      this.TotalMoney+=obj.money;
      if(obj.money>this.bigCounryMoney){this.bigCounryMoney=obj.money}
      if(obj.order>this.bigCountryOrder){this.bigCountryOrder=obj.order}
      for(var j in obj){
      }
    }
  }
}
