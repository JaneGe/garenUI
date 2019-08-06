import {Component, OnInit} from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AutoAllocateComponent} from "../modals/auto-allocate/auto-allocate.component";
import {OrderExceptionService} from "../../../../../shared/services/orderException-service";
import {RootComponent} from "../../../../../shared/component/root.component";
import {AllOrderExceptionListModel} from "../../../../../shared/models/orders/all-orderException-list-model";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../../../shared/component/authority.component";

@Component({
  selector: 'app-low-profit',
  templateUrl: './low-profit.component.html',
  styleUrls: ['../../../public.scss', './low-profit.component.scss'],
  providers: [OrderExceptionService]
})
export class LowProfitComponent extends AuthorityComponent implements OnInit {
  selectOrderNum: number;

  constructor(private ModalService: NgbModal,
              private  orderExceptionService: OrderExceptionService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }

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


  selectSearchType: string;
  searchText: string;

  orderBatchsearchType: string = 'OrderNumber';
  orderBatchsearchText: string;
  orderBatchsearch: string;

  orderException: string = 'LowProfitAudit';

  selectOrderIds: number[] = [];
  isCheckAllPages: boolean = false;
  isCheck: boolean;

  selectAllOrderIds: number[] = [];

  isRefresh: boolean = false;


  ngOnInit() {
  }

  getchildSelectedChannelType(val: any) {

    this.selectedChannelType = val;
  }

  getchildSelectedChannelId(val: any) {
    this.selectedChannelId = val;
  }
  getchildSelectedChannelIds(val: any) {
    console.info("getchildSelectedChannelIds");
    console.info(val);
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


  getchildSelectOrderIds(val: any) {
    this.selectOrderIds = val;
  }

  getchildIsCheckAllPages(val: any) {
    this.isCheckAllPages = val;
    this.isCheck = this.isCheckAllPages;
  }

  getchildIsRefresh(val: any) {
    this.isRefresh = val;
  }


  orderApproved() {

    this.confirm("确定审核通过订单?", () => {

      if (this.isCheck) {
        this.orderExceptionService.orderLowProfitApproved(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          null
        ).subscribe(data => {
          this.alertMessage("审核成功");

          this.orderBatchsearch = null;
          this.isRefresh = !this.isRefresh;
          this.isCheckAllPages = false;
        }, this.handleError);


      }
      else {

        if (this.selectOrderIds == null || this.selectOrderIds.length == 0) {
          this.error("请选择操作订单!");
          return;
        }

        this.orderExceptionService.orderLowProfitApproved(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          this.selectOrderIds
        ).subscribe(data => {
          this.alertMessage("审核成功");
          this.orderBatchsearch = null;

          this.isRefresh = !this.isRefresh;

        }, this.handleError);

      }
    });

  }

  ResetOrder(target: any) {

    this.confirm("确定重置订单?", () => {

      if (this.isCheck) {

        this.orderExceptionService.ResetOrder(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          null
        ).subscribe(data => {
          this.alertMessage("重置订单成功");
          this.orderBatchsearch = null;
          this.isRefresh = !this.isRefresh;
          this.isCheckAllPages = false;
        }, this.handleError);


      }
      else {

        if (this.selectOrderIds == null || this.selectOrderIds.length == 0) {
          this.error("请选择操作订单!");
          return;
        }

        this.orderExceptionService.ResetOrder(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          this.selectOrderIds
        ).subscribe(data => {
          this.alertMessage("重置订单成功");
          this.orderBatchsearch = null;
          this.isRefresh = !this.isRefresh;
        }, this.handleError);

      }
    })
  }

  VoidedOrder(target: any) {
    this.confirm("确定作废订单?", () => {

      if (this.isCheck) {

        this.orderExceptionService.VoidedOrder(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          null
        ).subscribe(data => {
          this.alertMessage("作废订单成功");
          this.orderBatchsearch = null;
          this.isRefresh = !this.isRefresh;
          this.isCheckAllPages = false;
        }, this.handleError);

      }
      else {

        if (this.selectOrderIds == null || this.selectOrderIds.length == 0) {
          this.error("请选择操作订单!");
          return;
        }

        this.orderExceptionService.VoidedOrder(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          this.selectOrderIds
        ).subscribe(data => {
          this.alertMessage("作废订单成功");
          this.orderBatchsearch = null;
          this.isRefresh = !this.isRefresh;
        }, this.handleError);

      }
    })
  }

  LockOrder(target: any) {

    this.confirm("确定锁定订单?", () => {

      if (this.isCheck) {

        this.orderExceptionService.LockOrder(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          null
        ).subscribe(data => {
          this.alertMessage("锁定订单成功");
          this.orderBatchsearch = null;
          this.isRefresh = !this.isRefresh;
          this.isCheckAllPages = false;
        }, this.handleError);
      }
      else {
        if (this.selectOrderIds == null || this.selectOrderIds.length == 0) {
          this.error("请选择操作订单!");
          return;
        }

        this.orderExceptionService.LockOrder(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          this.selectOrderIds
        ).subscribe(data => {
          this.alertMessage("锁定订单成功");
          this.orderBatchsearch = null;
          this.isRefresh = !this.isRefresh;
        }, this.handleError);
      }
    })
  }

  openAutoAllocateModal(target: any) {


    if (this.selectOrderIds == null || this.selectOrderIds.length == 0 && this.isCheckAllPages == false) {
      this.error("请选择操作订单!");
      return;
    }


    const activeModal = this.ModalService.open(AutoAllocateComponent, {size: 'lg', keyboard: true});
    activeModal.componentInstance.modalHeader = '重新分配-自动分配';

    activeModal.componentInstance.orderException = this.orderException;
    activeModal.componentInstance.selectedChannelType = this.selectedChannelType;
    activeModal.componentInstance.selectedTimeFiltType = this.selectedTimeFiltType;
    activeModal.componentInstance.selectedChannelId = this.selectedChannelId;
    activeModal.componentInstance.selectedTimeValueType = this.selectedTimeValueType;
    activeModal.componentInstance.timeSearchStart = this.timeSearchStart;
    activeModal.componentInstance.timeSearchEnd = this.timeSearchEnd;
    activeModal.componentInstance.selectCountryCode = this.selectCountryCode;
    activeModal.componentInstance.selectSearchType = this.selectSearchType;
    activeModal.componentInstance.searchText = this.searchText;
    activeModal.componentInstance.orderBatchsearchType = this.orderBatchsearchType;
    activeModal.componentInstance.orderBatchsearchText = this.orderBatchsearchText;
    activeModal.componentInstance.orderBatchsearch = this.orderBatchsearch;


    if (this.isCheckAllPages) {
      activeModal.componentInstance.isCheckAllPages = this.isCheckAllPages;
    }
    else {
      activeModal.componentInstance.selectOrderIds = this.selectOrderIds;
      activeModal.componentInstance.selectOrderNum = this.selectOrderIds.length;
    }
    activeModal.result.then((result) => {
      if (result != undefined) {
        this.orderBatchsearch = null;
        this.isRefresh = !this.isRefresh;
        this.isCheckAllPages = false;
      }
    })
  }
}
