import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RootComponent } from "../../../../shared/component/root.component";
import { AccountListService } from "./accountList.service";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-order-head',
  templateUrl: './order-head.component.html',
  styleUrls: ['../../public.scss', './order-head.component.scss'],
  providers: [AccountListService]
})
export class OrderHeadComponent extends RootComponent implements OnInit {
  clickbottom: number = 0;
  plateForm: Array<any> = [{ id:null, text: '全部' },{ id:1, text: 'Amazon' },{ id:2, text: 'AliExpress' },{ id:3, text: 'Wish' },{ id: 0, text: '手工订单' }];
  country: Array<any> = [{ id: -1, text: '全部' }, { id:1, text: '英国' }, { id: 2, text: '意大利' }, { id: 3, text: '德国' },{ id: 4, text: '法国' },{ id: 5, text: '西班牙' },{ id: 6, text: '美国' }];
  group: Array<any> = [{ id: -1, text: '全部' }, { id:1, text: '亚马逊' }, { id: 2, text: 'Wish' }];
  searchopt: Array<any> = [{ id: -1, text: 'Sku' }, { id:1, text: '订单号码' }, { id: 2, text: '包裹号码' }];
  orderTime: Array<any> = [{ id: 1, text: '今天' },{ id:2, text: '昨天' },{ id: 3, text: '7天内' },{ id: 4, text: '30天内'},{ id: 5, text: '自定义'}];
  ordertimesearch: Array<any> = [{ id: 1, text: '创建时间' }, { id:2, text: '发货时间' }];

  ifallback:Array<any>=[{ id: -1, text: '是'},{ id: 1, text: '否'}];
  selectedplateForm: number ;
  selectedsearchopt: number = -1;
  selectedcountry: string = '全部';
  selectedgroup: number = -1;
  selectedorder: number = 1;
  selectedifallback: number = -1;
  selectedordertimesearch: number = 1;
  accountList = [];
  selectedAccounts = [{ChannelId:-1,ChannelName:'全部'}];
  defaultAccountVal = '-1';
  ngTimeSearchStart: any = {};
  ngTimeSearchEnd: any = {};
  ngShortTimeStart: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  ngShortTimeEnd: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  timeSearchStart;

