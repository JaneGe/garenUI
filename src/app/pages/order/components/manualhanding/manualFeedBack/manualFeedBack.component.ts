import {Component, OnInit} from '@angular/core';
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
import {RootComponent} from "../../../../../shared/component/root.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderExceptionService} from "../../../../../shared/services/orderException-service";
import {AllOrderExceptionListModel} from "../../../../../shared/models/orders/all-orderException-list-model";
import {AuthorityComponent} from "../../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderManualService} from "../../../../orderManual.service";
import {OrderDetailModalComponent} from "../../modals/order-detail-modal/order-detail-modal.component";
import {OutputModalComponent} from "../../modals/outputModal/outputModal.component";

@Component({
  selector: 'app-manual-feed-back',
  templateUrl: './manualFeedBack.component.html',
  styleUrls: ['../../../public.scss', '../../../style.scss', './manualFeedBack.component.scss'],
  providers: [OrderExceptionService]
})
export class ManualFeedBackComponent extends AuthorityComponent implements OnInit {
  orderException;
  otherException = 'ManualFeedBack';

  constructor(
    private ModalService: NgbModal,
    private orderExceptionService: OrderExceptionService,
    public activerouter: ActivatedRoute,
    public  router: Router,
    private orderManualService: OrderManualService) {
    super(activerouter, router);
  }

  orderCompleteSalesStatus: string = '';
  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  items: AllOrderExceptionListModel[] = [];

  selectedChannelType: string;
  selectedTimeFiltType: string = 'OrderedTime';
  selectedChannelId: number;
  selectedTimeValueType: string;
  timeSearchStart: string;
  timeSearchEnd: string;
  selectdWarehouseId: any;
  selectCountryCode: string;

  selectedChannelIds: any[] = [];
  selectSearchType: string = 'OrderNumber';
  searchText: string;

  orderBatchsearchType: string = 'OrderNumber';
  orderBatchsearchText: string;
  orderBatchsearch: string;

  selectOrderIds: number[] = [];
  isCheckAllPages: boolean = false;
  isCheck: boolean;

  selectAllOrderIds: number[] = [];
  isRefresh: boolean = false;

  ngOnInit() {
    this.loadData();
  }

  loadData(pageNumber: number = 1) {
    this.selectOrderIds = [];
    //this.childselectOrderIds.emit(this.selectOrderIds);
    console.log("查询" + this.selectedChannelType);
    this.orderExceptionService.searchOrderExceptionList(
      this.orderException,
      this.orderCompleteSalesStatus,
      pageNumber,
      this.pageSize,
      this.selectdWarehouseId,
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
      this.otherException,
      this.selectedChannelIds,
    )
      .subscribe(data => {
        const pageData = data.content;
        console.log(data.content.items);
        this.items = pageData.items;
        let errType = this.orderException ? this.orderException : this.orderCompleteSalesStatus;

        let channelAll, countrylAll;
        channelAll = this.selectedChannelType == undefined || this.selectedChannelType.length == 0;
        countrylAll = this.selectCountryCode == undefined || this.selectCountryCode.length == 0;
        //console.log(channelAll,countrylAll);

        if (channelAll && countrylAll && this.items.length == 0) {
          this.orderManualService.sendMessage({kill: true, errType: errType});
          console.log('table不存在数据');
        }
        if (channelAll && countrylAll && this.items.length > 0) {
          this.orderManualService.sendMessage({kill: false, errType: errType});
          console.log('table存在数据');
        }
        this.pageNumber = pageData.pageInfo.pageIndex + 1;
        this.pageSize = pageData.pageInfo.pageSize;
        this.total = pageData.pageInfo.totalCount;
      });

  }

  //////////接受table-head筛选条件/////////
  getchildSelectedChannelType(val: any) {
    this.selectedChannelType = val;
    console.log("销售渠道" + this.selectedChannelType);
   // console.log("接受新的销售渠道时的ChannelType " + this.selectedChannelType);

    this.loadData();
  }

  getchildSelectedWarehouse(val: any) {
    // this.selectdWarehouseId=val;
    // this.loadData();
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
    //this.loadData();
  }

  getchildSelectedTimeValueType(val: any) {
    this.selectedTimeValueType = val;
    this.loadData();
  }

  getchildTimeSearchStart(val: any) {
    this.timeSearchStart = val;
    this.loadData();
  }

  getchildTimeSearchEnd(val: any) {
    this.timeSearchEnd = val;
    this.loadData();
  }

  getchildSelectSearchType(val: any) {
    this.selectSearchType = val;
    this.loadData();
  }

  getchildSearchText(val: any) {
    this.searchText = val;
    this.loadData();
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
    // this.isCheckAllPages = checked;
    // this.isCheck = this.isCheckAllPages;
    // this.selectAllOrderIds = [];
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

/////////////

  reload(pn: number = 1) {
    this.loadData(pn);
  }

  confirmModify(id: number, currentPage) {

    this.confirm("确定修改?", () => {
      this.orderExceptionService.confirmUpdateSiteTrackingNumber(id).subscribe(data => {
        this.alertMessage("操作成功");
        this.orderBatchsearch = null;
        this.isCheckAllPages = false;
        this.reload(currentPage);
      }, this.handleError);
    })
  }

  DoExport(item:any) {
    // let url='http://www.baidu.com';
    // let win = window.open(url);
    // win.focus();
    // win.location.href = url;
    if (this.selectOrderIds.length == 0) {
      this.error("请选择需要导出的订单");
      return;
    }

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
      'orderbatchSearchText': this.orderBatchsearchText,
      'otherException': this.otherException
    };
    if (queryData.timeValueType != 'Custom') {
      queryData.timeStart = '';
      queryData.timeEnd = '';
    }

    console.log(queryData);
    const exportModal = this.ModalService.open(OutputModalComponent, {size: 'sm', backdrop: 'static'});
    if (this.isCheckAllPages) {
      exportModal.componentInstance.exportParams = queryData;
      exportModal.componentInstance.exception = 'exception';
    }
    else {
      exportModal.componentInstance.orderIds = this.selectOrderIds;
    }

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
  }

  pageChanged(pN: number): void {
    $('html, body').animate({scrollTop: 0}, 0);
    this.loadData(pN);
  }

  openOrderDetailModal(orderId: number) {
    const searchModal = this.ModalService.open(OrderDetailModalComponent, {size: 'sm', backdrop: 'static'});
    searchModal.componentInstance.modalHeader = '订单详情';
    searchModal.componentInstance.orderId = orderId;
    searchModal.result.then(result => {
      this.loadData();
    }, reason => {
    })
  }
}
