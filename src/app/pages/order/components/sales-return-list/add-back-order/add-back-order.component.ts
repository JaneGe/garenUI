import { Component, OnInit } from '@angular/core';
import {AI, BI, salesBack, Sback, TS} from "../table.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-back-order',
  templateUrl: './add-back-order.component.html',
  styleUrls: ['./add-back-order.component.scss'],
})
export class AddBackOrderComponent implements OnInit {
  backOrderExample:Sback;
  total:number=0;
  SKUtotal:number=0;
  pageSize:number=1;
  pageNumber:number=1;
  modalHeader:string='';
  backType=[{id:0,text:'邮局退包'},{id:1,text:'买家退货'}];
  selectedBackType=0;
  recordType=[{id:0,text:'订单编号'},{id:1,text:'货运单号'}];
  selectedRecordType=0;
  constructor(private activeModal:NgbActiveModal) { }
  ngOnInit() {
    this.loadData();
    this.backOrderExample.Num.forEach((value)=>this.total+=value);
    this.SKUtotal=this.backOrderExample.sku.length;
  }
  pageChanged(N:any){
    this.pageNumber=N;
    this.loadData();
  }
  close(){
    this.activeModal.close();
  }
  loadData(PN:number=1){
    this.backOrderExample=new Sback();
    var accoutInfo:AI=new AI();
    var buyerInfo:BI=new BI();
    var times:TS=new TS();
    this.backOrderExample.orderNum='asdfasdfasdfdsag';
    accoutInfo.platform='天猫';
    accoutInfo.accout='测试';
    this.backOrderExample.accoutInfo=accoutInfo;
    buyerInfo.country='China';
    buyerInfo.name='tester';
    this.backOrderExample.buyerInfo=buyerInfo;
    this.backOrderExample.money='10000';
    var temp=new Date();
    temp.setDate(temp.getDate()-5);
    times.deliverTime=temp.toLocaleString();
    times.saleReturnTime=(new Date()).toLocaleString();
    this.backOrderExample.times=times;
    this.backOrderExample.logistics='顺风';
    this.backOrderExample.reason='买家退货';
    this.backOrderExample.handleStatus='待处理';

    this.backOrderExample.sku=['AAA','BBB','CCC','DDD','EEE'];
    this.backOrderExample.pic=['http://p6.qhmsg.com/t01f19a83edd601f295.jpg',
    'http://img3.100bt.com/upload/ttq/20121202/1354443812118.png',
    'http://wenwen.soso.com/p/20090516/20090516064335-462569542.jpg',
    'http://p6.qhmsg.com/t01f19a83edd601f295.jpg',
    'http://img3.100bt.com/upload/ttq/20121202/1354443812118.png',
    ];
    this.backOrderExample.Num=[1,2,3,4,5];
    this.backOrderExample.ChineseName=['锤子','剪刀','石头','布','叉子'];
    this.backOrderExample.skuID=[1,2,3,4,5];
  }
  OnSubmit(val:any){
    this.activeModal.close(val);
  }
}
