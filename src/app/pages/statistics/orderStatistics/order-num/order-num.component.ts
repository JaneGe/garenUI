import { Component, OnInit } from '@angular/core';
import {TabelChartService} from "../tabelChart.service";
import * as theme from '../../chart.theme';
import {findBigSmallvalue} from "../../function";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
var Highcharts=require('highcharts');
@Component({
  selector: 'app-order-num',
  templateUrl: './order-num.component.html',
  styleUrls: ['../../public.scss','./order-num.component.scss']
})
export class OrderNumComponent extends AuthorityComponent implements OnInit {
  linenumData:any=[];
  linemoneyData:any=[];
  ordernuminfo:any=[];
  numtitle="7天订单数量走势";
  moneytitle="7天订单金额走势";
  types={type:'num',des:'allnum'};

  toggle:boolean=true;
  PageInfo={pageSize:2,pageIndex:1,totalCount:2};
  biggestmoneyindex=[];
  smallestmoneyindex=[];
  constructor(private tabelChartService:TabelChartService,public activerouter: ActivatedRoute,public  router:Router
  ) {
    super(activerouter,router);
    this.linenumData=this.tabelChartService.InSevenDayNum;
    this.linemoneyData=this.tabelChartService.InSevenDayMoney;
    this.ordernuminfo=this.tabelChartService.ordernuminfo;
  }

  ngOnInit() {
    this.OnQuery();
    this.initNumChart(this.linenumData,this.numtitle);
    this.initMoneyChart(this.linemoneyData,this.moneytitle);
  }
  toggleBar(val:any){
    if(val){
      this.toggle=true;
    }
    else {
      this.toggle=false;
    }
  }
  topage(){

  }
  tolast(){

  }
  pageChanged(pn){
    console.log(pn);
    this.PageInfo.pageIndex=pn;
    this.OnQuery();
  }
  OnQuery(){
    this.PageInfo.totalCount=this.ordernuminfo.length;
    let moneyindex=findBigSmallvalue(this.ordernuminfo,'num');
    this.biggestmoneyindex=moneyindex.biggestindex;
    this.smallestmoneyindex=moneyindex.smallestindex;
  }
  initNumChart(list:any,title:any){
    Highcharts.theme = {};
    var options={
      chart: {type: 'spline'},
      title: {text: `${title}`},
      xAxis: {type:'datetime', xDateFormat: '%m-%d', categories:[]},
      yAxis: {
        title: {text: this.types.type.toUpperCase()},
      },
      series: [{name: '', data:[], color:'#fff'}]
    };
    let num:string[]=[];
    let numdate:string[]=[];
    for(var i=0;i<list.length;i++){
      num.push(list[i].num);
      numdate.push(list[i].date);
    }
    options.series[0].data=num;
    options.series[0].name='数量';
    options.xAxis.categories=numdate;
    Highcharts.setOptions(theme.getLineChartTheme());
    Highcharts.chart('orderbacknumcontainer',options);
  }
  initMoneyChart(list:any,title:any){
    Highcharts.theme = {};
    var options={
      chart: {type: 'spline'},
      title: {text: `${title}`},
      xAxis: {type:'datetime', xDateFormat: '%m-%d', categories:[]},
      yAxis: {
        title: {text:'金额'},
        labels: {formatter: function () {return this.value + ' ' +'$';}}
      },
      series: [{name: '', data:[], color:'#fff'}]
    };
    let money:string[]=[];
    let moneydate:string[]=[];
    for(var i=0;i<list.length;i++){
      money.push(list[i].money);
      moneydate.push(list[i].date);
    }
    options.series[0].data=money;
    options.series[0].name='金额';
    options.xAxis.categories=moneydate;
    Highcharts.setOptions(theme.getLineChartTheme());
    Highcharts.chart('ordermoneycontainer',options);
  }
}
