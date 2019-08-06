import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { EmailQueryParam } from "../../../../shared/models/commons/email-query-model";
import { SiteConst, ChannelTypeName, CommonOptionModel } from "../../../../shared/services/site-const";
import { MailDetailModalComponent } from 'app/pages/customer-services/components/modals/mail-detail-modal/mail-detail-modal.component';
import { WishDetailsComponent } from './../modals/wish-details/wish-details.component';

@Component({
  selector: 'app-wish-ticket',
  templateUrl: './wish-ticket.component.html',
  styleUrls: ['./wish-ticket.component.scss','../style.scss']
})
export class WishTicketComponent implements OnInit {
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  public options: Select2Options = { multiple: true };
  public options2: Select2Options = { multiple: false }
  public value: any[];
  timeSearchStart: any = new Date();
  timeSearchEnd: any = new Date();
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  accountItems: Array<any> = [
    { id: 1, text: 'Amazon-sas01' },
    { id: 2, text: 'Amazon-sas02' },
    { id: 3, text: 'Amazon-sas03' },
  ];

  selectedTimeValueType: string;

  ngTimeSearchStart: any = {};
  ngTimeSearchEnd: any = {};
  ngShortTimeStart: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  ngShortTimeEnd: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  isCustom:boolean = false;
  data = [
    { number: '54c689080342af239', setUpData: '04-16-2018 UTC', updataData: '04-17-2018 UTC', user: 'Kelly Griffin', tag: '尺码/颜色偏好', state: '已关闭'},
    { number: '54c689080342af239', setUpData: '04-16-2018 UTC', updataData: '04-17-2018 UTC', user: 'Kelly Griffin', tag: '尺码/颜色偏好', state: '已关闭'},
    { number: '54c689080342af239', setUpData: '04-16-2018 UTC', updataData: '04-17-2018 UTC', user: 'Kelly Griffin', tag: '尺码/颜色偏好', state: '已关闭'},
  ]
  searchParam: EmailQueryParam;
  allOrderSearchStatus: CommonOptionModel[] = [
    { text: '全部', value: null },
    { text: '站内信编号', value: '11' },
    { text: '买家账号', value: '12' },
    { text: '订单号码', value: '13' },
    { text: '买家姓名', value: '14' },
  ];

  suppprtTimeValueTypes: CommonOptionModel[] = [
    { text: '全部', value: null },
    { text: '今天', value: 'Today' },
    { text: '昨天', value: 'Yesterday' },
    { text: '7天以内', value: 'Within7Days' },
    { text: '30天以内', value: 'Within30Days' },
    { text: '自定义', value: 'Custom' }
  ];

  stateSellect: CommonOptionModel[] = [
    { text: '全部', value: null },
    { text: '未处理 ', value: '15' },
    { text: '已处理 ', value: '16' },
    { text: '已关闭', value: '17' },
  ];
  accountTags = [
    { id: 1, text: '取消订单' },
    { id: 2, text: '要求退款/取消订单' },
    { id: 3, text: '收到已损坏或错误的产品' },
    { id: 4, text: '退回或进行产品更换' },
    { id: 5, text: '更换配送地址' },
    { id: 6, text: '物流配送状态或预计到达时间查询' },
    { id: 7, text: '尺码/颜色偏好' },
    { id: 8, text: '提交退款申请' },
    { id: 9, text: '上报到Wish支持' },
    { id: 10, text: '商户上报到Wish支持' },
    { id: 11, text: '商品为假冒伪劣品' },
    { id: 12, text: '我收到了错误的尺码' },
    { id: 13, text: '我收到了错误的颜色' },
    { id: 14, text: '如何使用我的产品？' },
    { id: 15, text: '其他退货事宜' },
    { id: 16, text: '其他变更请求' },
    { id: 17, text: '我的退款申请现在处于什么状态？' },
    { id: 18, text: '确认退款' },
    { id: 19, text: '退货状态和退款查询' },
    { id: 20, text: '未知' },
    { id: 21, text: '其他' },
  ];

  constructor(private modalService: NgbModal,) { }

  ngOnInit() {
  }

  onChanged(data: { value }, element) {
    console.log(data)
  }

  onSelectOrderStatus(status: string) {
  }

  onSelect($event, type, value) {
    if (type === 'timeSpan') {
      if ($event.innerText === '自定义') {
        this.isCustom = true;
        return;
      } else {
        this.isCustom = false;
      }
    }
  }

  doTimeSearch() {
  }

  onSelectState(status: string) {
  }

  pageChanged(pN: number): void {
  }

  onQuery(pageNumber: number = 1) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            this.searchParam.pageSize = this.PageInfo.pageSize;
    this.searchParam.pageIndex = pageNumber - 1;
  }

  changeAllBox($event) {
    /* for (let i = 0; i < this.data.length; i++) {
      this.data[i].isCheck = $event.target.checked;
    } */
  }

  /* openMailDetailModal(id: number) {
    const modal = this.modalService.open(MailDetailModalComponent,
      { size: 'sm', backdrop: 'static' });
    modal.componentInstance.mailId = id;
    modal.result.then(result => {
      this.onQuery(this.PageInfo.pageIndex);
    }, reason => {
    })

    let mailIdItem = [];
    this.data.forEach(element => {
      mailIdItem.push(element.id);
    });
    modal.componentInstance.mailIdItem = mailIdItem;
  } */
  // 打开wish详情介绍
  openWishDetails() {
    const model = this.modalService.open(WishDetailsComponent)
  }
}
