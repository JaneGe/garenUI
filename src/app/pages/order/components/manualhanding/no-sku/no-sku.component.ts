import { Component, Input, OnInit, Output, EventEmitter, SimpleChange } from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
import {OrderExceptionService} from "../../../../../shared/services/orderException-service";
import {RootComponent} from "../../../../../shared/component/root.component";
import {AllOrderExceptionListModel} from "../../../../../shared/models/orders/all-orderException-list-model";
import {SelectOrderIdsModel} from "../../../../../shared/models/orders/selectOrderIds-model";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthorityComponent} from "../../../../../shared/component/authority.component";
import {OrderManualService} from "../../../../orderManual.service";
import {OrderDetailModalComponent} from "../../modals/order-detail-modal/order-detail-modal.component";

@Component({
  selector: 'app-no-sku',
  templateUrl: './no-sku.component.html',
  styleUrls: ['../../../public.scss','./no-sku.component.scss'],
  providers: [OrderExceptionService]
})
export class NoSkuComponent extends AuthorityComponent implements OnInit {

  // 国家与国旗数据
  MarketplaceIdItem = [
    { code: 'A2EUQ1WTGCTBG2', flag: 'assets/country/CA.svg', countryName: '加拿大' },
    { code: 'ATVPDKIKX0DER', flag: 'assets/country/US.svg', countryName: '美国' },
    { code: 'A1AM78C64UM0Y8', flag: 'assets/country/MX.svg', countryName: '墨西哥' },
    { code: 'A1RKKUPIHCS9HS', flag: 'assets/country/ES.svg', countryName: '西班牙' },
    { code: 'A1F83G8C2ARO7P', flag: 'assets/country/GB.svg', countryName: '英国' },
    { code: 'A13V1IB3VIYZZH', flag: 'assets/country/FR.svg', countryName: '法国' },
    { code: 'A1PA6795UKMFR9', flag: 'assets/country/DE.svg', countryName: '德国' },
    { code: 'APJ6JRA9NG5V4', flag: 'assets/country/IT.svg', countryName: '意大利' },
    { code: 'A21TJRUUN4KGV', flag: 'assets/country/IN.svg', countryName: '印度' },
    { code: 'AAHKV2X7AFYLW', flag: 'assets/country/CN.svg', countryName: '中国' },
    { code: 'A1VC38T7YXB528', flag: 'assets/country/JP.svg', countryName: '日本' },
    { code: 'A39IBJ37TRP1C6', flag: 'assets/country/AU.svg', countryName: '澳大利亚' },
    { code: 'A2Q3Y263D00KWC', flag: 'assets/country/BR.svg', countryName: '巴西' },
  ]

  constructor(
    private orderExceptionService:OrderExceptionService,
    private orderManualService: OrderManualService,
    private modalService: NgbModal,
    public activerouter: ActivatedRoute,
    public  router:Router) {
    super(activerouter,router);
  }

  orderException: string= 'ItemNoMapSku';

  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  items: AllOrderExceptionListModel[] = [];
  dataState = false;

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
  selectPackageIds: number[] = [];

  orderBatchsearchType: string= 'OrderNumber';
  orderBatchsearchText: string;
  orderBatchsearch: string;


  selectOrderIds: number[] = [];
  isCheckAllPages: boolean = false;
  isCheck: boolean ;

  orderIdItems;
  // selectAllOrderIds: number[] = [];
  isRefresh: boolean= false;
  @Input()
  warehouseId: any;
  @Input()
  hasWarehouse: boolean;
  @Output() childselectOrderIds = new EventEmitter<any>();
  @Output() childIsCheckAllPages = new EventEmitter<any>();
  @Output() childIsRefresh = new EventEmitter<any>();

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log('ngOnChanges');
    let isReturn = true;
    for (let propName in changes) {
      if (propName == 'isCheck') {
        this.onCheclAllPageChange(this.isCheck);
      }
      else if (propName == 'isRefresh') {
        //this.loadData();
        isReturn = false;
      }
      else {
        isReturn = false;
      }
    }

    if (isReturn) {
      return;
    }

