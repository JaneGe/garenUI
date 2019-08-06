import { Component, OnInit } from '@angular/core';
import {TabelChartService} from "../tabelChart.service";
import {findBigSmallvalue} from '../../function'

import * as theme from '../../chart.theme';
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
var Highcharts=require('highcharts');
@Component({
  selector: 'app-order-back-money',
  templateUrl: './order-back-money.component.html',
  styleUrls: ['../../public.scss','./order-back-money.component.scss']
})
export class OrderBackMoneyComponent extends AuthorityComponent implements OnInit {
  linemoneyData:any=[];
  backmoneyinfo:any=[];
  PageInfo={pageSize:2,pageIndex:1,totalCount:2};
  title="30天退款金额走势";
  types={type:'money',des:'backmoney'};

  toggle:boolean=true;
  biggestmoneyindex=[];
  smallestmoneyindex=[];
  constructor(private tabelChartService:TabelChartService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.linemoneyData=this.tabelChartService.InSevenDayMoney;
    this.backmoneyinfo=this.tabelChartService.backmoneyinfo;
  }

  ngOnInit() {
    this.OnQuery();
    this.initlineChart(this.linemoneyData,this.title);
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
    this.PageInfo.totalCount=this.backmoneyinfo.length;
    let moneyindex=findBigSmallvalue(this.backmoneyinfo,'money');
    this.biggestmoneyindex=moneyindex.biggestindex;
    this.smallestmoneyindex=moneyindex.smallestindex;
  }

  initlineChart(list:any,title:any){
    Highcharts.theme = {};
    var options={
      chart: {type: 'spline'},
      title: {text: `${title}`},
      xAxis: {type:'datetime', xDateFormat: '%m-%d', categories:[]},
      yAxis: {
        title: {text: this.types.type.toUpperCase()},
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
    Highcharts.chart('orderbackcontainer',options);
  }
}
