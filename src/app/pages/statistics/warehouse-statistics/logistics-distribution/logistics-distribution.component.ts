import { Component, OnInit } from '@angular/core';
import {LogisticsdistributionService} from "./logisticsdistribution.service";
import {findBigSmallvalue} from "../../function";
import {AuthorityComponent} from "app/shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-logistics-distribution',
  templateUrl: './logistics-distribution.component.html',
  styleUrls: ['../../orderStatistics/order-head/order-head.component.scss','../../public.scss','./logistics-distribution.component.scss'],
  providers:[LogisticsdistributionService]
})
export class LogisticsDistributionComponent extends AuthorityComponent implements OnInit {
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
  channelData=[];
  Character='';
  TotalValue:number=0;
  CircleTitle='总数量';

  biggestindex=[];
  smallestindex=[];
  constructor(private logisticsdistributionService:LogisticsdistributionService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.tableinfo=this.logisticsdistributionService.tableData;
    this.channelData=this.logisticsdistributionService.getTraceNumChannelData();
    this.tableinfo.forEach(value => {
      this.TotalValue+=value.num;
    })
  }

  ngOnInit() {
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
    }
  }

  pageChanged(pn){
    this.PageInfo.pageIndex=pn;
    console.log(1);
    this.OnQuery();
  }
  OnQuery(){
    this.PageInfo.totalCount=this.tableinfo.length;
    let index=findBigSmallvalue(this.tableinfo,'num');
    this.biggestindex=index.biggestindex;
    this.smallestindex=index.smallestindex;
  }
}
