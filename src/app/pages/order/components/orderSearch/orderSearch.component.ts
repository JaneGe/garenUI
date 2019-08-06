import { Component, OnInit } from '@angular/core';
import { OrderInfoService } from "../../../../shared/services/order.service";
import { NgbModal, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { ShopAccountService } from "../../../../shared/services/shop.account.service";
import { RootComponent } from "../../../../shared/component/root.component";
import { AccountLiteListModel } from "../../../../shared/models/channels/account-lite-list-model";
import { OrderService } from "../../../../shared/services/order-service";
import { AllOrderListModel } from "../../../../shared/models/orders/all-order-list-model";
import { SiteConst, ChannelTypeName, CommonOptionModel } from "../../../../shared/services/site-const";
import { OrderDetailModalComponent } from "../modals/order-detail-modal/order-detail-modal.component";
import { OutputModalComponent } from "../modals/outputModal/outputModal.component";
import { AddHandworkModalComponent } from "../modals/add-handwork-modal/add-handwork-modal.component";
import { InHandworkModalComponent } from "../modals/in-handwork-modal/in-handwork-modal.component";
import { AuthorityComponent } from "../../../../shared/component/authority.component";
import { ActivatedRoute, Router } from "@angular/router";
import { SendMailModalComponent } from '../modals/send-mail-modal/send-mail-modal.component';
import {ImgPreviewModalComponent} from "../../../../theme/components/img-preview-modal/img-preview-modal.component";

@Component({
  selector: 'app-orderSearch',
  templateUrl: './orderSearch.component.html',
  styleUrls: ['./orderSearch.component.scss', '../../style.scss'],
  providers: [OrderInfoService, ShopAccountService, OrderService]
})
export class OrderSearchComponent extends AuthorityComponent implements OnInit {
  public options: Select2Options = { multiple: true };
  public value: any[];
  public current: string;

  orderinfo = [];// table订单信息

  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  items: AllOrderListModel[] = [];

  supportChannelTypes: ChannelTypeName[] = [];
  supportFilterCountries: CommonOptionModel[] = [];
  filterHasNotes: CommonOptionModel[] = [
    { text: '全部', value: null },
    { text: '有备注', value: true },
    { text: '无备注', value: false }
  ];

  iffeedBacks: CommonOptionModel[] = [
    { text: '全部', value: null },
    { text: '是', value: true },
    { text: '否', value: false }
  ];

  allOrderSearchStatus: CommonOptionModel[] = [
    { text: '全部', value: null },
    { text: '已付款', value: 'Paid' },
    { text: '已审核', value: 'Apporved' },
    { text: '已分配', value: 'Allocated' },
    { text: '已配货', value: 'PackageAllocated' },
    { text: '已打印', value: 'Printed' },
    { text: '已发货', value: 'Shipped' },
    { text: '已合并', value: 'Merged' },
    { text: '已作废', value: 'Voided' },
    { text: '已忽略', value: 'Ignored' },
    { text: '已锁定', value: 'IsLocked' },
    { text: '异常订单', value: 'HasException' },
    { text: '补发订单', value: 'Reissue' },
    { text: '合并订单', value: 'Merge' },
    { text: '拆分订单', value: 'Split' }
  ];

  suppprtSearchTimeTypes: CommonOptionModel[] = [
    { text: '下单时间', value: 'OrderedTime' },
    { text: '付款时间', value: 'PaiedTime' },
    { text: '发货时间', value: 'ShippedTime' },
    { text: '回传时间', value: 'FeedBackTime' }
  ];

  suppprtTimeValueTypes: CommonOptionModel[] = [
    { text: '全部', value: null },
    { text: '今天', value: 'Today' },
    { text: '昨天', value: 'Yesterday' },
    { text: '7天以内', value: 'Within7Days' },
    { text: '30天以内', value: 'Within30Days' },
    { text: '自定义', value: 'Custom' }
  ];

  suppprtSearchTypes: CommonOptionModel[] = [
    { text: '订单号', value: 'OrderNumber' },
    { text: '买家账号', value: 'BuyerAccount' },
    { text: '买家姓名', value: 'BuyerName' },
    { text: '邮编', value: 'Postcode' },
    { text: 'Sku', value: 'Sku' },
    { text: '跟踪号码', value: 'TrackingNumber' },
    { text: '物流转单号', value: 'SpPackageId' },
    { text: '电话号码', value: 'PhoneNumber' }
  ];
  selectChannelIds: any[] = [];

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
  constructor(public http: Http,
    private modalService: NgbModal,
    private orderInfoService: OrderInfoService,
    private shopAccountService: ShopAccountService,
    private orderService: OrderService,
    public activerouter: ActivatedRoute,
    public router: Router,) {
    super(activerouter, router);
    const types = SiteConst.supportChannelTypes;

    this.supportChannelTypes = types.map(x => x);
    this.supportChannelTypes.unshift({ displayName: '全部', code: '' });

    this.supportFilterCountries = SiteConst.supportFilterCountries.filter(m => m.text != null);
    this.supportFilterCountries.unshift({ text: '全部', value: '' });
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

  //右上方切换筛选搜索
  //0 筛选 1搜索
  seekmode = 0;

  seekMode(i) {
    this.seekmode = i;
    if (this.seekmode == 0) {
      this.searchText = null;
    }
  }

  tagselected;//销售渠道详细展示

  searchMore = 0;//高级筛选按钮状态

  modalstate = 0;

  dataState = false;

  selectOrderIds: number[] = [];
  isCheckAllPages: boolean = false;
  selectedChannelType: string;
  selectedChannelId: number;
  selectedCountryCode: string;
  selectedHasNote: string;
  selectedIfFeedBack: string;
  selectedTimeFiltType: string = 'OrderedTime';
  selectedTimeValueType: string;

  ngTimeSearchStart: any = {};
  ngTimeSearchEnd: any = {};
  ngShortTimeStart: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  ngShortTimeEnd: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  timeSearchStart: string = '';

  timeSearchEnd: string = '';
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  selectCountryCode: string;
  selectOrderSearchStatus: string;

  selectSearchType: string = 'OrderNumber';
  searchText: string;

  shopAccouns: AccountLiteListModel[] = [];
  amazonAccounts: AccountLiteListModel[] = [];

  orderBatchsearchType: string = 'OrderNumber';
  orderBatchsearchText: string;

  accountItems: Array<any> = [];
  ngOnInit() {
    this.shopAccountService.getAllAccountLiteList().subscribe(data => {
      this.shopAccouns = data.content;
    }, this.handleError);
    this.loadData();
  }

  loadData(pageNumber: number = 1) {

    let outTimeStart = this.timeSearchStart;
    let outTimeEnd = this.timeSearchEnd;

    const channelIdString = this.selectChannelIds.join(',');

    this.orderService.searchOrderList(
      pageNumber,
      this.pageSize,
      this.selectedIfFeedBack,
      this.selectedHasNote,
      this.selectedChannelType,
      this.selectedChannelId,
      this.selectCountryCode,
      this.selectOrderSearchStatus,
      this.selectedTimeFiltType,
      this.selectedTimeValueType,
      outTimeStart,
      outTimeEnd,
      this.selectSearchType,
      this.searchText,
      this.orderBatchsearchType,
      this.orderBatchsearchText,
      channelIdString
    )
      .subscribe(data => {
        const pageData = data.content;

        this.items = pageData.items;
        console.log(this.items);
        this.chooseMarketplaceId();
        this.pageNumber = pageData.pageInfo.pageIndex + 1;
        this.pageSize = pageData.pageInfo.pageSize;
        this.total = pageData.pageInfo.totalCount;
        //this.searchText = null;
      }, this.handleError);

  }

  pageChanged(pN: number): void {
    $('html, body').animate({ scrollTop: 0 }, 0);
    this.dataState = false;
    this.loadData(pN);
  }

  reloadData() {
    this.loadData(this.pageNumber);
  }

  onSelect($event, i) {
    //console.log($event.innerText);
    if (i != undefined) {
      this.tagselected = i;
    }
  }

  SearchMore() {
    if (this.searchMore === 1) {
      this.searchMore = 0;
    } else {
      this.searchMore = 1;
    }
  }

  ModalState() {
    this.selectedIfFeedBack = null;
    this.selectedHasNote = null;
    this.selectedChannelType = null;
    this.selectedChannelId = null;
    this.selectCountryCode = null;
    this.selectOrderSearchStatus = null;
    this.selectedTimeFiltType = 'OrderedTime';
    this.selectedTimeValueType = null;
    this.timeSearchStart = '';
    this.timeSearchEnd = '';
    this.selectSearchType = 'OrderNumber';
    this.searchText = null;
    if (this.modalstate) {
      this.modalstate = 0;
      $('body').removeClass('modal-open');
    } else {
      this.modalstate = 1;
      $('body').addClass('modal-open');
      this.orderBatchsearchType = 'OrderNumber';
    }
  }

  openOrderDetailModal(orderId: number) {
    const searchModal = this.modalService.open(OrderDetailModalComponent, { size: 'sm', backdrop: 'static' });
    searchModal.componentInstance.modalHeader = '编辑订单';
    searchModal.componentInstance.orderId = orderId;
    searchModal.result.then(result => {
      if (result === 1) {
        this.reloadData();
      }
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
      for (let o of this.items) {
        this.selectOrderIds.push(o.id);
      }
    }
    else {
      this.selectOrderIds = [];
      this.isCheckAllPages = false;
    }
    //console.info(this.selectOrderIds);
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

  onSelectChannelId(channelId: number) {

    this.selectedChannelId = channelId;

    this.doSearch();
  }

  isShowChannelAccount(channelType: string): boolean {
    return this.selectedChannelType == channelType;
  }

  onSelectCountry(countryCode: string) {
    this.selectCountryCode = countryCode;

    this.doSearch();
  }

  onSelectHasNote(hasNote: string) {
    this.selectedHasNote = hasNote;
    this.doSearch();
  }
  onIfFeedBack(ifFeedBack: string) {
    this.selectedIfFeedBack = ifFeedBack;
    this.doSearch();
  }

  onSelectOrderStatus(status: string) {
    this.selectOrderSearchStatus = status;

    this.doSearch();
  }

  onSelectTimeSearchType(timeSearchType: string) {
    this.selectedTimeFiltType = timeSearchType;
    this.ClearBatchSearchText();
    if (this.selectedTimeValueType != null && this.selectedTimeValueType.length > 0) {
      this.loadData();
    }
  }

  onSelectTimeValueType(timeValue: string) {
    this.selectedTimeValueType = timeValue;
    this.ClearBatchSearchText();
    if (timeValue != 'Custom') {
      this.loadData();
    } if (timeValue === 'Custom') {
      this.dateTransition();
    }
  }


  doSearch() {
    this.ClearBatchSearchText();
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
    // if (typeof this.timeSearchEnd !== 'string') {
    //   this.timeSearchEnd.setDate(this.timeSearchEnd.getDate() + 1);
    //   this.timeSearchEnd = this.timeSearchEnd.toJSON().toString().slice(0, 10);
    // }
  }

  doTimeSearch() {
    this.dateTransition();
    if (this.timeSearchStart == null || this.timeSearchStart.length < 1) {
      this.error("开始时间不能为空")
      return;
    }
    if (this.timeSearchEnd == null || this.timeSearchEnd.length < 1) {
      this.error("结束时间不能为空");
      return;
    }
    this.ClearBatchSearchText();
    this.loadData();
  }

  onSelectSearchType(type: string) {
    this.selectSearchType = type;
  }

  onSelectdoOrederBatchSearchType(vaule: string) {
    this.orderBatchsearchType = vaule;
  }

  ClearBatchSearchText() {
    this.orderBatchsearchText = null;
    this.orderBatchsearchType = null;
  }

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

  openOutputModal() {
    if (this.selectOrderIds.length == 0) {
      this.error("请选择需要导出的订单");
      return;
    }

    let queryData = {
      'channelType': this.selectedChannelType,
      'channelId': this.selectedChannelId,
      'countryCode': this.selectCountryCode,
      'isCompleteSales': this.selectedIfFeedBack,
      'hasNote': this.selectedHasNote,
      'orderSearchStatus': this.selectOrderSearchStatus,
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


    const exportModal = this.modalService.open(OutputModalComponent, { size: 'sm', backdrop: 'static' });
    if (this.isCheckAllPages) {
      exportModal.componentInstance.exportParams = queryData;
    }
    else {
      exportModal.componentInstance.orderIds = this.selectOrderIds;
    }

  }

  openInHandworkModal() {
    const searchModal = this.modalService.open(InHandworkModalComponent,
      { size: 'sm', backdrop: 'static' });
    searchModal.result.then(res => {
      this.reloadData();
    }, reason => {
    });
}

  openAddHandworkModal() {
    const searchModal = this.modalService.open(AddHandworkModalComponent,
      { size: 'sm', backdrop: 'static' });
    searchModal.result.then(re => {
      this.loadData();
    }, reason => {
    })
  }

  sendMail(orderId: any) {
    const modal = this.modalService.open(SendMailModalComponent,
      { size: 'sm', backdrop: 'static' });
    modal.componentInstance.orderId = orderId;
    modal.result.then(res => {
      this.reloadData();
    }, reason => {
    });
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
  openSkuImgDetail(){
    let modal=this.modalService.open(ImgPreviewModalComponent,{backdrop:'static',size:'lg'});
  }
}
