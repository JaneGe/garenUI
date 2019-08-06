import { Component, OnInit } from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
import {RootComponent} from "../../../../../shared/component/root.component";
import {AllOrderExceptionListModel} from "../../../../../shared/models/orders/all-orderException-list-model";
import {SelectOrderIdsModel} from "../../../../../shared/models/orders/selectOrderIds-model";
import {OrderExceptionService} from "../../../../../shared/services/orderException-service";
import {AuthorityComponent} from "../../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-outtime-risk',
  templateUrl: './outtime-risk.component.html',
  styleUrls: ['../../../public.scss','./outtime-risk.component.scss'],
  providers: [OrderExceptionService]
})

export class OuttimeRiskComponent extends AuthorityComponent implements OnInit {

  constructor(public activerouter: ActivatedRoute,public  router:Router ,private orderExceptionService:OrderExceptionService) {
    super(activerouter,router);
  }

  orderException: string= 'OrderExpired';

  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  items: AllOrderExceptionListModel[] = [];


  selectedChannelType: string;
  selectedTimeFiltType: string;
  selectedChannelId: number;
  selectedChannelIds: any[];
  selectedTimeValueType: string;
  timeSearchStart: string;
  timeSearchEnd: string;

  selectCountryCode: string;


  selectSearchType:string;
  searchText:string;

  orderBatchsearchType: string= 'OrderNumber';
  orderBatchsearchText: string;
  orderBatchsearch: string;


  selectOrderIds: number[] = [];
  isCheckAllPages: boolean = false;
  isCheck: boolean ;

  orderIdItems;
  selectAllOrderIds: number[] = [];
  isRefresh: boolean= false;

  ngOnInit() {
  }
  getchildSelectedChannelType(val:any){

    this.selectedChannelType=val;
  }

  getchildSelectedChannelId(val:any){
    this.selectedChannelId = val;
  }

  getchildSelectedChannelIds(val:any){
    this.selectedChannelIds = val;
  }

  getchildOnSelectCountry(val:any){
    this.selectCountryCode=val;
  }

  getchildSelectedTimeFiltType(val:any){
    this.selectedTimeFiltType=val;
  }

  getchildSelectedTimeValueType(val:any){
    this.selectedTimeValueType=val;
  }

  getchildTimeSearchStart(val:any){
    this.timeSearchStart=val;
  }

  getchildTimeSearchEnd(val:any){
    this.timeSearchEnd=val;
  }

  getchildSelectSearchType(val:any){
    this.selectSearchType=val;
  }

  getchildSearchText(val:any){
    this.searchText=val;
  }

  getchildOrderBatchsearchType(val:any){
    if(val==null)
    {
      val='OrderNumber';
    }
    this.orderBatchsearchType=val;

  }

  getchildOrderBatchsearchText(val:any){
    this.orderBatchsearchText=val;
  }

  getchildOrderBatchsearch(val:any){
    this.orderBatchsearch=val;
  }

  onCheclAllPageChange(checked: boolean) {
    this.isCheckAllPages = checked;
    this.isCheck = this.isCheckAllPages;
    this.selectAllOrderIds = [];
  }

  getchildSelectOrderIds(val:any) {
    this.selectOrderIds = val;
  }
  getchildIsCheckAllPages(val:any) {
    this.isCheckAllPages = val;
    this.isCheck = this.isCheckAllPages;
  }

  getchildIsRefresh(val: any) {
    this.isRefresh = val;
  }

  ResetOrder(target:any){

    this.confirm("确定重置订单?", () => {

      if(this.isCheck)
      {

        this.orderExceptionService.ResetOrder(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType,this.orderBatchsearchText,
          null
        ).subscribe(data => {
          this.alertMessage("重置订单成功");
          this.orderBatchsearch=null;
          this.isRefresh= !this.isRefresh;
          this.isCheckAllPages=false;
        }, this.handleError);


      }
      else
      {

        if(this.selectOrderIds== null || this.selectOrderIds.length == 0)
        {
          this.error("请选择操作订单!");
          return;
        }

        this.orderExceptionService.ResetOrder(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType,this.orderBatchsearchText,
          this.selectOrderIds
        ).subscribe(data => {
          this.alertMessage("重置订单成功");
          this.orderBatchsearch=null;
          this.isRefresh= !this.isRefresh;
        }, this.handleError);

      }
    })
  }

  VoidedOrder(target:any){
    publicFunction.toggleSingleClass(target);
    this.confirm("确定作废订单?", () => {

      if(this.isCheck)
      {

        this.orderExceptionService.VoidedOrder(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType,this.orderBatchsearchText,
          null
        ).subscribe(data => {
          this.alertMessage("作废订单成功");
          this.orderBatchsearch=null;
          this.isRefresh= !this.isRefresh;
          this.isCheckAllPages=false;
        }, this.handleError);

      }
      else
      {

        if(this.selectOrderIds== null || this.selectOrderIds.length == 0)
        {
          this.error("请选择操作订单!");
          return;
        }

        this.orderExceptionService.VoidedOrder(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType,this.orderBatchsearchText,
          this.selectOrderIds
        ).subscribe(data => {
          this.alertMessage("作废订单成功");
          this.orderBatchsearch=null;
          this.isRefresh= !this.isRefresh;
        }, this.handleError);

      }
    })
  }

  LockOrder(target:any){
    publicFunction.toggleSingleClass(target);
    this.confirm("确定锁定订单?", () => {

      if(this.isCheck)
      {

        this.orderExceptionService.LockOrder(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType,this.orderBatchsearchText,
          null
        ).subscribe(data => {
          this.alertMessage("锁定订单成功");
          this.orderBatchsearch=null;
          this.isRefresh= !this.isRefresh;
          this.isCheckAllPages=false;
        }, this.handleError);
      }
      else
      {
        if(this.selectOrderIds== null || this.selectOrderIds.length == 0)
        {
          this.error("请选择操作订单!");
          return;
        }

        this.orderExceptionService.LockOrder(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType,this.orderBatchsearchText,
          this.selectOrderIds
        ).subscribe(data => {
          this.alertMessage("锁定订单成功");
          this.orderBatchsearch=null;
          this.isRefresh= !this.isRefresh;
        }, this.handleError);
      }
    })
  }

}
