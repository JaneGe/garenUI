///<reference path="../../../../../shared/models/orders/selectOrderIds-model.ts"/>
import {Component, OnInit} from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
import {AllOrderExceptionListModel} from "../../../../../shared/models/orders/all-orderException-list-model";
import {RootComponent} from "../../../../../shared/component/root.component";
import {OrderExceptionService} from "../../../../../shared/services/orderException-service";
import {SelectOrderIdsModel} from "../../../../../shared/models/orders/selectOrderIds-model";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ChooseWarehouseLogisticsModalComponent} from 'app/pages/order/components/modals/choose-warehouse-logistics-modal/choose-warehouse-logistics-modal.component';
import {NeedMergeOrderGroupListModel} from "../../../../../shared/models/orders/need-merge-order-group-list-model";
import {AuthorityComponent} from "../../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderManualService} from "../../../../orderManual.service";
import {OrderDetailModalComponent} from "../../modals/order-detail-modal/order-detail-modal.component";

@Component({
  selector: 'app-merge-order',
  templateUrl: './merge-order.component.html',
  styleUrls: ['../../../public.scss', './merge-order.component.scss'],
  providers: [OrderExceptionService]
})
export class MergeOrderComponent extends AuthorityComponent implements OnInit {

  constructor(private orderExceptionService: OrderExceptionService,private orderManualService:OrderManualService,
              private modalService: NgbModal,public activerouter: ActivatedRoute,public  router:Router
  ) {
    super(activerouter,router);
  }

  orderException: string = 'ConsolidateOrders';

  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  items: NeedMergeOrderGroupListModel[] = [];

  selectedChannelType: string;
  selectedTimeFiltType: string;
  selectedChannelId: number;
  selectedChannelIds: any[];

  selectdWarehouseId:number;
  selectedTimeValueType: string;
  timeSearchStart: string;
  timeSearchEnd: string;

  selectCountryCode: string;


  selectSearchType: string;
  searchText: string;

  orderBatchsearchType: string = 'OrderNumber';
  orderBatchsearchText: string;
  orderBatchsearch: string;

  selectOrderIds: number[] = [];
  isCheckAllPages: boolean = false;
  isCheck: boolean;

  selectAllOrderIds: number[] = [];
  isRefresh: boolean = false;

  groupCheckOrderIds: any = {};

  ngOnInit() {
    //this.loadData();
  }

  getchildSelectedChannelType(val: any) {
    this.selectedChannelType = val;
    this.loadData();
  }

  getchildSelectedWarehouse(val:any){
    this.selectdWarehouseId=val;
    this.loadData();
  }

  getchildSelectedChannelId(val: any) {
    this.selectedChannelId = val;
    this.loadData();
  }
  getchildSelectedChannelIds(val: any) {
    this.selectedChannelIds = val;
    this.loadData();
  }

  getchildOnSelectCountry(val: any) {
    this.selectCountryCode = val;
    this.loadData();
  }

  getchildSelectedTimeFiltType(val: any) {
    this.selectedTimeFiltType = val;
  }

  getchildSelectedTimeValueType(val: any) {
    this.selectedTimeValueType = val;
    this.loadData();
  }

  getchildTimeSearchStart(val: any) {
    this.timeSearchStart = val;
  }

