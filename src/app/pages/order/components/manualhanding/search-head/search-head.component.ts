import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderInfoService } from "../../../../../shared/services/order.service";
import { ChannelTypeName, CommonOptionModel, SiteConst } from "../../../../../shared/services/site-const";
import { AccountLiteListModel } from "../../../../../shared/models/channels/account-lite-list-model";
import { RootComponent } from "../../../../../shared/component/root.component";
import { ShopAccountService } from "../../../../../shared/services/shop.account.service";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-search-head',
  templateUrl: './search-head.component.html',
  styleUrls: ['../../../style.scss', './search-head.component.scss'],
  providers: [OrderInfoService, ShopAccountService]
})
export class SearchHeadComponent extends RootComponent implements OnInit {
  @Input() hasWarehouse: boolean = false;
  @Input() Storages: string[] = [];
  @Input() Logistics: string[] = [];
  @Input() OrderKind: string[] = [];
  @Output() childOnSelectCountry = new EventEmitter<any>();
  @Output() childSelectedChannelType = new EventEmitter<any>();
  @Output() childSelectedWarehouse = new EventEmitter<any>();

  @Output() childSelectedChannelId = new EventEmitter<any>();
  @Output() childSelectedTimeFiltType = new EventEmitter<any>();
  @Output() childSelectedTimeValueType = new EventEmitter<any>();
  @Output() childTimeSearchStart = new EventEmitter<any>();
  @Output() childTimeSearchEnd = new EventEmitter<any>();
  @Output() childSelectSearchType = new EventEmitter<any>();
  @Output() childSearchText = new EventEmitter<any>();
  @Output() childOrderBatchsearchType = new EventEmitter<any>();
  @Output() childOrderBatchsearchText = new EventEmitter<any>();

  @Output() childOrderBatchsearch = new EventEmitter<any>();
  @Output() childSelectedChannelIds = new EventEmitter<any[]>();

  public options: Select2Options = { multiple: true };
  public value: any[];
  public current: string;


  supportChannelTypes: ChannelTypeName[] = [];
  supportFilterCountries: CommonOptionModel[] = [];
  shopAccouns: AccountLiteListModel[] = [];
  amazonAccounts: AccountLiteListModel[] = [];

  selectedWarehouseId: number;
  selectedChannelId: number;
  selectedChannelIds: any[];
  selectedChannelType: string;
  selectCountryCode: string;
  selectedTimeFiltType: string;
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

  selectSearchType: string;
  searchText: string;

  orderBatchsearchType: string;
  orderBatchsearchText: string;


  screen = [];//假数据数组
  modalstate = 0;
  searchMore: boolean = false;//高级筛选按钮状态
  tagselected;//销售渠道详细展示
  // detail = DETAIL[0];

  suppprtWarehouse: any[] = [
    { text: '全部', value: null },
    { text: '东莞', value: 1 },
    { text: '深圳', value: 2 }
  ];

  suppprtSearchTimeTypes: CommonOptionModel[] = [
    { text: '下单时间', value: 'OrderedTime' },
    { text: '付款时间', value: 'PaiedTime' },
    { text: '发货时间', value: 'ShippedTime' }
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
    { text: 'Sku', value: 'Sku' }
  ];

  constructor(
    private orderInfoService: OrderInfoService,
    private shopAccountService: ShopAccountService) {
    super();

    const types = SiteConst.supportChannelTypes;
    this.supportChannelTypes = types.map(x => x);
    this.supportChannelTypes.unshift({ displayName: '全部', code: '' });

    this.supportFilterCountries = SiteConst.supportFilterCountries.filter(m => m.text != null);
    this.supportFilterCountries.unshift({ text: '全部', value: '' });

    this.screen.push(this.orderInfoService.getScreen());
  }

  accountItems: Array<any> = [];
  ngOnInit() {
    this.shopAccountService.getAllAccountLiteList().subscribe(data => {
      this.shopAccouns = data.content;
      /*
            this.amazonAccounts = this.shopAccouns.filter(m => m.channelType === 'Amazon');


            this.amazonAccounts.forEach(element => {
              this.accountItems.push({ id: element.channelId, text: element.displayName });
            });

       */
    }, this.handleError);

    this.shopAccountService.getAllWarehouse().subscribe(data => {
      this.suppprtWarehouse = data.content;
      if (this.suppprtWarehouse.length > 0) {
        this.selectedWarehouseId = this.suppprtWarehouse[0].warehouseId;
        if (this.hasWarehouse) {
          console.log('查询完仓库之后加载table');
        }
        this.childSelectedWarehouse.emit(this.selectedWarehouseId);
      }
    }, this.handleError);
  }

  ModalState() {

    this.childSelectedChannelType.emit(null);
    this.childSelectedWarehouse.emit(null);
    this.childSelectedChannelId.emit(null);
    this.childOnSelectCountry.emit(null);
    this.childSelectedTimeFiltType.emit(null);
    this.childSelectedTimeValueType.emit(null);
    this.childTimeSearchStart.emit(null);
    this.childTimeSearchEnd.emit(null);
    this.childSelectSearchType.emit(null);
    this.childSearchText.emit(null);
    this.childOrderBatchsearch.emit('批量查询');

    // this.modalstate ? this.modalstate = 0 : this.modalstate = 1;
    this.modalstate = 1;
    $('body').addClass('modal-open');
  }

