import { Component, OnInit } from '@angular/core';
import {TabelChartService} from "../tabelChart.service";
import * as theme from '../../chart.theme';
import {findBigSmallvalue} from "../../function";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
var Highcharts=require('highcharts');
@Component({
  selector: 'app-order-back-num',
  templateUrl: './order-back-num.component.html',
  styleUrls: ['../../public.scss','./order-back-num.component.scss']
})
export class OrderBackNumComponent extends AuthorityComponent  implements OnInit {
  linenumData:any=[];
  ordernuminfo:any=[];
  title="7天退款单量走势";
  types={type:'num',des:'backnum'};
  toggle:boolean=true;
  PageInfo={pageSize:2,pageIndex:1,totalCount:2};
  biggestmoneyindex=[];
  smallestmoneyindex=[];
  constructor(private tabelChartService:TabelChartService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.linenumData=this.tabelChartService.InSevenDayNum;
    this.ordernuminfo=this.tabelChartService.ordernuminfo;
  }
  ngOnInit() {
    this.OnQuery();
    this.initlineChart(this.linenumData,this.title);
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
  initlineChart(list:any,title:any){
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

}