  getchildTimeSearchEnd(val: any) {
    this.timeSearchEnd = val;
    this.loadData();
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
  loadData(pageNumber: number = 1) {
    this.selectOrderIds = [];
    this.orderExceptionService.getNeedMergeOrderList(pageNumber, this.pageSize, this.selectdWarehouseId , this.selectedChannelType,
      this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
      this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
      this.orderBatchsearchType, this.orderBatchsearchText, this.selectedChannelIds
    ).subscribe(data => {
      const pageData = data.content;
      //console.log(pageData);

      this.items = pageData.items;
      for (const item of this.items) {
        this.groupCheckOrderIds[item.addressHash] = [];
      }
      let channelAll,countrylAll;
      channelAll=this.selectedChannelType==undefined||this.selectedChannelType.length==0;
      countrylAll=this.selectCountryCode==undefined||this.selectCountryCode.length==0;
      if(channelAll&&countrylAll&&this.items.length==0){
        this.orderManualService.sendMessage({kill:true,errType:this.orderException});
        console.log('table不存在数据');
      }
      if(channelAll&&countrylAll&&this.items.length>0){
        this.orderManualService.sendMessage({kill:false,errType:this.orderException});
        console.log('table存在数据');
      }
      this.pageNumber = pageData.pageInfo.pageIndex + 1;
      this.pageSize = pageData.pageInfo.pageSize;
      this.total = pageData.pageInfo.totalCount;
    }, this.handleError);

  }

  reload() {
    this.loadData(this.pageNumber);
  }

  pageChanged(pn) {
    this.loadData(pn);
  }

  openOrderDetailModal(orderId: number) {
    const searchModal = this.modalService.open(OrderDetailModalComponent, {size: 'sm', backdrop: 'static'});
    searchModal.componentInstance.modalHeader = '订单详情';
    searchModal.componentInstance.orderId = orderId;
    searchModal.result.then(result => {
      this.loadData();
    }, reason => {
    })
  }
  ignoreMerge(item: NeedMergeOrderGroupListModel) {
    const checkOrderids = this.groupCheckOrderIds[item.addressHash];
    if (checkOrderids.length == 0) {
      this.error('请选择需要忽略的订单');
      return;
    }

    this.confirm("确定忽略此组订单？（无法恢复！）", () => {
      let data = checkOrderids;
      this.orderExceptionService.ignoreOrdersMerge(data).subscribe(res => {
        const result = res.content;
        if (result.totalCount == result.successCount) {
          this.alertMessage('全部忽略成功！');
        }
        else {
          this.alertMessage(`成功:${result.successCount}个,失败${result.failCount}个`);
        }
        this.reload();
      }, this.handleError);
    });
  }

  merge(item: NeedMergeOrderGroupListModel) {
    const checkOrderids = this.groupCheckOrderIds[item.addressHash];
    if (checkOrderids.length == 0) {
      this.error('请选择需要忽略的订单');
      return;
    }
    if(checkOrderids.length < 2){
      this.error('订单数量必须大于1');
      return;
    }


    const modal = this.modalService.open(ChooseWarehouseLogisticsModalComponent, {size: 'sm', backdrop: 'static'});
    const childrenOrderIds = checkOrderids.slice(1);
    modal.componentInstance.chooseOrdersId = childrenOrderIds;
    modal.componentInstance.orderId = checkOrderids[0];

    modal.result.then(result => {
      this.reload();
    }, reason => {
    })
  }

  groupAllOrdersChange($event: any, addressHash: string) {
    if ($event.target.checked) {
      const itemOrders = this.items.find(m => m.addressHash == addressHash);
      if (itemOrders == null) {
        return;
      }
      let theOrderIds = [];
      for (let order of itemOrders.orders) {
        theOrderIds.push(order.id);
      }
      this.groupCheckOrderIds[addressHash] = theOrderIds;
    }
    else {
      this.groupCheckOrderIds[addressHash] = [];
    }
  }

  orderCheckChange($event: any, addressHash: string, orderId: number) {
    const groupOrders = this.groupCheckOrderIds[addressHash];

    if ($event.target.checked) {
      let orderIndex = groupOrders.indexOf(orderId);
      if (orderIndex < 0) {
        groupOrders.push(orderId)
      }
    }
    else {
      let orderIndex = groupOrders.indexOf(orderId);
      if (orderIndex >= 0) {
        groupOrders.splice(orderIndex, 1);
      }
    }
  }

  orderIsCheck(addressHash: string, id: number) {
    const group = this.groupCheckOrderIds[addressHash];
    if (group != null) {
      return group.indexOf(id) >= 0;
    }
  }

  groupIsCheck(item: NeedMergeOrderGroupListModel) {
    let cLen = this.groupCheckOrderIds[item.addressHash].length;
    if (item.orders.length == cLen) {
      return true;
    }
    return false;
  }
}
