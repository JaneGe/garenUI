import { Component, OnInit } from '@angular/core';
import {OrderExceptionService} from "../../../../../shared/services/orderException-service";
import {RootComponent} from "../../../../../shared/component/root.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AutoAllocateComponent} from "../modals/auto-allocate/auto-allocate.component";
import {AllOrderExceptionListModel} from "../../../../../shared/models/orders/all-orderException-list-model";
import {OutputModalComponent} from "../../modals/outputModal/outputModal.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../../../shared/component/authority.component";

@Component({
  selector: 'app-cancel-deliver',
  templateUrl: './cancel-deliver.component.html',
  styleUrls: ['../../../public.scss','./cancel-deliver.component.scss'],
  providers:[OrderExceptionService]
})
export class CancelDeliverComponent extends AuthorityComponent implements OnInit {

  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  items: AllOrderExceptionListModel[] = [];

  selectedChannelType: string;
  selectdWarehouseId:number;
  selectedTimeFiltType: string='OrderedTime';
  selectedChannelId: number;
  selectedChannelIds: any[];
  selectedTimeValueType: string;
  timeSearchStart: string;
  timeSearchEnd: string;
  selectCountryCode: string;
  selectSearchType: string='OrderNumber';
  searchText: string;
  orderBatchsearchType: string = 'OrderNumber';
  orderBatchsearchText: string;
  orderBatchsearch: string;

  isCheckAllPages: boolean = false;
  isCheck: boolean ;

  orderException: string= 'ShipmentsFailed';

  isRefresh: boolean= false;

  selectOrderIds: number[] = [];
  selectAllOrderIds: number[] = [];
  constructor(private orderExceptionService:OrderExceptionService,
              private ModalService:NgbModal,
              private modalService: NgbModal,public activerouter: ActivatedRoute,public  router:Router
  ) {
    super(activerouter,router);
  }

  ngOnInit() {
  }
  getchildSelectedChannelType(val: any) {

    this.selectedChannelType = val;
  }

  getchildSelectedChannelId(val: any) {
    this.selectedChannelId = val;
  }
  getchildSelectedChannelIds(val: any) {
    this.selectedChannelIds = val;
  }

  getchildOnSelectCountry(val: any) {
    this.selectCountryCode = val;
  }
  getchildSelectedWarehouse(val:any){
    this.selectdWarehouseId=val;
  }

  getchildSelectedTimeFiltType(val: any) {
    this.selectedTimeFiltType = val;
  }

  getchildSelectedTimeValueType(val: any) {
    this.selectedTimeValueType = val;
  }

  getchildTimeSearchStart(val: any) {
    this.timeSearchStart = val;
  }

  getchildTimeSearchEnd(val: any) {
    this.timeSearchEnd = val;
  }

  getchildSelectSearchType(val: any) {
    this.selectSearchType = val;
  }

  getchildSearchText(val: any) {
    this.searchText = val;
  }

  getchildOrderBatchsearchType(val: any) {
    if (val == null) {
      val = 'OrderNumber';
    }
    this.orderBatchsearchType = val;

  }

  getchildOrderBatchsearchText(val: any) {
    this.orderBatchsearchText = val;
  }

  getchildOrderBatchsearch(val: any) {
    this.orderBatchsearch = val;
  }

  onCheclAllPageChange(checked: boolean) {
    this.isCheckAllPages = checked;
    this.isCheck = this.isCheckAllPages;
    this.selectAllOrderIds = [];
  }

  //table输入参数
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

  openAutoAllocateModal(target:any){
    // publicFunction.toggleSingleClass(target);

    if(this.selectOrderIds== null || this.selectOrderIds.length == 0 && this.isCheckAllPages==false)
    {
      this.error("请选择操作订单!");
      return;
    }



    const activeModal=this.ModalService.open(AutoAllocateComponent,{size:'lg',keyboard:true});
    activeModal.componentInstance.modalHeader='重新分配-自动分配';

    activeModal.componentInstance.orderException=this.orderException;
    activeModal.componentInstance.selectedChannelType=this.selectedChannelType;
    activeModal.componentInstance.selectedTimeFiltType=this.selectedTimeFiltType;
    activeModal.componentInstance.selectedChannelId=this.selectedChannelId;
    activeModal.componentInstance.selectedTimeValueType=this.selectedTimeValueType;
    activeModal.componentInstance.timeSearchStart=this.timeSearchStart;
    activeModal.componentInstance.timeSearchEnd=this.timeSearchEnd;
    activeModal.componentInstance.selectCountryCode=this.selectCountryCode;
    activeModal.componentInstance.selectSearchType=this.selectSearchType;
    activeModal.componentInstance.searchText=this.searchText;
    activeModal.componentInstance.orderBatchsearchType=this.orderBatchsearchType;
    activeModal.componentInstance.orderBatchsearchText=this.orderBatchsearchText;
    activeModal.componentInstance.orderBatchsearch=this.orderBatchsearch;


    if(this.isCheckAllPages)
    {
      activeModal.componentInstance.isCheckAllPages=this.isCheckAllPages;
    }
    else
    {
      activeModal.componentInstance.selectOrderIds=this.selectOrderIds;
      activeModal.componentInstance.selectOrderNum=this.selectOrderIds.length;
    }
    activeModal.result.then((result)=>{
      if(result!=undefined){
        this.orderBatchsearch=null;
        this.isRefresh= !this.isRefresh;
        this.isCheckAllPages=false;
      }
    })
  }

  openOutputModal() {
    if (this.selectOrderIds.length == 0) {
      this.error("请选择需要导出的订单");
      return;
    }

    // this.orderException,
    //   this.selectedChannelType,
    //   this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
    //   this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
    //   this.orderBatchsearchType,this.orderBatchsearchText,
    //   this.selectOrderIds

    let queryData = {
      'exception': this.orderException,
      'channelType': this.selectedChannelType,
      'channelId': this.selectedChannelId,
      'countryCode': this.selectCountryCode,
      'timeSearchType': this.selectedTimeFiltType,
      'timeValueType': this.selectedTimeValueType,
      'timeStart': this.timeSearchStart,
      'timeEnd': this.timeSearchEnd,
      'searchType': this.selectSearchType,
      'searchText': this.searchText,
      'orderbatchSearchType': this.orderBatchsearchType,
      'orderbatchSearchText': this.orderBatchsearchText
    };
    if (queryData.timeValueType != 'Custom') {
      queryData.timeStart = '';
      queryData.timeEnd = '';
    }


    const exportModal = this.modalService.open(OutputModalComponent, {size: 'sm', backdrop: 'static'});
    if (this.isCheckAllPages) {
      exportModal.componentInstance.exportParams = queryData;
      exportModal.componentInstance.exception = 'exception';
    }
    else {
      exportModal.componentInstance.orderIds = this.selectOrderIds;
    }

  }

  ContinueShipments(){

    this.confirm("确定继续发货该订单?", () => {

      if(this.isCheck)
      {
        this.orderExceptionService.ContinueShipments(this.orderException,this.selectdWarehouseId,
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

        this.orderExceptionService.ContinueShipments(this.orderException,this.selectdWarehouseId,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType,this.orderBatchsearchText,
          this.selectOrderIds
        ).subscribe(data => {
          this.alertMessage(data.content);
          this.orderBatchsearch=null;
          this.isRefresh= !this.isRefresh;
          this.isCheckAllPages=false;
        }, this.handleError);

      }
    })
  }


}
