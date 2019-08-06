import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as Slide from '../../../../../shared/animations/modal-Slide';
import { PurchaseOrder1688Service } from "../../purchase-1688/purchase-1688.service";
import { PlatformOrderDetailSearchModel } from "../../../../../shared/models/purchases/purchase-order1688-model";

@Component({
  selector: 'app-more-sku',
  templateUrl: './more-sku.component.html',
  styleUrls: ['../modal-public.scss', './more-sku.component.scss'],
  providers: [PurchaseOrder1688Service]
})
export class MoreSkuComponent implements OnInit {
  node: any;
  detail: Array<any> = [];
  platOrderId: number;
  modalHeader: string = '';
  ths: ['7天销量', '15天销量', '30天销量', '90天销量'];
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  searchParam: PlatformOrderDetailSearchModel;
  constructor(private activeModal: NgbActiveModal, private purchaseOrderService: PurchaseOrder1688Service) { }

  ngOnInit() {
    this.node = document.getElementById("form").parentNode.parentNode.parentNode;
    var nodewidth = document.getElementById("form").parentNode.parentNode;
    $(nodewidth).css({ 'width': '1200px', 'left': '50%', 'margin-left': '-550px' });
    Slide.slideIn(this.node);
    this.loadData();
  }
  loadData(pageIndex: number = 1) {
    this.searchParam = new PlatformOrderDetailSearchModel();
    this.searchParam.PlatformOrderId = this.platOrderId;
    this.searchParam.PageIndex = pageIndex - 1;
    this.searchParam.PageSize = this.PageInfo.pageSize;
    this.purchaseOrderService.GetPlatformOrderDetailQuery(this.searchParam).subscribe(data => {
      this.detail = data.content.items;
      console.log(this.detail);

      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    });
  }
  pageChanged(pn: any) {
    this.loadData(pn)
  }
  closeModal() {
    Slide.slideLeft(this.node, this);
  }

  checkModal(i, isOver) {
    isOver ? $('.sales-body').eq(i).fadeIn(0) : $('.sales-body').eq(i).fadeOut(0);
  }

  detailItem = [
    {
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    }, {
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    }, {
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    }, {
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    }, {
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    },{
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    },{
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    },{
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    },{
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    },{
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    },{
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    },{
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    },{
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    }, {
      date: "2018-03-01T00:00:00+08:00",
      dateShow: "03.01",
      quantity: 0,
      type: null,
      typeShow: "",
      week: "星期四",
    },
  ];

}
