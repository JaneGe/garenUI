import {Component, OnInit, Input} from '@angular/core';
import {OrderInfoService} from "../../../../shared/services/order.service";
import {BackInfoModalComponent} from '../modals/BackInfoModal/BackInfoModal.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from 'rxjs/Observable';
import {ChannelTypeName, CommonOptionModel, SiteConst} from "../../../../shared/services/site-const";
import {RootComponent} from "../../../../shared/component/root.component";
import {AccountLiteListModel} from "../../../../shared/models/channels/account-lite-list-model";
import {ShopAccountService} from "../../../../shared/services/shop.account.service";
import {OrderService} from "../../../../shared/services/order-service";
import {OrderExceptionService} from "../../../../shared/services/orderException-service";
import {OrderDetailModalComponent} from "../modals/order-detail-modal/order-detail-modal.component";

export class ChannelTypeNames {
  displayName: string;
  code: string;
}


@Component({
  selector: 'app-postbacking',
  templateUrl: './postbacking.component.html',
  styleUrls: ['./postbacking.component.scss', '../../style.scss'],
  providers: [OrderInfoService, ShopAccountService, OrderService, OrderExceptionService]
})
export class PostbackingComponent extends RootComponent implements OnInit {
  tabChanged: boolean = true;

  postBackInfo = [];
  AdvancePostBackInfoo = [];

  dataNumber: number = 1;


  supportChannelTypes: ChannelTypeName[] = [];
  supportFilterCountries: CommonOptionModel[] = [];

  completeSalesStatus: CommonOptionModel[] = [{text: '等待回传', value: null},
    {text: '回传失败', value: 'Failed'}];

  completeSalesStatus2: CommonOptionModel[] = [{text: '全部', value: null}, {text: '可提前回传', value: 'AdvancePostBack'},
    {text: ' 需要获取跟踪号', value: 'NeedTrackingNumber'}, {text: '需要录入跟踪号', value: 'EntryTrackingNumber'}];

  suppprtSearchTimeTypes: CommonOptionModel[] = [{text: '下单时间', value: 'OrderedTime'},
    {text: '付款时间', value: 'PaiedTime'}, {text: '发货时间', value: 'ShippedTime'}];

  suppprtTimeValueTypes: CommonOptionModel[] = [{text: '全部', value: null},
    {text: '今天', value: 'Today'}, {text: '昨天', value: 'Yesterday'}, {text: '7天以内', value: 'Within7Days'},
    {text: '30天以内', value: 'Within30Days'}, {text: '自定义', value: 'Custom'}]

  suppprtSearchTypes: CommonOptionModel[] = [{text: '订单号', value: 'OrderNumber'},
    {text: '买家账号', value: 'BuyerAccount'}, {text: '买家姓名', value: 'BuyerName'}, {text: '邮编', value: 'Postcode'},
    {text: 'Sku', value: 'Sku'}];

  constructor(private modalService: NgbModal,
              private shopAccountService: ShopAccountService,
              private orderInfoService: OrderInfoService,
              private orderService: OrderService,
              private orderExceptionService: OrderExceptionService) {
    super();

    const types = SiteConst.supportChannelTypeNoManual;

    this.supportChannelTypes = types.map(x => x);
    this.supportChannelTypes.unshift({displayName: '全部', code: ''});

    this.supportFilterCountries = SiteConst.supportFilterCountries.filter(m => m.text != null);
    this.supportFilterCountries.unshift({text: '全部', value: ''});
  }


  //右上方切换筛选搜索
  seekmode = 0;

  seekMode(i) {
    this.seekmode = i;
  }

  displaynum = 0;

  DisplayNum() {
    this.displaynum ? this.displaynum = 0 : this.displaynum = 1;
  }

  // detail = DETAIL[0];

  tagselected;//销售渠道详细展示

  searchMore: boolean = false;//高级筛选按钮状态

  modalstate = 0;

  screen = [];//假数据数组

  dataSource: Observable<any>;

  dataState = false;

  selectedTimeValueType: string;

  timeSearchStart: any = new Date();
  timeSearchEnd: any = new Date();

  shopAccouns: AccountLiteListModel[] = [];
  amazonAccounts: AccountLiteListModel[] = [];

  items = [];

  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;

  selectOrderIds: number[] = [];
  selectedChannelType: string;
  selectedChannelId: number;
  selectCountryCode: string;
  selectedTimeFiltType: string;
  selectedCompleteSalesStatus: string;
  selectedCompleteSalesStatus2: string;

  selectSearchType: string;
  searchText: string;

  orderBatchsearchType: string = 'OrderNumber';
  orderBatchsearchText: string;

