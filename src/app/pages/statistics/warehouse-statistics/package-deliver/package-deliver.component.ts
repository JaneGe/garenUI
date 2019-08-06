import { Component, OnInit } from '@angular/core';
import {LogisticsdistributionService} from "../logistics-distribution/logisticsdistribution.service";
import * as theme from '../../chart.theme';
import {PackageDeliverService} from "./packageDeliver.service";
import {findBigSmallvalue} from "../../function";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
var Highcharts=require('highcharts');
@Component({
  selector: 'app-package-deliver',
  templateUrl: './package-deliver.component.html',
  styleUrls: ['../../orderStatistics/order-head/order-head.component.scss','../../public.scss','./package-deliver.component.scss'],
  providers:[LogisticsdistributionService,PackageDeliverService]
})
export class PackageDeliverComponent extends AuthorityComponent implements OnInit {
  warehouse:Array<any>=[{id:-1,text:'本地仓库'},{id:1,text:'外地仓库'}];
  logigtics:Array<any>=[{id:-1,text:'申通'},{id:1,text:'圆通'},{id:2,text:'百世汇通'},{id:3,text:'顺风'}];
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
  selectedlogigtics=-1;
  selecteddeliverTime=-1;

  clickbottom=0;
  clicktop=0;

  toggle:boolean=true;

  PageInfo={pageSize:5,pageIndex:1,totalCount:2};
  tableinfo=[];
  lineData=[];

  biggestindex=[];
  smallestindex=[];
  constructor(private logisticsdistributionService:LogisticsdistributionService,
              private packageDeliverService:PackageDeliverService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.lineData=this.packageDeliverService.lineData;
  }

  ngOnInit() {
    this.OnQuery();
    this.initlineChart();
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
    }
  }

  pageChanged(pn){
    this.PageInfo.pageIndex=pn;
    console.log(1);
    this.OnQuery();
  }
  OnQuery(){
    this.tableinfo=this.logisticsdistributionService.tableData;
    this.PageInfo.totalCount=this.tableinfo.length;
    let index=findBigSmallvalue(this.tableinfo,'num');
    this.biggestindex=index.biggestindex;
    this.smallestindex=index.smallestindex;
  }

  initlineChart(){
    Highcharts.theme = {};
    var options={
      chart: {type: 'spline'},
      title: {text: `7天包裹发货数量统计`},
      xAxis: {type:'datetime', xDateFormat: '%m-%d', categories:[]},
      yAxis: {
        title: {text: '数量'},
      },
      series: [{name: '数量', data:[], color:'#fff'}]
    };

        let num:string[]=[];
        let numdate:string[]=[];
        for(var i=0;i<this.lineData.length;i++){
          num.push(this.lineData[i].num);
          numdate.push(this.lineData[i].time);
        }
        options.series[0].data=num;
        options.series[0].name='数量';
        options.xAxis.categories=numdate;


    Highcharts.setOptions(theme.getLineChartTheme());
    Highcharts.chart('packageLinecontainer',options);
  }
}
