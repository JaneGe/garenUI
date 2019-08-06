import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {PurchaseService} from './purchase-data.service';
import {PurchaseOrderModalComponent} from '../modals/purchase-order-modal/purchase-order-modal.component';
import {PurchasePondModel} from "../../../../shared/models/purchases/purchase-pond-model";
import {RootComponent} from 'app/shared/component/root.component';
import {PurchaseBackupComponent} from "../modals/purchaseBackup/purchaseBackup.component";
import {environment} from "../../../../../environments/environment";
import {JwtService} from "../../../../shared/services/jwt.service";

@Component({
  selector: 'app-purchase-pond',
  templateUrl: './purchase-pond.component.html',
  styleUrls: ['./purchase-pond.component.scss', '../../style.scss'],
  providers: [PurchaseService]
})
export class PurchasePondComponent extends RootComponent implements OnInit {
  ngTimeSearchStart: any = {};
  ngTimeSearchEnd: any = {};
  ngShortTimeStart: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  ngShortTimeEnd: NgbTimeStruct = {hour: 0, minute: 0, second: 0};

  timeSearchStart: string = '';

  timeSearchEnd: string = '';
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  isCustom: boolean = false;
  pondData: any[];
  screen: any[];
  warehouse: any[];
  purchasePlanTypes: any[];
  planStatuss: any[];
  timeChoose: any[];
  timeSpan: any[];
  conditionChoose: any[];
  searchParam: PurchasePondModel;
  storeSearchKey: string = '';
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = {pageIndex: 0, pageSize: 10, totalCount: 0};

  constructor(public http: Http,
              private modalService: NgbModal,
              private jwtService: JwtService,
              private purchaseService: PurchaseService) {
    super();
    this.timeChoose = purchaseService.timeChoose;
    this.timeSpan = purchaseService.timeSpan;
    this.conditionChoose = purchaseService.conditionChoose;
    this.planStatuss = purchaseService.planStatuss;
    this.purchasePlanTypes = purchaseService.purchasePlanTypes;
  }

  ngOnInit() {
    this.searchParam = new PurchasePondModel();
    this.searchParam.ConditionChoose = 0;
    this.searchParam.TimeChoose = 0;
    this.searchParam.PlanType = 0;
    this.searchParam.Status = 20;
    this.searchParam.IsSetCreateTime = true;
    this.purchaseService.GetStorageData().subscribe(data => {
      this.warehouse = data.content;
      if (data.content.length > 0) {
        this.searchParam.WarehouseId = data.content[0].warehouseId;
        this.searchParam.WarehouseName = data.content[0].name;
        this.onQuery();
      }
    });
  }


  pageChanged(pN: number): void {
    $('html, body').animate({scrollTop: 0}, 0);
    this.onQuery(pN);
  }

  reloadData() {
    this.onQuery(this.PageInfo.pageIndex);
  }

  onSelect($event, type, value) {
    console.log(type);
    if (type === 'timeSpan') {
      if ($event.innerText === '自定义') {
        this.isCustom = true;
        this.searchParam.TimeChoose = value;
        this.dateTransition();
        return;
      } else {
        this.isCustom = false;
      }
    }
    switch (type) {
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
    }
    this.onQuery();
  }

  onQuery(pageNumber: number = 1) {
    this.searchParam.PageIndex = pageNumber - 1;
    this.searchParam.PageSize = this.PageInfo.pageSize;
    this.searchParam.BeginTime = this.timeSearchStart;
    this.searchParam.EndTime = this.timeSearchEnd;
    this.searchParam.SearchText = this.storeSearchKey;

    this.purchaseService.PurchasePlanQuery(this.searchParam).subscribe(data => {
      this.pondData = data.content.items;
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    });
  }

  openPurchaseOrderModal(id) {
    const searchModal = this.modalService.open(PurchaseOrderModalComponent,
      {size: 'sm', backdrop: 'static'});
    searchModal.componentInstance.modalHeader = "1688订单详情";
    searchModal.componentInstance.orderId = id;
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
    this.onQuery();
  }

  doGeneratePurchasePlan(planType: string) {
    if (this.searchParam.WarehouseId == null) {
      this.error("请选择仓库");
      return;
    }
    this.purchaseService.generatePurchasePlan(this.searchParam.WarehouseId, planType).subscribe(data => {
      if (data.content > 0) {
        this.alertMessage("生成成功");
        this.reloadData();
      } else {
        this.error('生成失败，无新任务');
      }
    }, this.handleError);
  }

  addPurchaseBackup() {
    if (this.searchParam.WarehouseId == null) {
      this.error("请选择仓库");
      return;
    }
    let modal = this.modalService.open(PurchaseBackupComponent, {backdrop: 'static', size: 'lg'});
    modal.componentInstance.warehouseId = this.searchParam.WarehouseId;
    modal.result.then(result => {
      this.reloadData();
    }, reject => {

    });
  }

  exportPurchaseOrders(id:number) {
    console.log(id);
    let params = new URLSearchParams();
    const token = this.jwtService.getToken();
    params.set('token', token.toString());

    params.set('purchasePlanId', id.toString())

    var urlPre = `${environment.api_url}/api/v1/purchase-plan/ExportOrderPurchasePlan`;

    let url = [urlPre, params.toString()].join('?');

    let win = window.open(url);
    win.focus();
    win.location.href = url;
  }
}