  isCheckAllPages: boolean = false;

  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  ngOnInit() {
    // this.postBackInfo = this.orderInfoService.getPostBackInfo();
    // this.AdvancePostBackInfoo = this.orderInfoService.getAdvancePostBackInfoo();
    // this.dataNumber = this.postBackInfo.length + 1;
    // this.screen.push(this.orderInfoService.getScreen());
    // console.log(this.screen);

    this.shopAccountService.getAllAccountLiteList().subscribe(data => {
      this.shopAccouns = data.content;
      this.amazonAccounts = this.shopAccouns.filter(m => m.channelType === 'Amazon');

    }, this.handleError);
    // this.selectedCompleteSalesStatus='Failed';
    this.loadData();

    this.timeSearchStart.setDate(this.timeSearchStart.getDate() - 1);

  }

  loadData(pageNumber: number = 1) {

    if (this.tabChanged) {
      this.orderService.GetOrderPostBackList(pageNumber, this.pageSize, this.selectedCompleteSalesStatus, this.selectedChannelType,
        this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
        this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
        this.orderBatchsearchType, this.orderBatchsearchText
      )
        .subscribe(data => {
          const pageData = data.content;
          this.items = pageData.items;

          this.pageNumber = pageData.pageInfo.pageIndex + 1;
          this.pageSize = pageData.pageInfo.pageSize;
          this.total = pageData.pageInfo.totalCount;
        });
    }
    else {
      this.orderService.GetOrderAdvancePostBackList(pageNumber, this.pageSize, this.selectedCompleteSalesStatus2, this.selectedChannelType,
        this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
        this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
        this.orderBatchsearchType, this.orderBatchsearchText
      )
        .subscribe(data => {
          const pageData = data.content;
          this.items = pageData.items;

          this.pageNumber = pageData.pageInfo.pageIndex + 1;
          this.pageSize = pageData.pageInfo.pageSize;
          this.total = pageData.pageInfo.totalCount;
        });
    }

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
    console.log($event.innerText);
    if (i != undefined) {
      this.tagselected = i;
    }

    if ($event.innerText === '自定义') {
      this.selectedTimeValueType = 'Custom';
        this.dateTransition();
    } else {
      this.selectedTimeValueType = '';
    }
  }

  SearchMore() {
    this.searchMore = !this.searchMore;
  }

  ModalState() {
    this.selectedChannelType = null;
    this.selectedChannelId = null;
    this.selectCountryCode = null;
    // this.selectedCompleteSalesStatus = null;
    this.selectedTimeFiltType = null;
    this.selectedTimeValueType = null;
    this.timeSearchStart = null;
    this.timeSearchEnd = null;
    this.selectSearchType = null;
    this.searchText = null;
    if (this.modalstate) {
      this.modalstate = 0;
      $('body').removeClass('modal-open');
    } else {
      this.modalstate = 1;
      $('body').addClass('modal-open');
      this.orderBatchsearchType = 'OrderNumber';
    }

    // if(this.modalstate) {
    //   this.modalstate = 0;
    //   $('body').removeClass('modal-open');
    // } else {
    //   this.modalstate = 1;
    //   $('body').addClass('modal-open');
    // }
  }

  dateTransition() {
    if (typeof this.timeSearchStart !== 'string') {
      this.timeSearchStart.setDate(this.timeSearchStart.getDate() + 1);
      this.timeSearchStart = this.timeSearchStart.toJSON().toString().slice(0, 10);
    }
    if (typeof this.timeSearchEnd !== 'string') {
      this.timeSearchEnd.setDate(this.timeSearchEnd.getDate() + 1);
      this.timeSearchEnd = this.timeSearchEnd.toJSON().toString().slice(0, 10);
    }
  }

  doTimeSearch() {
    this.dateTransition();

    this.loadData();
  }

  openModal(orderId: number) {
    const searchModal = this.modalService.open(OrderDetailModalComponent,
      {size: 'sm', backdrop: 'static'});
    searchModal.componentInstance.modalHeader = '编辑订单';
    searchModal.componentInstance.orderId = orderId;
    searchModal.result.then(result => {
      this.reloadData();
    }, reason => {
    })
  }

  openBackInfoModal(id: number) {
    const searchModal = this.modalService.open(BackInfoModalComponent,
      {size: 'sm', backdrop: 'static'});
    searchModal.componentInstance.orderId = id;
    searchModal.componentInstance.selectedCompleteSalesStatus = this.selectedCompleteSalesStatus;

    searchModal.result.then(result => {
      this.loadData();
    }, reason => {
    });
  }

