import { Component, OnInit } from '@angular/core';
import {ChannelDataService} from "../ChannelData.service";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-country-money',
  templateUrl: './order-country-money.component.html',
  styleUrls: ['../../public.scss','../order-head/order-head.component.scss','./order-country-money.component.scss']
})
export class OrderCountryMoneyComponent extends AuthorityComponent implements OnInit {
  orderTime: Array<any> = [{ id: -1, text: '昨天' },{ id: 1, text: '7天内' }, { id:2, text: '15天内' }, { id: 3, text: '30天内' }, { id: 4, text: '自定义' }];
  selectedordertimesearch: number = -1;
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
  PageInfo={pageSize:1,pageIndex:1,totalCount:2};
  info:Array<any>=[];
  TotalValue:number=0;
  valueSort:boolean=true;
  CircleTitle:string='总金额';
  constructor(private channelDataService:ChannelDataService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.ChannelData=channelDataService.getCountryChannelData();
  }

  ngOnInit() {
    this.getChannelTableData();
  }
  getChannelTableData(){
    this.ChannelData.forEach(value=>{
      this.info.push({country:value.label,value:value.value,percentage:value.percentage});
      this.TotalValue+=value.value;
    })
  }
}
