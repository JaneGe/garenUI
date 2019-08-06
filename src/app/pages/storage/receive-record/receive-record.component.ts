import { Component, OnInit } from '@angular/core';
import { ReceiveService } from "./receive.service";
import * as publicFunction from '../../../shared/publicFunction/publicFunction';
import * as JQuery from "jquery";
import { ReceiveRecordModel } from "../../../shared/models/warehouses/warehouse-receiverecord-model";
import {RootComponent} from "../../../shared/component/root.component";
import {AuthorityComponent} from "../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
declare let $:any;
@Component({
  selector: 'app-receive-record',
  templateUrl: './receive-record.component.html',
  styleUrls: ['../public.scss', './receive-record.component.scss'],
  providers: [ReceiveService]
})
export class ReceiveRecordComponent extends AuthorityComponent implements OnInit {
  warehose = [];
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  searchParam: ReceiveRecordModel;
  record: Array<any> = [];
  operators: string[] = [];
  storeSearchKey: string = '';
  storeUserSet:string='';
  selectName: string = '全部';
  num: number = 0;
  tracenumber: string = '';
  purchasenumer: string = '';
  confirmTraceNum: string = '';
  issearchToggle:number=1;
  weight:number;
  receiveWay=[{id:1,text:'跟踪号'},{id:2,text:'下单号'}];
  searchType=[{id:1,text:'跟踪号'},{id:2,text:'下单号'},{id:3,text:'1688订单号'}];
  daysort=[{id:1,text:'今天'},{id:2,text:'昨天'},{id:3,text:'7天内'},{id:4,text:'30天内'},{id:5,text:'自定义'}];
  selecteddaysort:any;
  isTraceNum:boolean=true;
  selectedReceiveWayId=1;
  timeSearchStart: any = new Date();
  timeSearchEnd: any = new Date();
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };
  constructor(private ReceiveService: ReceiveService,public activerouter: ActivatedRoute,public  router:Router
  ) {
    super(activerouter,router);
    this.record = this.ReceiveService.record;
  }
  ngOnInit() {
    this.searchParam = new ReceiveRecordModel();
    this.searchParam.wareName = '全部';
    this.searchParam.searchText = '';
    this.searchParam.pageIndex = 0;
    this.searchParam.pageSize = 10;
    this.searchParam.SearchType= 1;
    this.searchParam.OrderTimeSpan=1;
    this.ReceiveService.GetStorageData().subscribe(data => {
      this.warehose = data.content;
      console.log(this.warehose);
      if (data.content.length > 0) {
        this.searchParam.wareName = data.content[0].name;
        this.searchParam.wareId = data.content[0].warehouseId;
      }
      this.loadData();
    });
    this.getOperator();
  }

  onValueChanged($event) {
    console.log($event);
  }
  receiveWayChange(val:any){
      this.selectedReceiveWayId=val;
      if(val==1){
        this.isTraceNum=true;
      }else{
        console.log(val);
        this.isTraceNum=false;
      }
  }

  CheckIsNum(target:any){
    var value=Number(target.value);
    if(target.value<=0||isNaN(value)){
      target.value='';
      return;
    }
  }

  QueryForDate(){
    this.searchParam.BeginTime=this.timeSearchStart;
    this.searchParam.EndTime=this.timeSearchEnd;
    this.loadData();
  }
  reverseID(list: any) {
    let pList: any = list;
    let newList: string[] = [];
    let length = list.length;
    var findbig = function (temp: any) {
      var bigid = 0;
      var bigindex = 0;
      temp.forEach((value, index, arr) => {
        if (value.id > bigid) { bigid = value.id; bigindex = index; }
      });
      newList.push(temp[bigindex]);
      temp.splice(bigindex, 1);
      pList = temp;
    };
    for (var i = 0; i < length; i++) {
      findbig(pList);
    }
    return newList;
  }
  traceNumValue:any='';
  add() {
    if (this.isTraceNum) {
      this.traceNumValue=this.tracenumber;
    }
    else {
      this.traceNumValue=this.purchasenumer;
    }
    if(this.traceNumValue==''){
      this.error("扫描失败!");
      return;
    }

    let id: number = 0;
    for (var i = 0; i < this.record.length; i++) {
      var Obj = this.record[i];
      if (Obj.id > id) { id = Obj.id }
    }
    $('#weight')[0].focus();
  }
  recordWeight(weight:any){
    if(weight==null)
    {
      this.error('请输入重量！');
      return;
    }

    weight=weight.replace(/(^\s*)|(\s*$)/g, "");
    this.traceNumValue=this.traceNumValue.replace(/(^\s*)|(\s*$)/g, "");

    let reg=/^\d+(\.\d+)?$/;
    if(!reg.test(weight)){
      this.error('重量格式不对！');
      return;
    }
    else{
      if(this.traceNumValue==''){
        this.error('请确认扫描跟踪号是否有异常!');
        return;
      }
      // alert(this.traceNumValue);
      const param = {
        TraceNum: this.traceNumValue,
        IsTraceNum:this.isTraceNum,
        PurchaseNumber:this.traceNumValue,
        WarehousesId: this.searchParam.wareId,
        WarehousesName: this.searchParam.wareName,
        weight: weight,
        PageIndex: this.searchParam.pageIndex,
        PageSize: this.searchParam.pageSize
      };
      this.ReceiveService.AddReceiveRecord(param).subscribe(data => {
        this.loadData();
        if(this.isTraceNum)$('#tracenum')[0].focus();
        else $('#purchasenum')[0].focus();
        this.tracenumber = '';
        this.purchasenumer = '';
        this.weight = null;
      },this.handleError);
    }
  }
  addClass1(target: any, type: string, item: any) {
    this.num = 0;
    publicFunction.toggleSingleClass(target);
    switch (type) {
      case "warehouse":
        this.searchParam.wareName = item.name;
        this.searchParam.wareId = item.warehouseId;
        this.loadData();
        break;
      case 'searchType':
      this.searchParam.SearchType=item.id;
        break;
      case 'daysort':
        this.selecteddaysort=item.id;
        this.searchParam.OrderTimeSpan=item.id;
        if(item.id==5)return;
        this.loadData();
        break;
    }

  }
  getOperator() {
    let temp: string[] = [];
    for (var i = 0; i < this.record.length; i++) {
      var obj;
      obj = this.record[i];
      temp.push(this.record[i].operator);
    }
    for (var i = 0; i < temp.length; i++) {
      if (this.operators.indexOf(temp[i]) == -1) { this.operators.push(temp[i]) }
    }
  }
  pageChanged(pN: number): void {
    this.loadData(pN);
  }
  loadData(pageNumber: number = 1) {
    this.searchParam.pageSize = this.PageInfo.pageSize;
    this.searchParam.pageIndex = pageNumber - 1;
    this.searchParam.SearchToggle = this.issearchToggle;
    this.searchParam.searchText = this.storeSearchKey;
    this.ReceiveService.GetReceiveRecordQuery(this.searchParam).subscribe(data => {
      this.record = data.content.items;
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
      console.log(this.record);
    });
  }
  // searchToggle(){
    // if(this.issearchToggle){
    //   $('#search').removeClass('myslideUp').addClass('myslideIn');
    //   this.issearchToggle=!this.issearchToggle;
    // }
    // else{
    //   $('#search').removeClass('myslideIn').addClass('myslideUp');
    //   setTimeout(()=>{
    //     this.issearchToggle=!this.issearchToggle;
    //   },500);
    // }
  // }
  confirmReceive(confirmTraceNum:any){
    const param = {
      TraceNum: confirmTraceNum,
      WarehousesId: this.searchParam.wareId,
      WarehousesName: this.searchParam.wareName,
      PageIndex: this.searchParam.pageIndex,
      PageSize: this.searchParam.pageSize
    };
    if(confirmTraceNum==''){
      this.error('请输入跟踪号');
    }
    else if(confirmTraceNum!='123'){
      this.confirm('未找到此跟踪号，是否确定收货？',
        ()=>{
          this.ReceiveService.AddReceiveRecord(param).subscribe(data => {
            this.loadData();
            $('#tracenum')[0].focus();
            this.tracenumber = '';
            this.confirmTraceNum = '';
            this.weight = null;
          });
        },()=>{
        this.confirmTraceNum='';
        });
    }
    else{
      this.ReceiveService.AddReceiveRecord(param).subscribe(data => {
        this.loadData();
        $('#tracenum')[0].focus();
        this.tracenumber = '';
        this.confirmTraceNum = '';
        this.weight = null;
      });
    }
  }
}