  OrderNoPostBack(id: number) {
    this.selectOrderIds = [];
    this.selectOrderIds.push(id)
    this.confirm("确定不再回传订单?", () => {
      if (this.selectOrderIds == null || this.selectOrderIds.length == 0) {
        this.error("请选择操作订单!");
        return;
      }

      this.orderService.OrderNoPostBack(this.selectedCompleteSalesStatus,
        this.selectedChannelType,
        this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
        this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
        this.orderBatchsearchType, this.orderBatchsearchText,
        this.selectOrderIds
      ).subscribe(data => {
        this.alertMessage(data.content);
        this.loadData();
      }, this.handleError);


    })
  }

  NoComesBack(target: any) {
    // publicFunction.toggleSingleClass(target);
    this.confirm("确定不再回传订单?", () => {
      if (this.isCheckAllPages) {

        this.orderService.OrderNoPostBack(this.selectedCompleteSalesStatus,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          null
        ).subscribe(data => {
          this.alertMessage(data.content);
          this.loadData();
        }, this.handleError);


      }
      else {

        if (this.selectOrderIds == null || this.selectOrderIds.length == 0) {
          this.error("请选择操作订单!");
          return;
        }

        this.orderService.OrderNoPostBack(this.selectedCompleteSalesStatus,
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          this.selectOrderIds
        ).subscribe(data => {
          this.alertMessage(data.content);
          this.loadData();
        }, this.handleError);

      }
    })
  }

  AdvanceBackComesBack(target: any) {


    this.confirm("确定提前回传订单?", () => {

      if (this.isCheckAllPages) {

        this.orderService.OrderAdvancePostBack(
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          null
        ).subscribe(data => {
          this.alertMessage(data.content);
          this.loadData();
        }, this.handleError);


      }
      else {

        if (this.selectOrderIds == null || this.selectOrderIds.length == 0) {
          this.error("请选择操作订单!");
          return;
        }

        this.orderService.OrderAdvancePostBack(
          this.selectedChannelType,
          this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
          this.orderBatchsearchType, this.orderBatchsearchText,
          this.selectOrderIds
        ).subscribe(data => {
          this.alertMessage(data.content);
          this.loadData();
        }, this.handleError);



      }
    })
  }

  AdvanceBackComesBackSingle(id: number) {
    this.selectOrderIds = [];
    this.selectOrderIds.push(id)
    this.confirm("确定提前回传订单?", () => {
      if (this.selectOrderIds == null || this.selectOrderIds.length == 0) {
        this.error("请选择操作订单!");
        return;
      }


      this.orderService.OrderAdvancePostBack(
        this.selectedChannelType,
        this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
        this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
        this.orderBatchsearchType, this.orderBatchsearchText,
        this.selectOrderIds
      ).subscribe(data => {
        this.alertMessage(data.content);
        this.loadData();
      }, this.handleError);


    })
  }


  tabChange(tabChanged: boolean) {
    this.pageSize = 20;
    this.pageNumber = 1;

    this.items = [];
    this.selectOrderIds = [];
    this.selectedChannelType = null;
    this.selectedChannelId = null;
    this.selectCountryCode = null;
    this.selectedTimeFiltType = null;
    this.selectedCompleteSalesStatus = null;

    this.selectedTimeValueType = null;
    this.timeSearchStart = new Date();
    this.timeSearchEnd = new Date();


    this.selectSearchType = null;
    this.searchText = null;

    this.orderBatchsearchType = 'OrderNumber';
    this.orderBatchsearchText = null;

    this.isCheckAllPages = false;

    this.tabChanged = tabChanged;
    this.loadData();

  }


  isShowChannelAccount(channelType: string): boolean {
    return this.selectedChannelType == channelType;
  }

  onSelectChannelType(channelType: string) {
    if (channelType != this.selectedChannelType) {
      this.selectedChannelId = null;
    }

    this.selectedChannelType = channelType;

    this.doSearch();
  }

  onSelectChannelId(channelId: number) {

    this.selectedChannelId = channelId;

    this.doSearch();
  }

  onSelectCountry(countryCode: string) {
    this.selectCountryCode = countryCode;

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
    }
  }

  onselectedCompleteSalesStatus(status: string) {
    this.selectedCompleteSalesStatus = status;
    this.doSearch();
  }

  onselectedCompleteSalesStatus2(status: string) {
    this.selectedCompleteSalesStatus2 = status;
    this.doSearch();
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
    // this.selectedChannelType = null;
    // this.selectedChannelId = null;
    // this.selectedCompleteSalesStatus = null;
    // this.selectSearchType = null;
    // this.searchText = null;
    // if (this.orderBatchsearchType == null) {
    //   this.orderBatchsearchType = 'OrderNumber';
    // }
    this.loadData();
    this.ModalState();
  }

  doSearch() {
    this.ClearBatchSearchText();
    this.loadData();
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


}
