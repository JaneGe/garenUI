import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderInfoService} from "../../../../../shared/services/order.service";
import {environment} from "../../../../../../environments/environment";
import {JwtService} from "../../../../../shared/services/jwt.service";

@Component({
  selector: 'app-outputModal',
  templateUrl: './outputModal.component.html',
  styleUrls: ['./outputModal.component.scss'],
  providers: [OrderInfoService, JwtService]
})

export class OutputModalComponent implements OnInit {
  columns = [
    {name: '订单号', disabled: true, checked: true, value: 0},
    {name: '订单金额', disabled: true, checked: true, value: 1},
    {name: '货币代码', disabled: true, checked: true, value: 2},
    {name: '买家姓名', disabled: true, checked: true, value: 3},
    {name: '国家二位代码', disabled: true, checked: true, value: 4},
    {name: '省/州', disabled: true, checked: true, value: 5},
    {name: '城市', disabled: true, checked: true, value: 6},
    {name: '地址1', disabled: true, checked: true, value: 7},
    {name: '邮编', disabled: true, checked: true, value: 8},
    {name: 'SKU', disabled: true, checked: true, value: 9},
    {name: '数量', disabled: true, checked: true, value: 10},

    {name: '国家中文名称', disabled: false, checked: false, value: 11},
    {name: '地址2', disabled: false, checked: false, value: 12},
    {name: '电话1', disabled: false, checked: false, value: 13},
    {name: '电话2', disabled: false, checked: false, value: 14},
    {name: '平台SKU', disabled: false, checked: false, value: 15},
    {name: '商品名称', disabled: false, checked: false, value: 16},
    {name: '卖家', disabled: false, checked: false, value: 17},
    {name: '站点', disabled: false, checked: false, value: 18},
    {name: '预估重量（g）', disabled: false, checked: false, value: 19},
    {name: '订单状态', disabled: false, checked: false, value: 20},
    {name: '异常状态', disabled: false, checked: false, value: 21},
    {name: '是否已回传', disabled: false, checked: false, value: 22},
    {name: '分配仓库', disabled: false, checked: false, value: 23},
    {name: '分配物流', disabled: false, checked: false, value: 24},
    {name: '预估运费', disabled: false, checked: false, value: 25},
    {name: '包裹号', disabled: false, checked: false, value: 26},
    {name: '物流跟踪号', disabled: false, checked: false, value: 27},
    {name: '付款日期', disabled: false, checked: false, value: 28},
    {name: '下单日期', disabled: false, checked: false, value: 29},
    {name: '发货日期', disabled: false, checked: false, value: 30},
    {name: '预估利润', disabled: false, checked: false, value: 31},
    {name: '采购价', disabled: false, checked: false, value: 32}, /* 批次的价格*/
    {name: '中文报关名', disabled: false, checked: false, value: 33},
    {name: '英文报关名', disabled: false, checked: false, value: 34},
    {name: '平台商品ID', disabled: false, checked: false, value: 35},
    {name: 'Title', disabled: false, checked: false, value: 36},
    {name: '买家备注', disabled: false, checked: false, value: 37},
    {name: '客服备注', disabled: false, checked: false, value: 38},
    {name: '平台费', disabled: false, checked: false, value: 39},
    {name: '买家指定物流', disabled: false, checked: false, value: 40}
  ];

  @Input()
  exportParams: any;
  @Input()
  orderIds: any[];

  exception: string;

  selectAll: boolean = false;

  constructor(private outputModal: NgbActiveModal,
              private orderInfoService: OrderInfoService,
              private jwtService: JwtService) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.outputModal.dismiss();
  }

  allChecked(all: boolean) {
    for (let i of this.columns) {
      if (i.disabled) {
        i.checked = true;
      } else {
        i.checked = !all;
      }
    }
  };

  doExport() {
    let cols: number[] = [];
    for (let i of this.columns) {
      if (i.checked) {
        cols.push(i.value);
      }
    }
    let exportCols = cols.join(",");


    let params = new URLSearchParams();
    params.set('cols', exportCols);
    const token = this.jwtService.getToken();
    params.set('token', token.toString());

    if (this.orderIds == null) {
      for (let key in this.exportParams) {
        if (this.exportParams[key] == null) {
          params.set(key, '')
        }
        else {
          params.set(key, this.exportParams[key])
        }
      }
    }
    else {
      params.set('orderids', this.orderIds.join(','))
    }

    var urlPre;
    if (this.exception == null) {
      urlPre = `${environment.api_url}/api/v1/Orders/export`;
    }
    else {
      urlPre = `${environment.api_url}/api/v1/OrderException/exportExceptionOrders`;
    }
    // var urlPre = `${environment.api_url}/api/v1/Orders/export`;
    // var urlPre = `${environment.api_url}/api/v1/OrderException/exportExceptionOrders`;

    let url = [urlPre, params.toString()].join('?');

    let win = window.open(url);
    win.focus();
    win.location.href = url;
  }
}
