import { Component, OnInit, Input, animate, style, transition, trigger, state, HostListener } from '@angular/core';
import { OrderInfoService } from "../../../../shared/services/order.service";
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { PackageService } from "../../../../shared/services/package-search-service";
import { NgbModal, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { PackageListModel } from "../../../../shared/models/Package/package-list-model";
import { ShippingMethodService } from "../../../../shared/services/shipping-method-service";
import { WarehouseService } from "../../../../shared/services/warehouse-service";
import { environment } from "../../../../../environments/environment";
import { JwtService } from "../../../../shared/services/jwt.service";
import { AuthorityComponent } from "../../../../shared/component/authority.component";
import { ActivatedRoute, Router } from "@angular/router";
import { PackageModalComponent } from '../../../order/components/modals/packageModal/packageModal.component';
import { OrderDetailModalComponent } from '../../../order/components/modals/order-detail-modal/order-detail-modal.component';
import { InFreightComponent } from '../modals/in-freight/in-freight.component';
import { InFreightsComponent } from '../modals/in-freights/in-freights.component';
import {PackageFeeService} from "../../../../shared/services/package-fee-service";

class SelectOptionModel {
  value: string;
  name: string;
}

export class CommonOptionModel {
  text: string;
  value: any;
}

@Component({
  selector: 'app-reconciliation',
  templateUrl: './reconciliation.component.html',
  styleUrls: ['./reconciliation.component.scss', '../../style.scss'],
  providers: [PackageService, OrderInfoService, ShippingMethodService, WarehouseService, JwtService, PackageFeeService]
})

export class ReconciliationComponent extends AuthorityComponent implements OnInit {
  @Input()
  items: PackageListModel[] = [];
  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  searchText: string;
  batchsearchText: string;
  searchType: string = 'ByPackageNumber';
  batchsearchType: string = 'OrderNumber';

  dataNumber: number = 1;

  selectOrderSearchStatus: string = 'Shipped';
  selectShippingServiceId: number;
  selectTrackNumberType: string;
  selectedTimeValueType: string;

  ngTimeSearchStart: any = {};
  ngTimeSearchEnd: any = {};
  ngShortTimeStart: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  ngShortTimeEnd: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  timeSearchStart: string = '';
  timeSearchEnd: string = '';
  hasSpFeeChecking: string = null;
  selectedTimeFiltType: string = 'CreateTime';
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };
  selectedWarehouseId: number;
  warehouseAllShippingService;
  warehouseShippingMerchant: Array<any> = [{ ssid: 1, name: '云途' }, { ssid: 2, name: '邮政' }];
  allWarehouses;

  selectPackageIds: number[] = [];
  isCheckAllPages: boolean = false;

  constructor(public http: Http,
    private modalService: NgbModal,
    private packageSearchService: PackageService,
    private packageFeeService: PackageFeeService,
    private shippingMethodService: ShippingMethodService,
    private jwtService: JwtService,
    private warehouseService: WarehouseService, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
  }


  seekmode = 0;

  seekMode(i) {
    this.seekmode = i;

  }

  searchMore: boolean = false;

  modalstate = 0;
  screen = [];
  dataSource: Observable<any>;
  dataState = false;

  reconciliationStatus: CommonOptionModel[] = [{ text: '全部', value: null },
  { text: '已对账', value: 'true' }, { text: '未对账', value: 'false' }];

  supprtTimeValueTypes: CommonOptionModel[] = [{ text: '全部', value: null },
  { text: '今天', value: 'Today' }, { text: '昨天', value: 'Yesterday' }, { text: '7天以内', value: 'Within7Days' },
  { text: '30天以内', value: 'Within30Days' }, { text: '自定义', value: 'Custom' }];

  TrackNumberTypes: CommonOptionModel[] = [{ text: '全部', value: null },
  { text: 'API获取 ', value: 'Api' },
  { text: '录入/导入', value: 'EntryOrImport' }
  ];
  TimeSreenningTypes: SelectOptionModel[] =
    [
      { name: '创建时间', value: 'CreateTime' },
      { name: '发货时间', value: 'deliverytime' },
      { name: '支付时间', value: 'PayTime' },
      { name: '配货时间', value: 'Timedistribution' },
    ];
  types: SelectOptionModel[] = [{ name: '包裹号', value: 'ByPackageNumber' },
  { name: '订单号', value: 'ByOrderNumber' },
  { name: '买家姓名', value: 'ByName' },
  { name: 'SKU', value: 'BySkuCode' },
  { name: '跟踪号码', value: 'TrackingNumber' },
  { name: '拣货任务', value: 'ByPickingNumber' },
  { name: '物流转单号', value: 'BySPPackageId' },
  ];


  ngOnInit() {


    this.warehouseService.getAllOptions().subscribe(data => {
      this.allWarehouses = data.content;
      this.selectedWarehouseId = this.allWarehouses[0].warehouseId;

      this.getSpServiceForPackage();
      this.getWarehouseShippingServiceForPackage();
      this.loadData();

    });

  }

  getSpServiceForPackage() {
    this.packageSearchService.getSpServiceForPackage(this.selectedWarehouseId).subscribe(data => {
      this.warehouseShippingMerchant = data.content;
    });
  }
  getWarehouseShippingServiceForPackage() {
    this.packageSearchService.getWarehouseShippingServiceForPackage(this.selectedWarehouseId, null).subscribe(data => {
      this.warehouseAllShippingService = data.content;
    });
  }


  loadData(pageNumber: number = 1) {

    const selectServiceArrayIds = this.selectShippingServiceIdArray.join(',');
    this.packageFeeService.getPageList(this.selectedTimeFiltType,this.selectedWarehouseId, this.selectOrderSearchStatus,
      selectServiceArrayIds, this.selectTrackNumberType,
      this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
      this.batchsearchType, this.batchsearchText,
      this.searchText, this.searchType, pageNumber,
      this.pageSize, this.selectwarehouseShippingMerchant, this.hasSpFeeChecking).subscribe(data => {
        this.dataNumber = data.content.items.length;
        this.items = data.content.items;
        const pageInfo = data.content.pageInfo;
        this.pageSize = pageInfo.pageSize;
        this.pageNumber = pageInfo.pageIndex + 1;
        this.total = pageInfo.totalCount;
      }, this.handleError);
  }

  onSearchTypeSelect($event, selectSearchType: string) {
    this.searchType = selectSearchType;
  }


  onSelectReconciliationStatus(value: string) {
    this.hasSpFeeChecking = value;
    this.doSearch();
  }

  onTrackNumberTypes(type: string) {
    this.selectTrackNumberType = type;

    this.doSearch();
  }

  selectShippingServiceIdArray: Array<any> = [];
  checkedAll: boolean = true;
  onSelectShippingService(ssId: number) {
    let index = this.selectShippingServiceIdArray.indexOf(ssId);
    if (index == -1) {
      this.selectShippingServiceIdArray.push(ssId);
    }
    else {
      this.selectShippingServiceIdArray.splice(index, 1);
    }
    if (ssId == null) {
      this.selectShippingServiceIdArray = [];
    }
    this.checkedAll = !(this.selectShippingServiceIdArray.length > 0);
    this.loadData();
    //this.selectShippingServiceId = ssId;

    //this.doSearch();
  }
  selectwarehouseShippingMerchant: number = null;
  checkedAllMerchant: boolean = true;
  onSelectShippingMerchant(ssId: number) {
    if (ssId) {
      this.selectwarehouseShippingMerchant = ssId;
      this.checkedAllMerchant = false;
    }
    else {
      this.checkedAllMerchant = true;
    }
    this.selectShippingServiceIdArray = [];

    this.packageSearchService.getWarehouseShippingServiceForPackage(this.selectedWarehouseId, ssId).subscribe(data => {
      this.warehouseAllShippingService = data.content;
    });
    this.loadData();
  }

  onWarehouseSelect(warehouseId: number) {
    this.selectedWarehouseId = warehouseId;
    this.ClearBatchSearchText();
    this.loadData();
  }

  onSelectTimeValueType(timeValue: string) {
    this.selectedTimeValueType = timeValue;
    this.ClearBatchSearchText();
    if (timeValue != 'Custom') {
      this.loadData();
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
      this.error("结束时间不能为空");
      return;
    }
    this.ClearBatchSearchText();
    this.loadData();

  }


  reload() {
    this.loadData(this.pageNumber);
  }
  doSearch() {
    this.ClearBatchSearchText();
    this.loadData();
  }
  ClearBatchSearchText() {
    this.batchsearchText = null;
    this.batchsearchType = null;
  }


  doBatchSearch() {
    this.pageSize = 20;
    this.loadData();
    this.ModalState();
  }

  onSelectdoBatchSearchType(vaule: string) {
    this.batchsearchType = vaule;
  }

  pageChanged(pN: number): void {
    $('html, body').animate({ scrollTop: 0 }, 0);
    this.dataState = false;
    this.loadData(pN);
  }


  SearchMore() {
    this.searchMore = !this.searchMore;
  }


  ModalState() {
    this.selectOrderSearchStatus = 'Shipped';
    this.selectShippingServiceId = null;
    this.selectTrackNumberType = null;
    this.selectedTimeValueType = null;
    this.timeSearchStart = null;
    this.timeSearchEnd = null;
    this.searchText = null;
    if (this.modalstate) {
      this.modalstate = 0;
      $('body').removeClass('modal-open');
    } else {
      this.modalstate = 1;
      $('body').addClass('modal-open');
      this.batchsearchType = 'OrderNumber';
    }
  }
  openPackageDetailModal(packageId: string, ordernumber: string, status: string) {
    const searchModal = this.modalService.open(PackageModalComponent, { size: 'lg', backdrop: 'static' });
    searchModal.componentInstance.modalHeader = '包裹详情';
    searchModal.componentInstance.packageId = packageId;
    searchModal.componentInstance.ordernumber = ordernumber;
    searchModal.componentInstance.status = status;
    searchModal.result.then(result => {
      this.reloadData();
    }, reason => {
    })
  }

  openOrderDetailModal(orderId: number) {
    const searchModal = this.modalService.open(OrderDetailModalComponent, { size: 'sm', backdrop: 'static' });
    searchModal.componentInstance.modalHeader = '订单详情';
    searchModal.componentInstance.orderId = orderId;
    searchModal.result.then(result => {
      this.reloadData();
    }, reason => {
    })
  }


  onCheckPackageChanged(isChecked: boolean, orderId: number) {
    if (isChecked) {
      const orderIndex = this.selectPackageIds.indexOf(orderId);
      if (orderIndex >= 0) {
        return;
      }
      else {
        this.selectPackageIds.push(orderId);
      }
    }
    else {
      const orderIndex = this.selectPackageIds.indexOf(orderId);
      if (orderIndex >= 0) {
        this.selectPackageIds.splice(orderIndex, 1);
      }
      this.isCheckAllPages = false;
    }
  }
  onSelectTimeSearchType(timeSearchType: any) {
    this.selectedTimeFiltType = timeSearchType;
    this.ClearBatchSearchText();
    if (this.selectedTimeValueType != null && this.selectedTimeValueType.length > 0) {
      this.loadData();
    }
  }
  onCheckAllPackageChanged(checked: boolean) {
    if (checked) {
      this.selectPackageIds = [];
      for (let o of this.items) {
        this.selectPackageIds.push(o.id);
      }
    }
    else {
      this.selectPackageIds = [];
      this.isCheckAllPages = false;
    }
    // console.info(this.selectPackageIds);
  }

  onCheclAllPageChange(checked: boolean) {
    if (checked) {
      this.selectPackageIds = [];
      for (let o of this.items) {
        this.selectPackageIds.push(o.id);
      }
      this.isCheckAllPages = true;
    }
    else {
      this.selectPackageIds = [];
      this.isCheckAllPages = false;
    }
  }

  reloadData() {
    this.loadData(this.pageNumber);
  }

  getDisplayText(packageRow: PackageListModel) {
    if (packageRow.status == 'Recalled') {
      return '--';
    }
    if (!this.isNullOrEmpty(packageRow.trackingNumber)) {
      return packageRow.trackingNumber;
    }
    if (!packageRow.isTrackingNumberRequired && this.isNullOrEmpty(packageRow.apiName)) {
      return '--';
    }

    if (this.isNullOrEmpty(packageRow.spPackageId)) {
      return '获取跟踪号';
    }
    return '自动获取中...';
  }

  isOnlyDisplayText(packageRow: PackageListModel) {
    if (packageRow.status == 'Recalled') {
      return true;
    }
    if (!this.isNullOrEmpty(packageRow.trackingNumber)) {
      return true;
    }

    if (!packageRow.isTrackingNumberRequired && this.isNullOrEmpty(packageRow.apiName)) {
      return true;
    }
    return false;
  }
  getDownloadLabelUrl(packageId: string, packageNumber: string): string {
    return this.packageSearchService.getDownloadUrl(packageId, packageNumber);
  }

  openOutputModal() {
    if (this.selectPackageIds.length == 0) {
      this.error("请选择需要导出的订单");
      return;
    }
    let params = {
      'ShippingServiceIds': this.selectShippingServiceIdArray,
      'SelectedWarehouseId': this.selectedWarehouseId,
      'PackageSearchStatus': this.selectOrderSearchStatus,
      'TrackNumberTypes': this.selectTrackNumberType,
      'orderSearchStatus': this.selectOrderSearchStatus,
      'SearchType': this.searchType,
      'TimeValueType': this.selectedTimeValueType,
      'timeStart': this.timeSearchStart,
      'timeEnd': this.timeSearchEnd,
      'searchText': this.searchText,
      'BatchSearchType': this.batchsearchType,
      'BatchSearchText': this.batchsearchText,
      'hasSpFeeChecking': this.hasSpFeeChecking
    };

    if (this.isCheckAllPages) {
      this.exportAllPackages(params);
    } else {
      this.exportSelectPackages();
    }
  }

  exportSelectPackages() {
    let params = new URLSearchParams();
    params.set('packageIds', this.selectPackageIds.join(','));
    const token = this.jwtService.getToken();
    params.set('token', token.toString());

    var urlPre = `${environment.api_url}/api/v1/feerulefinance/ExportPackages`;

    let url = [urlPre, params.toString()].join('?');

    let win = window.open(url);
    win.focus();
    win.location.href = url;
  }

  exportAllPackages(urlParams: any) {
    let params = new URLSearchParams();
    const token = this.jwtService.getToken();
    params.set('token', token.toString());
    for (let key in urlParams) {
      if (!urlParams[key]) {
        params.set(key, '')
      }
      else {
        params.set(key, urlParams[key])
      }
    }
    var urlPre = `${environment.api_url}/api/v1/feerulefinance/ExportPackagesAll`;

    let url = [urlPre, params.toString()].join('?');

    let win = window.open(url);
    win.focus();
    win.location.href = url;
  }


  openInFreight(packageId: string) {
    const modal = this.modalService.open(InFreightComponent, { size: 'sm', backdrop: 'static' });
    modal.componentInstance.packageId = packageId;
    modal.result.then(result => {
      this.reloadData();
    }, reason => {
    })
  }

  openInFreights() {
    const modal = this.modalService.open(InFreightsComponent, { size: 'sm', backdrop: 'static' });
    modal.componentInstance.warehouseId = this.selectedWarehouseId;
    modal.result.then(result => {
      this.reloadData();
    }, reason => {
    })
  }
}