  timeSearchEnd;
  minCurrency:any;
  maxCurrency:any;
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };
  searchText: string = null;
  clicktop: number = 0;

  @Input() specialtypehead: string = '';
  @Input() loseMoney: boolean = false;

  @Output() childChangePlateForm = new EventEmitter<any>();
  @Output() childChangeOrdertimeSearch = new EventEmitter<any>();
  @Output() childSelectOrder = new EventEmitter<any>();
  @Output() childChangeAccounts = new EventEmitter<any>();
  @Output() childChangeCountry = new EventEmitter<any>();
  @Output() childOnchangeTime = new EventEmitter<any>();
  @Output() childOnchangeCurreny = new EventEmitter<any>();


  timeRanges = { beginTime: this.timeSearchStart, endTime: this.timeSearchEnd, directly: false };
  select2Options: Select2Options = {
    multiple: true
  };
  constructor(private accountListService: AccountListService) {
    super();
    this.QueryForChannel();
  }

  ngOnInit() {

  }

  ModalState() {
    this.childChangePlateForm.emit(this.selectedplateForm);
    this.childChangeOrdertimeSearch.emit(this.selectedordertimesearch);
    this.childSelectOrder.emit(this.selectedorder);
    this.childChangeCountry.emit(this.selectedcountry);
    this.childOnchangeTime.emit(this.timeRanges);
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
  doTimeSearch(searchDirectly: boolean) {
    this.dateTransition();
    if (this.timeSearchStart == null || this.timeSearchStart.length < 1) {
      this.error("开始时间不能为空");
      return;
    }
    if (this.timeSearchEnd == null || this.timeSearchEnd.length < 1) {
      this.error("结束时间不能为空");
      return;
    }

    this.timeRanges = {
      beginTime: this.timeSearchStart,
      endTime: this.timeSearchEnd,
      directly: false
    };
    if (searchDirectly) this.timeRanges.directly = searchDirectly;
    this.childOnchangeTime.emit(this.timeRanges);
  }


  //高级筛选按钮
  toggle1(val: any) {
    if (val == 0) {
      this.clickbottom = 1;
    }
    else {
      this.clickbottom = 0;
    }
  }

  changePlateForm(item) {
    this.selectedplateForm = item.id;
    this.QueryForChannel();
    if (this.selectedorder == 5) this.doTimeSearch(false);
    this.childChangePlateForm.emit(this.selectedplateForm);
    //this.ModalState();
  }

  changeOrdertimeSearch(item: any) {
    this.selectedordertimesearch = item.id;
    if (this.selectedorder == 5) this.doTimeSearch(false);
    this.childChangeOrdertimeSearch.emit(this.selectedordertimesearch);
    //this.ModalState();
  }

  changeCurrency(){

    const rangeCurreny = {MaxCurreny:this.maxCurrency,MinCurreny:this.minCurrency};
   this.childOnchangeCurreny.emit(rangeCurreny);
  }


  changeCountry(item: any) {
    this.selectedcountry = item.text;
    if (this.selectedorder == 5) this.doTimeSearch(false);
    this.childChangeCountry.emit(this.selectedcountry);
  }
  onChangeAccountChanged(data: any, el) {
    this.selectedAccounts=[];
    if(data.data&&data.data.length>0){
      if (data.data[0].id == -1) {
        this.selectedAccounts = [{ChannelId:-1,ChannelName:'全部'}];
        el.setElementValue('-1');
        this.childChangeAccounts.emit(this.selectedAccounts);
        return;
      }
      for(let i=0;i<data.data.length;i++){
        let tempData:any={};
        tempData.ChannelId=data.data[i].id;
        tempData.ChannelName=data.data[i].text;
        this.selectedAccounts.push(tempData);
      }
      this.childChangeAccounts.emit(this.selectedAccounts);
    }
    // alert(123435);
    // if (data.data.length > 0) {
    //   if (data.data[0].id == -1) {
    //     this.selectedAccounts = [-1];
    //     el.setElementValue('-1');
    //   }
    //   else {
    //     this.selectedAccounts.push(data.data[0].id);
    //   }
    //   this.selectedAccount = data.data[0].id;
    //   this.selectedAccountName = data.data[0].text;
    //   const accounteRange = {
    //     ChannelId: this.selectedAccount,
    //     ChannelName: this.selectedAccountName
    //   };
    //   if (this.selectedorder == 5) this.doTimeSearch(false);
    //   this.childChangeAccount.emit(accounteRange);
    // }
  }
  selectorder(val: any) {
    this.selectedorder = val;
    this.childSelectOrder.emit(this.selectedorder);
    //this.childOnchangeTime.emit(this.timeRanges);
  }


  //自定义日期验证
  checktimerange(startTime: any, endTime) {
    // let difday=(startTime.getTime()-endTime.getTime())/1000/60/60/24;
    // console.log(difday);
    //
    // let now=new Date().getDay();
    // let out=endTime.getDay()-now;
    // console.log(out);
    // if(out>0){
    //   this.error('结束日期不能超过今天！');
    // }
    // else{
    //   if(difday<=-31){
    //     this.error('时间间隔不能超过31天！');
    //   }
    // }
  }

  //自定义时间确定按钮
  OnUserSetTimeQuery() {
    this.checktimerange(this.timeSearchStart, this.timeSearchEnd);
    const timeRanges = {
      beginTime: this.timeSearchStart,
      endTime: this.timeSearchEnd
    };
    this.childOnchangeTime.emit(timeRanges);
  }
  QueryForChannel() {
    this.accountList = [];
    this.accountListService.QueryForChannel(this.selectedplateForm).subscribe(data => {
      let currentAccounts = [{ id: -1, text: '全部' }];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.channelId;
        item.text = c.displayName;
        currentAccounts.push(item);
      }
      this.accountList = currentAccounts;
    }, this.handleError)
  }
}
