import { Component, OnInit } from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
import {RootComponent} from "../../../../../shared/component/root.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderExceptionService} from "../../../../../shared/services/orderException-service";
import {AllOrderExceptionListModel} from "../../../../../shared/models/orders/all-orderException-list-model";
import {AuthorityComponent} from "../../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-failed-back',
  templateUrl: './failed-back.component.html',
  styleUrls: ['../../../public.scss','./failed-back.component.scss'],
  providers: [OrderExceptionService]
})
export class FailedBackComponent  extends AuthorityComponent implements OnInit {

  constructor(private ModalService:NgbModal,
              private orderExceptionService:OrderExceptionService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }


  orderCompleteSalesStatus: string= 'Failed';
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
  selectdWarehouseId:any;
  selectCountryCode: string;


  selectSearchType:string;
  searchText:string;

  orderBatchsearchType: string= 'OrderNumber';
  orderBatchsearchText: string;
  orderBatchsearch: string;

  selectOrderIds:number[]=[];
  isCheckAllPages: boolean = false;
  isCheck: boolean ;

  selectAllOrderIds: number[] = [];
  isRefresh: boolean= false;

  ngOnInit() {
  }

  getchildSelectedChannelType(val:any){

    this.selectedChannelType=val;
  }

  getchildSelectedWarehouse(val:any){
    this.selectdWarehouseId=val;
  }
  getchildSelectedChannelId(val:any){
    this.selectedChannelId=val;
  }
  getchildSelectedChannelIds(val:any){
    this.selectedChannelIds=val;
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



  NoComesBack(target:any){
    // publicFunction.toggleSingleClass(target);
    this.confirm("确定不再回传订单?", () => {

      if(this.isCheck)
      {

        this.orderExceptionService.NoComesBack(this.orderCompleteSalesStatus,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          null
        ).subscribe(data => {
          this.alertMessage("订单已设为不再回传");
          this.orderBatchsearch = null;
          this.isRefresh = !this.isRefresh;
          this.isCheckAllPages = false;
        }, this.handleError);


      }
      else
      {

        if(this.selectOrderIds== null || this.selectOrderIds.length == 0)
        {
          this.error("请选择操作订单!");
          return;
        }

        this.orderExceptionService.NoComesBack(this.orderCompleteSalesStatus,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          this.selectOrderIds
        ).subscribe(data => {
          this.alertMessage("订单已设为不再回传");
          this.orderBatchsearch = null;
          this.isRefresh = !this.isRefresh;
        }, this.handleError);

      }
    })
  }

  afreshBackComesBack(target:any){

    // publicFunction.toggleSingleClass(target);
    this.confirm("确定重新回传订单?", () => {

      if(this.isCheck)
      {

        this.orderExceptionService.AfreshBackComesBack(this.orderCompleteSalesStatus,null,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType,this.orderBatchsearchText,
          null
        ).subscribe(data => {
          this.alertMessage(data.content);
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

        this.orderExceptionService.AfreshBackComesBack(this.orderCompleteSalesStatus,null,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType,this.orderBatchsearchText,
          this.selectOrderIds
        ).subscribe(data => {
          this.alertMessage(data.content);
          this.orderBatchsearch=null;
          this.isRefresh= !this.isRefresh;
        }, this.handleError);

      }
    })
  }
}
