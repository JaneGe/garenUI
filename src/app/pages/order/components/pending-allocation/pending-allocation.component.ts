import {Component, OnInit} from '@angular/core';
import {WarehouseService} from "../../../../shared/services/warehouse-service";
import {WarehouseOptionModel} from "../../../../shared/models/warehouses/warehouse-option-model";
import {OrderAllocationService} from "../../../../shared/services/order-allocation-service";
import {RootComponent} from "../../../../shared/component/root.component";
import {PendingGroupAllocationOrderListModel} from "../../../../shared/models/orders/pending-allocation-order-list-model";
import {ChannelTypeName, CommonOptionModel, SiteConst} from "../../../../shared/services/site-const";
import {NgbModal, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {ShopAccountService} from "../../../../shared/services/shop.account.service";
import {AccountLiteListModel} from "../../../../shared/models/channels/account-lite-list-model";
import {OrderDetailModalComponent} from "../modals/order-detail-modal/order-detail-modal.component";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
import {DetailsComponent} from '../../../purchase/components/modals/details/details.component';

@Component({
  selector: 'app-pending-allocation',
  templateUrl: './pending-allocation.component.html',
  styleUrls: ['./pending-allocation.component.scss', '../../style.scss'],
  providers: [WarehouseService, OrderAllocationService, ShopAccountService]
})
export class PendingAllocationComponent extends AuthorityComponent implements OnInit {
  public options: Select2Options = {multiple: true};
  public value: any[];
  public current: string;


  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  lostOrder: any = {
    'three': 0,
    'five': 0,
    'seven': 0,
    'ten': 0,
    'more': 0,
  }

  items: PendingGroupAllocationOrderListModel[] = [];

  supportChannelTypes: ChannelTypeName[] = [];
  supportFilterCountries: CommonOptionModel[] = [];


  isReturn: CommonOptionModel[] = [{text: '全部', value: null},
    {text: '是', value: true}, {text: '否', value: false}];

  suppprtSearchTimeTypes: CommonOptionModel[] = [{text: '下单时间', value: 'OrderedTime'},
    {text: '付款时间', value: 'PaiedTime'}];

  suppprtTimeValueTypes: CommonOptionModel[] = [{text: '全部', value: null},
    {text: '今天', value: 'Today'}, {text: '昨天', value: 'Yesterday'}, {text: '7天以内', value: 'Within7Days'},
    {text: '30天以内', value: 'Within30Days'}, {text: '自定义', value: 'Custom'}];

  suppprtSearchTypes: CommonOptionModel[] = [{text: '订单号', value: 'OrderNumber'},
    {text: '买家账号', value: 'BuyerAccount'}, {text: '买家姓名', value: 'BuyerName'}, {text: '邮编', value: 'Postcode'},
    {text: 'Sku', value: 'Sku'}];

  constructor(public activerouter: ActivatedRoute, public router: Router, private modalService: NgbModal,
              private shopAccountService: ShopAccountService,
              private warehouseService: WarehouseService,
              private orderAllocationService: OrderAllocationService) {
    super(activerouter, router);
    const types = SiteConst.supportChannelTypes;

    this.supportChannelTypes = types.map(x => x);
    this.supportChannelTypes.unshift({displayName: '全部', code: ''});

    this.supportFilterCountries = SiteConst.supportFilterCountries.filter(m => m.text != null);
    this.supportFilterCountries.unshift({text: '全部', value: ''});


  }

  //右上方切换筛选搜索
  //0 筛选 1搜索
  seekmode = 0;

  seekMode(i) {
    this.seekmode = i;
    if (this.seekmode == 0) {
      this.searchText = null;
    }
  }

  displaynum = 0;

  DisplayNum() {
    this.displaynum ? this.displaynum = 0 : this.displaynum = 1;
  }


  tagselected;//销售渠道详细展示

  searchMore: boolean = false;//高级筛选按钮状态

  modalstate = 0;

  selectOrderIds: number[] = [];
  isCheckAllPages: boolean = false;
  selectedChannelType: string;
  selectedChannelId: number;
  selectChannelIds: any[]= [];
  selectedTimeFiltType: string;
  selectedTimeValueType: string;

  ngTimeSearchStart: any = {};
  ngTimeSearchEnd: any = {};
  ngShortTimeStart: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  ngShortTimeEnd: NgbTimeStruct = {hour: 0, minute: 0, second: 0};

  timeSearchStart: string = '';

  timeSearchEnd: string = '';

  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  selectIsReturn: boolean;
  selectCountryCode: string;

  selectSearchType: string;
  searchText: string;
  selectedSsId: number;

  shopAccouns: AccountLiteListModel[] = [];
  amazonAccounts: AccountLiteListModel[] = [];
  selectedWarehouseId: number;
  allWarehouses: WarehouseOptionModel[] = [];

  selectPackageCombineType: string = 'None';
  isAllocationOrder: boolean = false;

  accountItems: Array<any> = [];
  selectedChannelIds: number[] = [];
  ngOnInit() {
    this.shopAccountService.getAllAccountLiteList().subscribe(data => {
      this.shopAccouns = data.content;
      /* this.amazonAccounts = this.shopAccouns.filter(m => m.channelType === 'Amazon');


      this.amazonAccounts.forEach(element => {
        this.accountItems.push({ id: element.channelId, text: element.displayName });
      }); */


    }, this.handleError);

    this.warehouseService.getAllOptions().subscribe(data => {

      this.allWarehouses = data.content;
      this.selectedWarehouseId = this.allWarehouses[0].warehouseId;
      this.loadData();
    });
  }

  loadData(pageNumber: number = 1) {
    const channelIdString = this.selectChannelIds.join(',');

    //清理欠票统计数量
    this.clearLostOrder();
    this.orderAllocationService.getPendingAllocationOrders(pageNumber, this.pageSize, this.selectedWarehouseId,
      this.selectedChannelType, this.selectedChannelId, this.selectIsReturn, this.selectCountryCode, null,
      this.selectedSsId, this.selectedTimeFiltType, this.selectedTimeValueType,
      this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText, channelIdString)
      .subscribe(data => {
        const pageData = data.content;
        this.items = pageData.items;
        console.log(this.items);

        for (let o of this.items) {
          let number = 0;
          for (let list of o.orderOutOfStockQuantityList) {
            if (number == 0) {
              this.lostOrder.three = list;
            }
            else if (number == 1) {
              this.lostOrder.five = list;
            }
            else if (number == 2) {
              this.lostOrder.seven = list;
            }
            else if (number == 3) {
              this.lostOrder.ten = list;
            }
            else if (number == 4) {
              this.lostOrder.more = list;
            }
            number++;
          }
          break;
        }

        this.pageNumber = pageData.pageInfo.pageIndex + 1;
        this.pageSize = pageData.pageInfo.pageSize;
        this.total = pageData.pageInfo.totalCount;
      });
  }

  clearLostOrder() {
    this.lostOrder.three = 0;
    this.lostOrder.five = 0;
    this.lostOrder.seven = 0;
    this.lostOrder.ten = 0;
    this.lostOrder.more = 0;
  }

  pageChanged(pN: number): void {
    $('html, body').animate({scrollTop: 0}, 0);
    this.loadData(pN);
  }

  reloadData() {
    this.loadData(this.pageNumber);
  }

  SearchMore() {
    this.searchMore = !this.searchMore;
  }


  ModalState() {
    this.searchText = null;
    this.modalstate ? this.modalstate = 0 : this.modalstate = 1;
  }

  openOrderDetailModal(orderId: number) {
    console.info(orderId);
    const searchModal = this.modalService.open(OrderDetailModalComponent, {size: 'sm', backdrop: 'static'});
    searchModal.componentInstance.orderId = orderId;
    searchModal.result.then(result => {
      this.reloadData();
    }, reason => {
    })
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
      this.isCheckAllPages = false;
    }
  }

  onCheckAllOrderChanged(checked: boolean) {
    if (checked) {
      this.selectOrderIds = [];
      for (let g of this.items) {
        for (let o of g.orders) {
          this.selectOrderIds.push(o.id);
        }
      }
    }
    else {
      this.selectOrderIds = [];
      this.isCheckAllPages = false;
    }
  }

  onCheclAllPageChange(checked: boolean) {
    if (checked) {
      this.selectOrderIds = [];
      for (let gitem of this.items) {
        for (let o of gitem.orders) {
          this.selectOrderIds.push(o.id);
        }
      }
      this.isCheckAllPages = true;
    }
    else {
      this.selectOrderIds = [];
      this.isCheckAllPages = false;
    }
  }

  onSelectChannelType(channelType: string) {
    this.accountItems = [{id: 0, text: '全部'}];
    this.shopAccouns.filter(m => m.channelType === channelType).forEach(element => {
      this.accountItems.push({id: element.channelId, text: element.displayName});
    });


    if (channelType != this.selectedChannelType) {
      this.selectedChannelId = null;
      this.selectChannelIds = [];
    }

    this.selectedChannelType = channelType;

    this.doSearch();
  }

  onSelectChannelId(channelId: any) {

    console.info(channelId);
    this.selectedChannelId = channelId;

    this.doSearch();
  }

  isShowChannelAccount(channelType: string): boolean {
    return this.selectedChannelType == channelType;
  }

  onIsReturn(isReturn: boolean) {
    this.selectIsReturn = isReturn;
    this.doSearch();
  }

  onSelectCountry(countryCode: string) {
    this.selectCountryCode = countryCode;
    this.doSearch();
  }


  onSelectTimeSearchType(timeSearchType: string) {
    this.selectedTimeFiltType = timeSearchType;
    if (this.selectedTimeValueType != null && this.selectedTimeValueType.length > 0) {
      this.loadData();
    }
  }

  onSelectTimeValueType(timeValue: string) {
    this.selectedTimeValueType = timeValue;

    if (timeValue != 'Custom') {
      this.loadData();
    }
    if (timeValue === 'Custom') {
      this.dateTransition();
    }
  }

  onSelectWarehouse(warehouseId: number) {
    this.selectedWarehouseId = warehouseId;
    this.loadData();
  }

  doSearch() {
    this.loadData();
  }

  dateTransition() {
    if (this.ngTimeSearchStart.year && this.ngShortTimeStart) {
      this.timeSearchStart = this.ngTimeSearchStart.year + '-' + this.ngTimeSearchStart.month + '-' + this.ngTimeSearchStart.day + ' ' +
        this.ngShortTimeStart.hour + ':' + this.ngShortTimeStart.minute + ':' + this.ngShortTimeStart.second;

    } else {
      this.timeSearchStart = '';
    }
    if (this.ngTimeSearchEnd.year && this.ngShortTimeEnd) {
      this.timeSearchEnd = this.ngTimeSearchEnd.year + '-' + this.ngTimeSearchEnd.month + '-' + this.ngTimeSearchEnd.day + ' ' +
        this.ngShortTimeEnd.hour + ':' + this.ngShortTimeEnd.minute + ':' + this.ngShortTimeEnd.second;
    } else {
      this.timeSearchEnd = '';
    }
  }

  doTimeSearch() {
    this.dateTransition();

    if (this.timeSearchStart == null || this.timeSearchStart.length < 1) {
      this.error("开始时间不能为空")
      return;
    }
    if (this.timeSearchEnd == null || this.timeSearchEnd.length < 1) {
      this.error("结束时间不能为空")
      return;
    }
    this.loadData();
  }

  onSelectPackageCombineType(combineType: string) {
    this.selectPackageCombineType = combineType;

  }

  onSelectSearchType(type: string) {
    this.selectSearchType = type;
  }

  doGeneratePackage(orderId: number, $event) {
    $event.innerText = '配货中';
    this.isAllocationOrder = true;

    this.orderAllocationService.generatePackage(orderId, this.selectedWarehouseId).subscribe(data => {
      const result = data.content;
      if (result.totalCount == result.successCount) {
        this.alertMessage("配货成功", 2000);
      }
      else {
        this.warnMessage("配货失败", 2000);
      }


      this.isAllocationOrder = false;
      $event.innerText = '配货';

      this.reloadData();
    }, e => {
      this.isAllocationOrder = false;
      $event.innerText = '配货';
      this.handleError(e);
    });


  }

  doGeneratePackages($event) {
    $event.innerText = '配货中';
    if (this.selectOrderIds.length == 0) {
      this.error('请选择需要配货的订单');
      $event.innerText = '配货';
      return;
    }
    this.isAllocationOrder = true;
    const orderIds = this.isCheckAllPages ? [] : this.selectOrderIds;

    this.orderAllocationService.generatePackages(this.selectedWarehouseId,
      this.selectedChannelType, this.selectedChannelId, this.selectIsReturn, this.selectCountryCode,
      null,
      this.selectedSsId,
      this.selectedTimeFiltType,
      this.selectedTimeValueType,
      this.timeSearchStart,
      this.timeSearchEnd,
      this.selectSearchType,
      this.searchText,
      orderIds,
      this.selectPackageCombineType
    )
      .subscribe(data => {
        let result = data.content;
        if (result.totalCount == result.successCount) {
          this.alertMessage("全部配货成功");
        }
        else {
          let txt = `配货成功:${result.successCount}个,失败:${result.failedCount}个`;
          this.warnMessage(txt);
        }
        this.isAllocationOrder = false;
        $event.innerText = '配货';
        this.isCheckAllPages = false;
        this.selectOrderIds = [];
        this.reloadData();
      }, e => {
        this.isAllocationOrder = false;
        $event.innerText = '配货';
        this.handleError(e);

      });
  }


  selectOrderSearchStatus: string;
  orderBatchsearchType: string = 'OrderNumber';
  orderBatchsearchText: string;

  doOrderBatchSearch() {
    this.selectedChannelType = null;
    this.selectedChannelId = null;
    this.selectOrderSearchStatus = null;
    this.selectSearchType = null;
    this.searchText = null;
    if (this.orderBatchsearchType == null) {
      this.orderBatchsearchType = 'OrderNumber';
    }
    this.loadData();
    this.ModalState();
  }

  onSelectdoOrederBatchSearchType(vaule: string) {
    this.orderBatchsearchType = vaule;
  }


  openDetailsModal(id: any) {
    const activeModal = this.modalService.open(DetailsComponent, {size: 'lg', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = "1688订单详情";
    activeModal.componentInstance.platOrderId = id;
    activeModal.result.then(result => {
      if (result != undefined) {
        console.log(result);
      }
    })
  }


  onChanged(data: { value }, element) {    
    // if (data.value.indexOf('0') >= 0) {      
    //   element.setElementValue('0');
    //   data.value = ['0'];
    // }
    if (data.value.indexOf('0') >= 0) {
      element.setElementValue('0');
      data.value = ['0'];
      this.selectChannelIds = [];
    }
    else {
      this.selectChannelIds = data.value;
    }
    this.doSearch();
  }
}
