import { Component, OnInit } from '@angular/core';
import {TablePieChartService} from "../table-pie-chart/tablePieChart.service";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-tracenum',
  templateUrl: './order-tracenum.component.html',
  styleUrls: ['../../public.scss','../order-head/order-head.component.scss','./order-tracenum.component.scss']
})
export class OrderTracenumComponent extends AuthorityComponent implements OnInit {
  deliverTime: Array<any> = [{ id: -1, text: '全部' }, { id:1, text: '今天' }, { id: 2, text: '7天内' }, { id: 3, text: '30天内' }, { id: 4, text: '自定义' }];
  selecteddeliverTime=-1;
  timedeliverStart=new Date();
  timedeliverEnd=new Date();
  logisticsWay:Array<any> = [{ id: -1, text: '全部' }, { id:1, text: '顺风' }, { id: 2, text: '申通' }, { id: 3, text: '京东' }, { id: 4, text: '亚马逊' }];
  selectedlogisticsWay=-1;
  timeSearchStart=new Date();
  timeSearchEnd=new Date();
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };


  tableinfo=[];
  ChannelData:any=[];
  title:string="跟踪号上网时间分布";
  TotalValue:number=0;
  constructor(private tablePieChartService:TablePieChartService,public activerouter: ActivatedRoute,public  router:Router
  ) {
    super(activerouter,router);
    this.ChannelData=this.tablePieChartService.getTraceNumChannelData();
    this.tableinfo=this.tablePieChartService.traceNumTableData;
  }

  ngOnInit() {
    this.tableinfo.forEach(value => {
      this.TotalValue+=value.num;
    })
  }

}
