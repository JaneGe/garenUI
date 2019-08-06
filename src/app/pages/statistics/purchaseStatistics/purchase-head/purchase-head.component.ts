import { Component, OnInit } from '@angular/core';
import { RootComponent } from "../../../../shared/component/root.component";

@Component({
  selector: 'app-purchase-head',
  templateUrl: './purchase-head.component.html',
  styleUrls: ['../../public.scss', './purchase-head.component.scss']
})
export class PurchaseHeadComponent extends RootComponent implements OnInit {
  clickbottom: number = 0;
  warehouse: Array<any> = [{ id: null, text: '全部' }, { id: 1, text: '东莞' }, { id: 2, text: '深圳' },];
  Accounts: Array<any> = [{ id: null, text: '全部' }, { id: 1, text: '鸿鸿hong' }];
  plateForm: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: 'Amazon' }, { id: 2, text: 'Wish' }, { id: 3, text: 'ebay' }];
  country: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '英国' }, { id: 2, text: '意大利' }, { id: 3, text: '德国' }, { id: 4, text: '法国' }, { id: 5, text: '西班牙' }];
  group: Array<any> = [{ id: -1, text: '全部' }, { id: 1, text: '亚马逊' }, { id: 2, text: 'Wish' }];
  searchopt: Array<any> = [{ id: -1, text: 'Sku' }, { id: 1, text: '订单号码' }, { id: 2, text: '包裹号码' }];
  orderTime: Array<any> = [{ id: -1, text: '7天内' }, { id: 1, text: '15天内' }, { id: 2, text: '30天内' }, { id: 3, text: '自定义' }];
  ordertimesearch: Array<any> = [{ id: -1, text: '创建时间' }, { id: 1, text: '退款时间' }];

  ifallback: Array<any> = [{ id: -1, text: '是' }, { id: 1, text: '否' }];
  selectedplateForm: number = -1;
  selectedsearchopt: number = -1;
  selectedcountry: number = -1;
  selectedgroup: number = -1;
  selectedorder: number = -1;
  selectedifallback: number = -1;
  selectedordertimesearch: number = -1;

  timeSearchStart = new Date();
  timeSearchEnd = new Date();
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };
  searchText: string = null;
  clicktop: number = 0;
  constructor() {
    super();
  }

  ngOnInit() {
    this.setDay(this.timeSearchStart);
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

  //自定义日期默认是前7天
  setDay(date: any) {
    let day = date.getDate();
    date.setDate(day - 7);
  }

  selectorder(val: any) {
    this.selectedorder = val;
    if (this.selectedorder == 3) {
    }
  }


  //自定义日期验证
  checktimerange(startTime: any, endTime) {
    let difday = (startTime.getTime() - endTime.getTime()) / 1000 / 60 / 60 / 24;
    console.log(difday);

    let now = new Date().getDay();
    let out = endTime.getDay() - now;
    console.log(out);
    if (out > 0) {
      this.error('结束日期不能超过今天！');
    }
    else {
      if (difday <= -31) {
        this.error('时间间隔不能超过31天！');
      }
    }
  }

  //自定义时间确定按钮
  OnUserSetTimeQuery() {
    this.checktimerange(this.timeSearchStart, this.timeSearchEnd);
  }

}
