import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from '../../../purchase/components/modals/details/details.component';

@Component({
  selector: 'app-depreciate-list',
  templateUrl: './depreciate-list.component.html',
  styleUrls: ['./depreciate-list.component.scss', '../../style.scss']
})
export class DepreciateListComponent implements OnInit {
  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;

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
  isCustom: boolean = false;

  public options: Select2Options;
  public salesmanValue: any[];
  salesman = [{ id: 1, text: '郭胜涛' }]

  warehouse = [{ Id: 0, Name: '全部' }, { Id: 1, Name: '东莞' }, { Id: 2, Name: '深圳' }];
  timeChoose = ["下单时间", "付款时间"];

  timeSpan = [
    { Id: 0, Name: '全部' },
    { Id: 1, Name: '今天' },
    { Id: 2, Name: '昨天' },
    { Id: 3, Name: '7天以内' },
    { Id: 4, Name: '30天以内' },
    { Id: 5, Name: '自定义' }
  ];

  searchType = [
    { Id: 0, Name: '下单号' },
    { Id: 1, Name: 'SKUCode' },
    { Id: 2, Name: '供应商名称' },
    { Id: 3, Name: '供应商ID' },
    { Id: 4, Name: '卖家名称' },
    { Id: 5, Name: '订单号' },
    { Id: 6, Name: '跟踪号' }
  ];

  items = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]

  constructor(private modalService: NgbModal) { }

  ngOnInit() { }

  loadData() { }

  pageChanged(pN: number): void { }

  onChanged(data: { value: string }) { }

  onSelect($event, type, value) {
    if (type === 'timeSpan') {
      if ($event.innerText === '自定义') {
        this.isCustom = true;
        //this.searchParam.TimeChoose = value;
        this.dateTransition();
        return;
      } else {
        this.isCustom = false;
      }
    }
    /* switch (type) {
      case "warehouse":
        this.searchParam.WarehouseId = value;
        break;
      case "purchasePlanType":
        this.searchParam.PlanType = value;
        break;
      case "planStatus":
        this.searchParam.Status = value;
        break;
      case "timeChoose":
        this.searchParam.IsSetCreateTime = value == "创建时间";
        return;
      case "timeSpan":
        this.searchParam.TimeChoose = value;
        break;
      case "conditionChoose":
        this.searchParam.ConditionChoose = value;
        return;
    } */
    //this.onQuery();
  }

  openOrderDetailModal(id: any) {
    const modal = this.modalService.open(DetailsComponent, { size: 'sm', backdrop: 'static' });
    modal.componentInstance.modalHeader = "1688订单详情";
    modal.componentInstance.platOrderId = id;
    modal.result.then(result => {
    }, reason => {
    })
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

    if ((this.timeSearchStart == null || this.timeSearchStart.length < 1) && (this.timeSearchEnd == null || this.timeSearchEnd.length < 1)) {
      alert("开始时间,和结束时间不能同时为空");
      return;
    }
    //this.onQuery();
  }
}
