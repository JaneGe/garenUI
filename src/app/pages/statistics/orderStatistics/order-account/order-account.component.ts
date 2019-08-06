import { Component, OnInit } from '@angular/core';
import {ChannelDataService} from "../ChannelData.service";
import {findBigSmallvalue} from "../../function";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../../shared/component/authority.component";

@Component({
  selector: 'app-order-account',
  templateUrl: './order-account.component.html',
  styleUrls: ['../../public.scss','../order-head/order-head.component.scss','./order-account.component.scss']
})
export class OrderAccountComponent extends AuthorityComponent implements OnInit {
  orderTime: Array<any> = [{ id:1, text: '昨天' }, { id: 2, text: '7天内' }, { id: 3, text: '15天内' }, { id: 4, text: '30天内' }, { id: 5, text: '自定义' }];
  selectedordertimesearch: number = 1;
  timeSearchStart=new Date();
  timeSearchEnd=new Date();
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  ChannelData: Array<any>=[];
  Character:string='';
  PageInfo={pageSize:10,pageIndex:1,totalCount:2};
  info:Array<any>=[];
  biggestmoneyindex=[];
  smallestmoneyindex=[];
  constructor(private channelDataService:ChannelDataService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.ChannelData=channelDataService.getAccountChannelData();
  }

  ngOnInit() {
    this.OnQuery();
  }
  topage(){

  }
  tolast(){

  }
  pageChanged(pn){
    this.PageInfo.pageIndex=pn;
    this.OnQuery();
  }
  OnQuery(){
    this.info=[];
    this.ChannelData.forEach(value=>{
      this.info.push({country:value.label,value:value.value,percentage:value.percentage});
    });
    this.PageInfo.totalCount=this.info.length;
    let moneyindex=findBigSmallvalue(this.info,'percentage');
    this.biggestmoneyindex=moneyindex.biggestindex;
    this.smallestmoneyindex=moneyindex.smallestindex;
  }
}