  Close() {
    this.modalstate = 0;
    $('body').removeClass('modal-open');
  }
  seekmode = 0;
  seekMode(i) {
    this.seekmode = i;
  }
  SearchMore() {
    this.searchMore = !this.searchMore;
  }

  onSelectChannelId(channelId: number) {

    this.selectedChannelId = channelId;
    this.ClearBatchSearchText();
    this.childSelectedChannelId.emit(this.selectedChannelId);
  }

  isShowChannelAccount(channelType: string): boolean {
    return this.selectedChannelType == channelType;
  }

  onSelectChannelType(channelType: string) {
    this.accountItems = [{ id: 0, text: '全部' }];
    this.shopAccouns.filter(m => m.channelType === channelType).forEach(element => {
      this.accountItems.push({ id: element.channelId, text: element.displayName });
    });

     console.log('这是进来时的type   '+channelType);
    // if (channelType != this.selectedChannelType) {
    //   this.selectedChannelId = null;
    //   console.log('传出的ChannelType1   ' + this.selectedChannelType);
    //   this.childSelectedChannelId.emit(this.selectedChannelId);
    // }

    this.selectedChannelType = channelType;
    this.selectedChannelIds = [];
    this.ClearBatchSearchText();
    console.log('传出的ChannelType2   ' + this.selectedChannelType);
    this.childSelectedChannelType.emit(this.selectedChannelType);

    //   this.doSearch();
  }

  onSelectWarehouse(warehouseId: number) {
    this.selectedWarehouseId = warehouseId;
    this.childSelectedWarehouse.emit(this.selectedWarehouseId);

    //   this.doSearch();
  }

  onSelectCountry(countryCode: string) {
    this.selectCountryCode = countryCode;
    this.ClearBatchSearchText();
    this.childOnSelectCountry.emit(this.selectCountryCode);
    //this.doSearch();
  }

  onSelectTimeSearchType(timeSearchType: string) {
    this.selectedTimeFiltType = timeSearchType;
  }

  onSelectTimeValueType(timeValue: string) {
    this.selectedTimeValueType = timeValue;
    if (this.selectedTimeFiltType == null) {
      this.selectedTimeFiltType = 'OrderedTime';
    }
    this.ClearBatchSearchText();
    if (timeValue != 'Custom') {
      this.childSelectedTimeFiltType.emit(this.selectedTimeFiltType);
      this.childSelectedTimeValueType.emit(this.selectedTimeValueType);
      //this.loadData();
    } if (timeValue === 'Custom') {
      this.dateTransition();
    }
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
    this.ClearBatchSearchText();
    this.childSelectedTimeFiltType.emit(this.selectedTimeFiltType);
    this.childSelectedTimeValueType.emit(this.selectedTimeValueType);
    this.childTimeSearchStart.emit(this.timeSearchStart);
    this.childTimeSearchEnd.emit(this.timeSearchEnd);
    // this.loadData();
  }

  onSelectSearchType(type: string) {
    this.selectSearchType = type;
    // this.childSelectSearchType.emit( this.selectSearchType);

  }

  doSearch() {
    this.ClearBatchSearchText();
    this.childSelectSearchType.emit(this.selectSearchType);
    this.childSearchText.emit(this.searchText);
    // this.loadData();
  }

  onSelectdoOrederBatchSearchType(vaule: string) {
    this.orderBatchsearchType = vaule;
    //this.childOrderBatchsearchType.emit( this.orderBatchsearchType);
  }

  doOrderBatchSearch() {
    //  this.loadData();
    this.childSelectedChannelType.emit(null);
    this.childSelectedChannelId.emit(null);
    this.childOnSelectCountry.emit(null);
    this.childSelectedTimeFiltType.emit(null);
    this.childSelectedTimeValueType.emit(null);
    this.childTimeSearchStart.emit(null);
    this.childTimeSearchEnd.emit(null);
    this.childSelectSearchType.emit(null);
    this.childSearchText.emit(null);

    if (this.orderBatchsearchType == null) {
      this.childOrderBatchsearchType.emit(this.orderBatchsearchType);
    }
    this.childOrderBatchsearchText.emit(this.orderBatchsearchText);

    this.childOrderBatchsearch.emit(null);
    this.modalstate = 0
    // this.ModalState();
  }

  ClearBatchSearchText() {
    this.childOrderBatchsearchType.emit(null);
    this.childOrderBatchsearchText.emit(null);
    this.childOrderBatchsearch.emit(null);
  }

  onChanged(data: { value }, element) {
    if (data.value.indexOf('0') >= 0) {
      element.setElementValue('0');
      data.value = ['0'];
      this.selectedChannelIds = [];
    }
    else {
      this.selectedChannelIds = data.value;
    }
    this.childSelectedChannelIds.emit(this.selectedChannelIds);
  }
}
