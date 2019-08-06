import { Component, OnInit } from '@angular/core';
import {PackageDeliverService} from "../../package-deliver/packageDeliver.service";
import * as theme from '../../../chart.theme';
import {findBigSmallvalue} from "../../../function";
import {AuthorityComponent} from "../../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
var Highcharts=require('highcharts');
@Component({
  selector: 'app-unpackage-statistics',
  templateUrl: './unpackage-statistics.component.html',
  styleUrls: ['../../../orderStatistics/order-head/order-head.component.scss','../../../public.scss','./unpackage-statistics.component.scss'],
  providers:[PackageDeliverService]
})
export class UnpackageStatisticsComponent extends AuthorityComponent implements OnInit {
  warehouse:Array<any>=[{id:-1,text:'本地仓库'},{id:1,text:'外地仓库'}];
  deliverTime:Array<any>=[{id:-1,text:'昨天'},{id:1,text:'3天内'},{id:2,text:'7天内'},{id:3,text:'15天内'},{id:4,text:'自定义'}];
  people:Array<any>=[{id:-1,text:'全部'},{id:0,text:'张三'},{id:1,text:'李四'},{id:2,text:'王武'},{id:3,text:'赵六'}];

  timeSearchStart=new Date();
  timeSearchEnd=new Date();
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  selectedwarehouse=-1;
  selectedpeople=-1;
  selecteddeliverTime=-1;

  clickbottom=0;
  clicktop=0;

  toggle:boolean=true;

  PageInfo={pageSize:5,pageIndex:1,totalCount:2};
  tableinfo=[];
  lineData=[];
  biggestindex=[];
  smallestindex=[];
  constructor(private packageDeliverService:PackageDeliverService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.lineData=this.packageDeliverService.lineData;
    this.tableinfo=this.packageDeliverService.tableData;
  }

  ngOnInit() {
    this.initColumnarChart(this.tableinfo[0].name);
    this.OnQuery();
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
  //切换图表表格
  toggleBar(val:any){
    if(val){
      this.toggle=true;
    }
    else {
      this.toggle=false;
      if(this.selectedpeople==-1){
        this.selectedpeople=0;
      }
    }
  }
  peopleSelect(val) {
    this.selectedpeople = val;
    if (val == -1) {
      this.toggleBar(1);
    }
  }
    pageChanged(pn){
    this.PageInfo.pageIndex=pn;
    console.log(1);
    this.OnQuery();
  }
  OnQuery(){
    this.tableinfo=this.packageDeliverService.packageData;
    this.PageInfo.totalCount=this.tableinfo.length;
    let index=findBigSmallvalue(this.tableinfo,'num');
    this.biggestindex=index.biggestindex;
    this.smallestindex=index.smallestindex;
  }
  initColumnarChart(name:string){
    let mytheme=theme.getLineChartTheme();
    var options={
      chart: {type: 'column'},
      title: {text: `${name}的拆包绩效统计`},
      xAxis: {categories:[]},
      yAxis: {
        title: {text: 'Value'},
      },
      plotOptions: {
        series: {
          pointPadding: 0.4
        }
      },
      series: [
        {name: '拆包数量', data:[], color:'#7CB5EC'},
      ]
    };

    let date=[];
    let singleList=[];
    for(let item of this.tableinfo){
      date.push(item.time);
      singleList.push(item.num);
    }
    options.xAxis.categories=date;
    options.series[0].data=singleList;

    mytheme.chart.height=500;
    mytheme.legend.enabled=true;
    Highcharts.setOptions(mytheme);
    Highcharts.chart('unpackageColumncontainer',options);
  }
}