    // ||this.isRefresh == true
    if (this.orderBatchsearch == null) {
      if (!this.hasWarehouse) {
        this.loadData(null, 'orderBatchsearch');
      }
      else {
        if (this.warehouseId) {
          this.loadData(null, 'orderBatchsearch');
        }
      }
      //  this.isRefresh=false;

    }
    this.childIsRefresh.emit(this.isRefresh);

  }

  ngOnInit() {
    // console.log('进入商品关联失败');
    this.loadData(null, 'ngOnInit');
  }

  doSearch() {
    this.ClearBatchSearchText();
    this.loadData(null, '');
  }
  ClearBatchSearchText() {
    this.orderBatchsearchText = null;
    this.orderBatchsearchType = null;
  }
  chooseMarketplaceId() {
    for (let i of this.items) {
      for (let index of this.MarketplaceIdItem) {
        if (i.shippingCountryName === index.countryName) {
          i.flag = index.flag;
        }
      }
    }
  }
  getchildSelectedChannelType(val:any) {
    this.selectedChannelType = val;
    this.loadData(null, 'getchildSelectedChannelType')
  }

  getchildSelectedChannelId(val:any) {
    this.selectedChannelId = val;
  }
  getchildSelectedChannelIds(val:any) {
    this.selectedChannelIds = val;

    this.loadData(null, 'SelectedChannelIds')
  }

  getchildOnSelectCountry(val:any) {
    this.selectCountryCode = val;
    this.loadData(null, 'getchildOnSelectCountry')
    console.log('getchildOnSelectCountry: ' + val)
  }

  getchildSelectedTimeFiltType(val:any) {
    this.selectedTimeFiltType = val;
    this.loadData(null, 'getchildSelectedTimeFiltType')
  }

  getchildSelectedTimeValueType(val:any) {
    this.selectedTimeValueType = val;
    this.loadData(null, 'getchildSelectedTimeValueType')
  }

  getchildTimeSearchStart(val:any) {
    this.timeSearchStart = val;
    this.loadData(null, 'getchildTimeSearchStart')
  }

  getchildTimeSearchEnd(val:any) {
    this.timeSearchEnd = val;
    this.loadData(null, 'getchildTimeSearchEnd')
  }

  getchildSelectSearchType(val:any) {
    this.selectSearchType = val;
  }

  getchildSearchText(val:any) {
    this.searchText = val;
    if(val){
      this.loadData(null,'SearchText');
    }
  }

  getchildOrderBatchsearchType(val:any){
    if(val==null) {
      val='OrderNumber'
    }
    this.orderBatchsearchType=val;
  }

  onCheckAllOrderChanged(checked: boolean) {
    if (checked) {
      this.selectOrderIds = [];
      for (let o of this.items) {
        this.selectOrderIds.push(o.id);
      }
    }
    else {
      this.selectOrderIds = [];
      this.isCheckAllPages = false;
    }

    console.info(this.selectOrderIds);
    this.childselectOrderIds.emit(this.selectOrderIds);
    this.childIsCheckAllPages.emit(this.isCheckAllPages);
  }
  onCheckOrderChanged(isChecked: boolean, orderId: number) {
    if (isChecked) {
      const orderIndex = this.selectOrderIds.indexOf(orderId);
      if (orderIndex >= 0) {
        return;
      }
      else {
        this.selectOrderIds.push(orderId);
      }
    }
    else {
      const orderIndex = this.selectOrderIds.indexOf(orderId);
      if (orderIndex >= 0) {
        this.selectOrderIds.splice(orderIndex, 1);
      }
      else {
        return;
      }
      this.isCheckAllPages = false;
    }

    this.childselectOrderIds.emit(this.selectOrderIds);
    this.childIsCheckAllPages.emit(this.isCheckAllPages);
  }
  onCheckAllPackageChanged(checked: boolean) {
    if (checked) {
      this.selectPackageIds = [];
      for (let o of this.items) {
        this.selectPackageIds.push(o.id);
      }
    }
    else {
      this.selectPackageIds = [];
      this.isCheckAllPages = false;
    }
  }
  openOrderDetailModal(orderId: number) {
    const searchModal = this.modalService.open(OrderDetailModalComponent, { size: 'sm', backdrop: 'static' });
    searchModal.componentInstance.modalHeader = '订单详情';
    searchModal.componentInstance.orderId = orderId;
    searchModal.result.then(result => {
     // this.loadData(null,'closeOrderDetail');
      this.loadData(null, 'openOrderDetailModal');
    }, reason => {
    })
  }

  getchildOrderBatchsearchText(val:any) {
    this.orderBatchsearchText = val;
    if(val){
      this.loadData(null,'OrderBatchsearch');
    }
  }

  getchildOrderBatchsearch(val:any) {
    this.orderBatchsearch = val;
  }

  onCheclAllPageChange(checked: boolean) {
    this.isCheckAllPages = checked;
    this.isCheck = this.isCheckAllPages;
    this.selectOrderIds = [];
    if(checked){
      for(const item of this.items){
        this.selectOrderIds.push(item.id);
      }
    }
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
  pageChanged(pN: number): void {
    $('html, body').animate({ scrollTop: 0 }, 0);
    this.dataState = false;
    this.loadData(pN, null);
  }
  //loadData(pageNumber: number = 1,loadType:string) {
  loadData(pageNumber: number = 1, loadType: string='1') {
    this.selectOrderIds = [];
    this.orderExceptionService.searchOrderExceptionList(
      this.orderException,
      null,
      pageNumber,
      this.pageSize,
      null,
      this.selectedChannelType,
      this.selectedChannelId,
      this.selectCountryCode,
      this.selectedTimeFiltType,
      this.selectedTimeValueType,
      this.timeSearchStart,
      this.timeSearchEnd,
      this.selectSearchType,
      this.searchText,
      this.orderBatchsearchType,
      this.orderBatchsearchText,
      null,
      this.selectedChannelIds
    )
      .subscribe(data => {
        const pageData = data.content;
        this.items = pageData.items;
        console.log(loadType);
        console.log(this.items);
        this.chooseMarketplaceId();
        let errType = this.orderException;

        let channelAll, countrylAll;
        channelAll = this.selectedChannelType == undefined || this.selectedChannelType.length == 0;
        countrylAll = this.selectCountryCode == undefined || this.selectCountryCode.length == 0;

        if (channelAll && countrylAll && this.items.length == 0) {
          this.orderManualService.sendMessage({ kill: true, errType: errType });
          console.log('table不存在数据');
        }
        if (channelAll && countrylAll && this.items.length > 0) {
          this.orderManualService.sendMessage({ kill: false, errType: errType });
          console.log('table存在数据');
        }
        this.pageNumber = pageData.pageInfo.pageIndex + 1;
        this.pageSize = pageData.pageInfo.pageSize;
        this.total = pageData.pageInfo.totalCount;
      });

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

}
