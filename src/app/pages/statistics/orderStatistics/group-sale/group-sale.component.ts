import { Component, OnInit } from '@angular/core';
import {GroupService} from "./group.service";

import * as theme from '../../chart.theme';
import {findBigSmallvalue} from '../../function'
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
var Highcharts=require('highcharts');
@Component({
  selector: 'app-group-sale',
  templateUrl: './group-sale.component.html',
  styleUrls: ['../../public.scss','../order-head/order-head.component.scss','./group-sale.component.scss'],
  providers:[GroupService]
})
export class GroupSaleComponent extends AuthorityComponent implements OnInit {
  storage:Array<any>=[{id:-1,text:'海外仓库'},{id:1,text:'本地仓库'}];
  selectedstorage=-1;
  groups:Array<any>=[{id:-1,text:'group1'},{id:1,text:'group2'},{id:2,text:'group3'}];
  selectedgroup=-1;
  orderTime: Array<any> = [{ id: -1, text: '昨天' },{ id: 0, text: '7天内' }, { id:1, text: '15天内' }, { id: 2, text: '30天内' }, { id: 3, text: '自定义' }];
  selectedordertime=-1;

  PageInfo={pageSize:5,pageIndex:1,totalCount:2};
  tableData=[];

  toggle:boolean=true;

  timeSearchStart=new Date();
  timeSearchEnd=new Date();
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };
  biggestmoneyindex=[];
  smallestmoneyindex=[];
  biggestnumindex=[];
  smallestnumindex=[];
  biggestbackmoneyindex=[];
  smallestbackmoneyindex=[];
  constructor(private groupService:GroupService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }

  ngOnInit() {
    this.OnQuery();
    this.initColumnarChart();
  }
  toggleBar(val:any){
    if(val){
      this.toggle=true;
    }
    else {
      this.toggle=false;
    }
  }
  pageChanged(pn){
    console.log(pn);
    this.PageInfo.pageIndex=pn;
    this.OnQuery();
  }
  OnQuery(){
  this.tableData=this.groupService.tableData;
  this.PageInfo.totalCount=this.tableData.length;
  let moneyindex=findBigSmallvalue(this.tableData,'money');
  let numindex=findBigSmallvalue(this.tableData,'num');
  let backmoneyindex=findBigSmallvalue(this.tableData,'backmoney');
  this.biggestmoneyindex=moneyindex.biggestindex;
  this.smallestmoneyindex=moneyindex.smallestindex;


  this.biggestnumindex=numindex.biggestindex;
  this.smallestnumindex=numindex.smallestindex;

  this.biggestbackmoneyindex=backmoneyindex.biggestindex;
  this.smallestbackmoneyindex=backmoneyindex.smallestindex;

  }
  selectorder(val:any){
    this.selectedordertime=val;
  }
  initColumnarChart(){
    let mytheme=theme.getLineChartTheme();
    var options={
      chart: {type: 'column'},
      title: {text: `小组销售情况`},
      xAxis: {categories:[]},
      yAxis: {
        title: {text: 'Value'},
      },
      series: [
        {name: '金额', data:[], color:'#E4D354'},
        {name: '单量', data:[], color:'#7CB5EC'},
        {name: '退款金额', data:[], color:'#434348'},
        ],
    };

    let groupnames=[];
    let moneyList=[];
    let numList=[];
    let backmoneyList=[];
    for(let item of this.tableData){
      groupnames.push(item.group);
      moneyList.push(item.money);
      numList.push(item.num);
      backmoneyList.push(item.backmoney);
    }
    options.xAxis.categories=groupnames;
    options.series[0].data=moneyList;
    options.series[1].data=numList;
    options.series[2].data=backmoneyList;

    mytheme.chart.height=500;
    mytheme.legend.enabled=true;
    Highcharts.setOptions(mytheme);
    Highcharts.chart('container',options);
  }
}
