import {Component, Input, OnInit} from '@angular/core';
import {findBigSmallvalue} from "../../function";

@Component({
  selector: 'app-table-pie-chart',
  templateUrl: './table-pie-chart.component.html',
  styleUrls: ['../../public.scss','./table-pie-chart.component.scss']
})
export class TablePieChartComponent implements OnInit {
  PageInfo={pageSize:2,pageIndex:1,totalCount:2};
  @Input() tableinfo=[];
  @Input() ChannelData:any=[];
  @Input() title:string="";
  @Input() TotalValue:number=0;

  Character:string='';

  Topage:number=null;
  toggle:boolean=true;
  orderData:any=[];
  biggestmoneyindex=[];
  smallestmoneyindex=[];
  constructor() { }

  toggleBar(val:any){
    if(val){
      this.toggle=true;
    }
    else {
      this.toggle=false;
    }
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
    this.PageInfo.totalCount=this.tableinfo.length;
    let moneyindex=findBigSmallvalue(this.tableinfo,'percentage');
    this.biggestmoneyindex=moneyindex.biggestindex;
    this.smallestmoneyindex=moneyindex.smallestindex;
  }
}
