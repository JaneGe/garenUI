import {Component, OnInit, Input, animate, style, transition, trigger, state, HostListener} from '@angular/core';
import {OutputModalComponent} from '../modals/outputModal/outputModal.component';
import {OrderInfoService} from "../../../../shared/services/order.service";
import {PackageModalComponent} from '../modals/packageModal/packageModal.component';
import {NgbModal, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {WarehouseService} from "../../../../shared/services/warehouse-service";
import {RootComponent} from "../../../../shared/component/root.component";
import {ShippingMethodService} from "../../../../shared/services/shipping-method-service";
import {SiteConst, ChannelTypeName} from "../../../../shared/services/site-const";
import {ShippingTrackService} from "app/shared/services/shipping-track-service";
import {ShippingDetailsComponent} from "./shipping-details/shipping-details.component";
import {AccountLiteListModel} from 'app/shared/models/channels/account-lite-list-model';
import {AccountListService} from "../../../statistics/orderStatistics/order-head/accountList.service";
import {ShopAccountService} from "app/shared/services/shop.account.service";

class SelectOptionModel {
  value: string;
  name: string;
}

export class CommonOptionModel {
  text: string;
  value: any;
  count?: any;
}

@Component({
  selector: 'app-shippingTrack',
  templateUrl: './shippingTrack.component.html',
  styleUrls: ['./shippingTrack.component.scss', '../../style.scss'],
  providers: [OrderInfoService, ShippingMethodService, WarehouseService, ShippingTrackService, AccountListService,ShopAccountService]
})

export class ShippingTrackComponent extends RootComponent implements OnInit {

  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };
  supportChannelTypes: ChannelTypeName[] = [];

  warehouse: CommonOptionModel[] = [{text: '全部', value: null},
    {text: '东莞', value: 'dongguan'}];


  allTrackingOrderStatus: CommonOptionModel[] = [{text: '全部', value: null, count: 0},
    {text: '待上网', value: 'PendingOnline', count: 0}, {text: '运输途中', value: 'InTransit', count: 0}, {
      text: '成功签收',
      value: 'SuccessDelivered',
      count: 0
    },
    {text: '到达待取', value: 'WaitDelivery', count: 0}, {text: '运输过久', value: 'Expired', count: 0}, {
      text: '投递失败',
      value: 'FailedAttempt',
      count: 0
    },
    {text: '可能异常', value: 'Exception', count: 0}];

  suppprtTimeValueTypes: CommonOptionModel[] = [{text: '全部', value: null},
    {text: '今天', value: 'Today'}, {text: '昨天', value: 'Yesterday'}, {text: '7天以内', value: 'Within7Days'},
    {text: '30天以内', value: 'Within30Days'}, {text: '自定义', value: 'Custom'}];

  suppprtSearchTypes: SelectOptionModel[] = [
    {name: '订单号', value: 'OrderNumber'},
    {name: '跟踪号', value: 'TrackingNumber'},
    {name: '包裹号', value: 'PackageNumber'},
  ];
  supportFilterCountries: CommonOptionModel[] = [];

  selectedWarehouseId: number;
  warehouseAllShippingService;
  allWarehouses;

  selectTrackingOrderStatus: string;
  selectShippingServiceId: number;
  selectCountryCode: string;
  selectedTimeValueType: string;

  ngTimeSearchStart: any = {};
  ngTimeSearchEnd: any = {};
  ngShortTimeStart: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  ngShortTimeEnd: NgbTimeStruct = {hour: 0, minute: 0, second: 0};

  timeSearchStart: string = '';

  timeSearchEnd: string = '';

  selectShippingTrackIds: number[] = [];
  isCheckAllPages: boolean = false;

  items: any[] = [];
  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  searchText: string;
  batchsearchText: string;
  searchType: string = 'OrderNumber';
  batchsearchType: string = 'OrderNumber';


  constructor(public http: Http,
              private modalService: NgbModal,
              private orderInfoService: OrderInfoService,
              private shippingMethodService: ShippingMethodService,
              private warehouseService: WarehouseService,
              private shippingTrackService: ShippingTrackService,
              private accountListService: AccountListService,
              private shopAccountService: ShopAccountService,) {
    super();

    const types = SiteConst.supportChannelTypes;

    this.supportChannelTypes = types.map(x => x);
    this.supportChannelTypes.unshift({displayName: '全部', code: ''});

    this.supportFilterCountries = SiteConst.supportFilterCountries.filter(m => m.text != null);
    this.supportFilterCountries.unshift({text: '全部', value: ''});
  }

  seekmode = 0;

  seekMode(i) {
    this.seekmode = i;
  }

  searchMore: boolean = false;

  modalstate = 0;

  dataState = false;


  ngOnInit() {
    this.shopAccountService.getAllAccountLiteList().subscribe(data => {
      this.shopAccouns = data.content;
    }, this.handleError);

    this.warehouseService.getAllOptions().subscribe(data => {
      this.allWarehouses = data.content;
      this.allWarehouses.unshift({ ishasImportant: false, name: "全部", warehouseId: null })

      this.shippingMethodService.getWarehouseAllSelectedShippingService(this.selectedWarehouseId).subscribe(data => {
        this.warehouseAllShippingService = data.content;
      });
      this.loadData();
    });

   // this.loadData();
  }

  loadData(pageNumber: number = 1) {

    const channelIdString = this.selectChannelIds.join(',');

    this.shippingTrackService.getPageList(this.selectTrackingOrderStatus, this.selectShippingServiceId,
      this.selectCountryCode, this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
      this.batchsearchType, this.batchsearchText,
      this.searchText, this.searchType, pageNumber, this.pageSize,this.selectedWarehouseId, this.selectedChannelType,channelIdString).subscribe(data => {

      this.items = data.content.items;
      console.log(this.items);

      const pageInfo = data.content.pageInfo;

      this.pageSize = pageInfo.pageSize;
      this.pageNumber = pageInfo.pageIndex + 1;
      this.total = pageInfo.totalCount;
    }, this.handleError);

    this.shippingTrackService.getTrackingOrderCountByStatus().subscribe(data => {

      const statistices = data.content;
      for (const i in this.allTrackingOrderStatus) {
        let item = statistices.find(f => f.status == this.allTrackingOrderStatus[i].value);
        if (item) {
          this.allTrackingOrderStatus[i].count = item.totalCount;
        }
      }

    }, this.handleError);

  }


  pageChanged(pN: number): void {
    $('html, body').animate({scrollTop: 0}, 0);
    this.dataState = false;
    this.loadData(pN);
  }

  reloadData() {
    this.loadData(this.pageNumber);
  }

  onSelect($event, i) {
    if ($event.innerText === '自定义') {
      this.selectedTimeValueType = 'Custom';
      this.dateTransition();
    } else {
      this.selectedTimeValueType = '';
    }
  }


  SearchMore() {
    this.searchMore = !this.searchMore
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


  ModalState() {
    this.selectTrackingOrderStatus = null;
    this.selectShippingServiceId = null;
    this.selectCountryCode = null;
    this.selectedTimeValueType = null;

    this.timeSearchStart = '';
    this.timeSearchEnd = '';
    this.searchText = null;
    this.searchType = 'OrderNumber';
    if (this.modalstate) {
      this.modalstate = 0;
      $('body').removeClass('modal-open');
    } else {
      this.modalstate = 1;
      $('body').addClass('modal-open');
    }
  }


  openOutputModal() {
    const outputModal = this.modalService.open(OutputModalComponent,
      {size: 'sm', backdrop: 'static'});
  }

  openPackageDetailModal(packageId: number) {
    const searchModal = this.modalService.open(PackageModalComponent, {size: 'lg', backdrop: 'static'});
    searchModal.componentInstance.modalHeader = '包裹详情';
    searchModal.componentInstance.packageId = packageId;
    searchModal.result.then(result => {
      this.reloadData();
    }, reason => {
    })
  }


  doSearch() {
    this.ClearBatchSearchText();
    this.loadData();
  }

  doTrackBatchSearch() {
    this.pageSize = 20;
    this.loadData();
    this.ModalState();
  }

  onSelectTrackingOrderStatus(status: string) {
    this.selectTrackingOrderStatus = status;
    this.doSearch();
  }

  onSelectWarehouse(warehouseId: number) {
    this.selectedWarehouseId = warehouseId;
    console.log(this.selectedWarehouseId);
    this.doSearch();
  }

  onSelectShippingService(ssId: number) {
    this.selectShippingServiceId = ssId;
    this.doSearch();
  }

  onSelectCountry(countryCode: string) {
    this.selectCountryCode = countryCode;
    this.doSearch();
  }

  onSelectTimeValueType(timeValue: string) {
    this.selectedTimeValueType = timeValue;
    this.ClearBatchSearchText();
    if (timeValue != 'Custom') {
      this.loadData();
    }
  }

  doTimeSearch() {
    this.dateTransition();

    if (this.timeSearchStart == null || this.timeSearchStart.length < 1) {
      this.error("开始时间不能为空");
      return;
    }
    if (this.timeSearchEnd == null || this.timeSearchEnd.length < 1) {
      this.error("结束时间不能为空");
      return;
    }
    this.ClearBatchSearchText();
    this.loadData();
  }

  onSearchTypeSelect($event, selectSearchType: string) {
    this.searchType = selectSearchType;
  }

  onSelectdoBatchSearchType(vaule: string) {
    this.batchsearchType = vaule;
  }

  ClearBatchSearchText() {
    this.batchsearchText = null;
    this.batchsearchType = null;
  }

  onCheclAllPageChange(checked: boolean) {
    if (checked) {
      this.selectShippingTrackIds = [];
      for (let o of this.items) {
        this.selectShippingTrackIds.push(o.id);
      }
      this.isCheckAllPages = true;
    }
    else {
      this.selectShippingTrackIds = [];
      this.isCheckAllPages = false;
    }
  }

  onCheckAllPackageChanged(checked: boolean) {
    if (checked) {
      this.selectShippingTrackIds = [];
      for (let o of this.items) {
        this.selectShippingTrackIds.push(o.id);
      }
    }
    else {
      this.selectShippingTrackIds = [];
      this.isCheckAllPages = false;
    }
    console.info(this.selectShippingTrackIds);
  }

  onCheckPackageChanged(isChecked: boolean, trackId: number) {
    if (isChecked) {
      const orderIndex = this.selectShippingTrackIds.indexOf(trackId);
      if (orderIndex >= 0) {
        return;
      }
      else {
        this.selectShippingTrackIds.push(trackId);
      }
    }
    else {
      const orderIndex = this.selectShippingTrackIds.indexOf(trackId);
      if (orderIndex >= 0) {
        this.selectShippingTrackIds.splice(orderIndex, 1);
      }
      this.isCheckAllPages = false;
    }
  }

  openDetalModal(trackingOrderId: number) {
    const modal = this.modalService.open(ShippingDetailsComponent, {backdrop: 'static', size: 'lg'});
    modal.componentInstance.trackingOrderId = trackingOrderId;
    modal.result.then(() => {

    }, () => {
    });
  }


  /* 销售渠道  账号筛选  */
  public options: Select2Options = {multiple: true};
  public value: any[];
  public current: string;
  accountItems: Array<any> = [];
  selectedChannelType: string;
  shopAccouns: AccountLiteListModel[] = [];
  selectedChannelId: number;
  selectChannelIds: any[] = [];

  isShowChannelAccount(channelType: string): boolean {
    return this.selectedChannelType == channelType;
  }

  onSelectChannelType(channelType: string) {
    this.accountItems = [{ id: 0, text: '全部' }];
    this.shopAccouns.filter(m => m.channelType === channelType).forEach(element => {
      this.accountItems.push({ id: element.channelId, text: element.displayName });
    });


    if (channelType != this.selectedChannelType) {
      this.selectedChannelId = null;
      this.selectChannelIds = [];
    }

    this.selectedChannelType = channelType;

    this.doSearch();
  }
  onChanged(data: { value }, element) {
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

