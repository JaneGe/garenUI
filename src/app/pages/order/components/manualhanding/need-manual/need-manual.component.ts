import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
import {RootComponent} from "../../../../../shared/component/root.component";
import {AllOrderExceptionListModel} from "../../../../../shared/models/orders/all-orderException-list-model";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Http} from "@angular/http";
import {OrderInfoService} from "../../../../../shared/services/order.service";
import {ShopAccountService} from "../../../../../shared/services/shop.account.service";
import {OrderService} from "../../../../../shared/services/order-service";
import {OrderExceptionService} from "../../../../../shared/services/orderException-service";
import {SelectOrderIdsModel} from "../../../../../shared/models/orders/selectOrderIds-model";
import {forEach} from "@angular/router/src/utils/collection";
import {AuthorityComponent} from "../../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderManualService} from "../../../../orderManual.service";
import {OrderDetailModalComponent} from "../../modals/order-detail-modal/order-detail-modal.component";
@Component({
  selector: 'app-need-manual',
  templateUrl: './need-manual.component.html',
  styleUrls: ['../../../public.scss','./need-manual.component.scss'],
  providers: [OrderInfoService, ShopAccountService, OrderService,OrderExceptionService]
})
export class NeedManualComponent extends AuthorityComponent implements OnInit {

  constructor(// private activeModal: NgbActiveModal,
              public http: Http,
              public activerouter: ActivatedRoute,public router:Router,
              private modalService: NgbModal,
              private orderInfoService: OrderInfoService,
              private shopAccountService: ShopAccountService,
              private orderService: OrderService,
              private  orderExceptionService: OrderExceptionService,
              private orderManualService: OrderManualService,) {
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

  selectCountryCode: string;


  selectSearchType: string;
  searchText: string;

  orderBatchsearchType: string = 'OrderNumber';
  orderBatchsearchText: string;
  orderBatchsearch: string;

  orderException: string = 'NeedManualAudit';

  selectOrderIds: number[] = [];
  isCheckAllPages: boolean = false;
  isCheck: boolean;

  orderIdItems;
  selectAllOrderIds: number[] = [];
  selectPackageIds: number[] = [];

  isRefresh: boolean= false;

  @Output() testP1=new EventEmitter<any>();

  ngOnInit() {
    this.loadData(null,'init');
  }
  loadData(pageNumber: number = 1,loadType:string) {

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
        console.log(data.content.items);
        this.items = pageData.items;
        let errType = this.orderException;

        let channelAll, countrylAll;
        channelAll = this.selectedChannelType == undefined || this.selectedChannelType.length == 0;
        countrylAll = this.selectCountryCode == undefined || this.selectCountryCode.length == 0;
        //console.log(channelAll,countrylAll);

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

  reload() {
    this.loadData(this.pageNumber, 'reload');
  }
  onCheckAllPackageChanged(checked: boolean) {
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
  }
  getchildSelectedChannelType(val: any) {
    this.selectedChannelType = val;
    this.loadData(null,'ChannelType');
  }

  getchildSelectedChannelId(val: any) {
    this.selectedChannelId = val;
    this.loadData(null,'ChannelId');
  }
  getchildSelectedChannelIds(val: any) {
    this.selectedChannelId = val;
    this.loadData(null,'ChannelIds');
  }

  getchildOnSelectCountry(val: any) {
    this.selectCountryCode = val;
    this.loadData(null,'SelectCountry');
  }

  getchildSelectedTimeFiltType(val: any) {
    this.selectedTimeFiltType = val;
    this.loadData(null,'SelectedTimeFiltType');

  }

  getchildSelectedTimeValueType(val: any) {
    this.selectedTimeValueType = val;
    this.loadData(null,'SelectedTimeValueType');

  }

  getchildTimeSearchStart(val: any) {
    this.timeSearchStart = val;
    this.loadData(null,'TimeSearchStart');

  }

  getchildTimeSearchEnd(val: any) {
    this.timeSearchEnd = val;
    this.loadData(null,'TimeSearchEnd');


  }

  getchildSelectSearchType(val: any) {
    this.selectSearchType = val;
  }

  getchildSearchText(val: any) {
    this.searchText = val;
    if(val!=null){
      this.loadData(null,'SearchText');
    }
  }

  getchildOrderBatchsearchType(val: any) {
    if (val == null) {
      val = 'OrderNumber';
    }
    this.orderBatchsearchType = val;
  }

  getchildOrderBatchsearchText(val: any) {
    this.orderBatchsearchText = val;
    if(val!=null){
      this.loadData(null,'OrderBatchsearchText');
    }
  }


  onCheckPackageChanged(isChecked: boolean, orderId: number) {
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
      this.isCheckAllPages = false;
    }
  }

  getchildOrderBatchsearch(val: any) {
    this.orderBatchsearch = val;
  }


  onCheclAllPageChange(checked: boolean) {
    if (checked) {
      this.selectOrderIds = [];
      for (let o of this.items) {
        this.selectOrderIds.push(o.id);
      }
      this.isCheckAllPages = true;
    }
    else {
      this.selectOrderIds = [];
      this.isCheckAllPages = false;
    }
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
  openAsinDetailModal(val: any) {

  }
  openOrderDetailModal(orderId: number) {
    const searchModal = this.modalService.open(OrderDetailModalComponent, { size: 'sm', backdrop: 'static' });
    searchModal.componentInstance.modalHeader = '订单详情';
    searchModal.componentInstance.orderId = orderId;
    searchModal.result.then(result => {
      this.loadData(null,'closeOrderDetail');
    }, reason => {
    })
  }

  orderApproved() {

    this.confirm("确定审核通过订单?", () => {

      if (this.isCheckAllPages) {
        this.orderExceptionService.orderApproved(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType,this.orderBatchsearchText,
         null
        ).subscribe(data => {
             this.alertMessage("审核成功");

             this.orderBatchsearch=null;
          this.isRefresh= !this.isRefresh;
           this.isCheckAllPages=false;
          this.reload();
        }, this.handleError);


      }
      else {
        if(this.selectOrderIds== null || this.selectOrderIds.length == 0)
       {
         this.error("请选择操作订单!");
         return;
        }

        this.orderExceptionService.orderApproved(this.orderException,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType,this.orderBatchsearchText,
         this.selectOrderIds
        ).subscribe(data => {
          this.alertMessage("审核成功");
          this.orderBatchsearch=null;

          this.isRefresh= !this.isRefresh;
          this.reload();
        }, this.handleError);

      }
    });

  }
}
