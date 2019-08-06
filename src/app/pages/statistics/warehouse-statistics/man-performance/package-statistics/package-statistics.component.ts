import { Component, OnInit } from '@angular/core';
import {PackageDeliverService} from "../../package-deliver/packageDeliver.service";
import * as theme from '../../../chart.theme';
import {findBigSmallvalue} from "../../../function";
import {AuthorityComponent} from "../../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
var Highcharts=require('highcharts');
@Component({
  selector: 'app-package-statistics',
  templateUrl: './package-statistics.component.html',
  styleUrls: ['../../../orderStatistics/order-head/order-head.component.scss','../../../public.scss','./package-statistics.component.scss'],
  providers:[PackageDeliverService]
})
export class PackageStatisticsComponent extends AuthorityComponent implements OnInit {
  warehouse:Array<any>=[{id:-1,text:'本地仓库'},{id:1,text:'外地仓库'}];
  people:Array<any>=[{id:-1,text:'全部'},{id:0,text:'张三'},{id:1,text:'李四'},{id:2,text:'王武'},{id:3,text:'赵六'}];
  deliverTime:Array<any>=[{id:-1,text:'昨天'},{id:1,text:'3天内'},{id:2,text:'7天内'},{id:3,text:'15天内'},{id:4,text:'自定义'}];

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

  biggestSingleindex=[];
  smallestSingleindex=[];

  biggestSinglemoreindex=[];
  smallestSinglemoreindex=[];

  biggestMoreindex=[];
  smallestMoreindex=[];

  biggestSpecialindex=[];
  smallestSpecialindex=[];
  constructor(private packageDeliverService:PackageDeliverService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.lineData=this.packageDeliverService.lineData;
    this.tableinfo=this.packageDeliverService.packageData;
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

    let singleindex=findBigSmallvalue(this.tableinfo,'single');
    this.biggestSingleindex=singleindex.biggestindex;
    this.smallestSingleindex=singleindex.smallestindex;

    let singlemoreindex=findBigSmallvalue(this.tableinfo,'singlemore');
    this.biggestSinglemoreindex=singlemoreindex.biggestindex;
    this.smallestSinglemoreindex=singlemoreindex.smallestindex;

    let moreindex=findBigSmallvalue(this.tableinfo,'more');
    this.biggestMoreindex=moreindex.biggestindex;
    this.smallestMoreindex=moreindex.smallestindex;

    let specialindex=findBigSmallvalue(this.tableinfo,'special');
    this.biggestSpecialindex=specialindex.biggestindex;
    this.smallestSpecialindex=specialindex.smallestindex;
  }
  peopleSelect(val){
    this.selectedpeople=val;
    if(val==-1){
     this.toggleBar(1);
    }
  }

  initColumnarChart(name:string){
    let mytheme=theme.getLineChartTheme();
    var options={
      chart: {type: 'column'},
      title: {text: `${name}的包装绩效统计`},
      xAxis: {categories:[]},
      yAxis: {
        title: {text: 'Value'},
      },
      series: [
        {name: '单品订单', data:[], color:'#E4D354'},
        {name: '单品多订单量', data:[], color:'#7CB5EC'},
        {name: '多品订单量', data:[], color:'#434348'},
        {name: '特殊订单', data:[], color:'#7A3591'},
      ],
    };

    let date=[];
    let singleList=[];
    let singlemoreList=[];
    let moreList=[];
    let specialList=[];
    for(let item of this.tableinfo){
      date.push(item.time);
      singleList.push(item.single);
      singlemoreList.push(item.singlemore);
      moreList.push(item.more);
      specialList.push(item.special);
    }
    options.xAxis.categories=date;
    options.series[0].data=singleList;
    options.series[1].data=singlemoreList;
    options.series[2].data=moreList;
    options.series[3].data=specialList;

    mytheme.chart.height=500;
    mytheme.legend.enabled=true;
    Highcharts.setOptions(mytheme);
    Highcharts.chart('packageLinecontainer',options);
  }
}
