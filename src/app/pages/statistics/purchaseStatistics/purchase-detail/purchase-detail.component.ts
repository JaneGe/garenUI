import { RootComponent } from "../../../../shared/component/root.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from '@angular/core';
import { Data } from "./data";
import { AllSkuComponent } from "../modals/all-sku/all-sku.component";

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss'],
  providers: [Data]
})

export class PurchaseDetailComponent extends RootComponent implements OnInit {
  timeSearchStart: any = new Date();
  timeSearchEnd: any = new Date();

  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };
  pageIndex:number = 1;
  pageSize: number = 20;
  currentPage: number = 1;
  totalCount: number;

  screen = [
    {
      title: '仓库',
      type: 'warehouse',
      items: [{ Id: -1, Name: '全部' }, { Id: 0, Name: '东莞' }, { Id: 10, Name: '深圳' }]
    },
    {
      title: '1688平台账号',
      type: '1688',
      items: [{ Id: 0, Name: '全部' }, { Id: 10, Name: '鸿鸿hong' }]
    },
    {
      title: '搜索类型',
      type: 'searchType',
      items: [{ Id: 0, Name: '全部' }, { Id: 0, Name: 'SKU' }, { Id: 10, Name: '平台订单号码' }, { Id: 0, Name: '下单号' }]
    },
    {
      title: '付款日期筛选',
      type: 'searchDate',
      items: [{ Id: null, Name: '全部' }, { Id: 0, Name: '今天' }, { Id: 10, Name: '昨天' }, { Id: 20, Name: '7天以内' }, { Id: 30, Name: '30天以内' }, { Id: 'custom', Name: '自定义' }]
    }
  ];

  detailData: Array<any>;
  constructor(private modalService: NgbModal,
    private data: Data
  ) {
    super();
  }

  ngOnInit() {
    this.detailData = this.data.tableData;
    this.timeSearchStart.setDate(this.timeSearchStart.getDate() - 1);
  }

  pageChanged(pN: number): void {
    this.onQuery(pN);
  }

  reloadData() {
  }

  isCustom: boolean = false;

  onSelect($event, type, value) {
    if (type === "searchDate" && value === 'custom') {
      this.isCustom = true;
    } else if (type === "searchDate" && value !== 'custom') {
      this.isCustom = false;
    }
    switch (type) {
      case "status":
        //this.searchParam.Status = value;
        break;
      case "ishot":
        //this.searchParam.Hot = value;
        break;
    }
    this.onQuery();
  }

  onQuery(pageNumber: number = 1) { }

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
    if ((this.timeSearchStart == null || this.timeSearchStart.length < 1) && (this.timeSearchEnd == null || this.timeSearchEnd.length < 1)) {
      alert("开始时间,和结束时间不能同时为空");
      return;
    }
    this.onQuery();
  }

  openModal(orderId: number) {
    const modalService = this.modalService.open(AllSkuComponent,
      { size: 'sm', backdrop: 'static' });
    modalService.result.then(result => {
    }, reason => {
    })
  }
}
