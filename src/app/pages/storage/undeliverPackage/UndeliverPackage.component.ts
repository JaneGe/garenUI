import { Component, OnInit, Input, animate, style, transition, trigger, state, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {NgbModal, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../shared/component/authority.component";
import {PackageListModel} from "../../../shared/models/Package/package-list-model";
import {JwtService} from "../../../shared/services/jwt.service";
import {WarehouseService} from "../../../shared/services/warehouse-service";
import {ShippingMethodService} from "../../../shared/services/shipping-method-service";
import {OrderInfoService} from "../../../shared/services/order.service";
import {PackageService} from "../../../shared/services/package-search-service";
import {environment} from "../../../../environments/environment";
import {PackageModalComponent} from "../../order/components/modals/packageModal/packageModal.component";
import {OrderDetailModalComponent} from "../../order/components/modals/order-detail-modal/order-detail-modal.component";
class SelectOptionModel {
  value: string;
  name: string;
}

export class CommonOptionModel {
  text: string;
  value: any;
}


@Component({
  selector: 'app-undeliverPackage',
  templateUrl: './UndeliverPackage.component.html',
  styleUrls: ['./UndeliverPackage.component.scss', '../style.scss'],
  providers: [PackageService, OrderInfoService, ShippingMethodService, WarehouseService, JwtService]
})
export class UndeliverPackageComponent extends AuthorityComponent implements OnInit {
  @Input()
  items: PackageListModel[] = [];
  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  searchText: string;
  batchsearchText: string;
  searchType: string = 'ByPackageNumber';
  batchsearchType: string = 'OrderNumber';
  timeStart: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  timeEnd: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  dataNumber: number = 1;

  selectOrderSearchStatus: string;
  selectShippingServiceId: number;
  selectTrackNumberType: string;
  selectedTimeValueType: string;

  timeSearchStart: any = new Date();
  timeSearchEnd: any = new Date();

  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  selectedWarehouseId: number;
  warehouseAllShippingService;
  allWarehouses;

  selectPackageIds: number[] = [];
  isCheckAllPages: boolean = false;

  constructor(public http: Http,
    private modalService: NgbModal,
    private orderInfoService: OrderInfoService,
    private packageSearchService: PackageService,
    private shippingMethodService: ShippingMethodService,
    private jwtService: JwtService,
    private warehouseService: WarehouseService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
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

  // allPackageSearchStatus: CommonOptionModel[] = [{ text: '全部', value: null },
  // { text: '已配货', value: 'Allocated' }, { text: '拣货中', value: 'InPicking' }, { text: '已打印', value: 'Printed' },
  // { text: '已发货', value: 'Shipped' }, { text: '已回收', value: 'Recalled' }];

  suppprtTimeValueTypes: CommonOptionModel[] = [{ text: '全部', value: null },
  { text: '今天', value: 'Today' }, { text: '昨天', value: 'Yesterday' }, { text: '7天以内', value: 'Within7Days' },
  { text: '30天以内', value: 'Within30Days' }, { text: '自定义', value: 'Custom' }];

  TrackNumberTypes: CommonOptionModel[] = [{ text: '全部', value: null },
  { text: 'API获取 ', value: 'Api' },
  { text: '录入/导入', value: 'EntryOrImport' }
  ];

  types: SelectOptionModel[] = [{ name: '包裹号', value: 'ByPackageNumber' },
  { name: '订单号', value: 'ByOrderNumber' },
  { name: '买家姓名', value: 'ByName' },
  { name: 'SKU', value: 'BySkuCode' },
  { name: '跟踪号码', value: 'TrackingNumber' },
  { name: '拣货任务', value: 'ByPickingNumber' }
  ];


  ngOnInit() {


    this.warehouseService.getAllOptions().subscribe(data => {
      this.allWarehouses = data.content;
      this.selectedWarehouseId = this.allWarehouses[0].warehouseId;

      this.shippingMethodService.getWarehouseAllSelectedShippingService(this.selectedWarehouseId).subscribe(data => {
        this.warehouseAllShippingService = data.content;
      });

      this.loadData();

    });
    this.timeSearchStart.setDate(this.timeSearchStart.getDate() - 1);

  }


  loadData(pageNumber: number = 1) {
    this.packageSearchService.getNotShipmentPackageList(this.selectedWarehouseId, this.selectOrderSearchStatus,
      this.selectShippingServiceId, this.selectTrackNumberType,
      this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
      this.batchsearchType, this.batchsearchText,
      this.searchText, this.searchType, pageNumber, this.pageSize).subscribe(data => {
        this.dataNumber = data.content.items.length;
        this.items = data.content.items;
        console.log(this.items);

        const pageInfo = data.content.pageInfo;

        this.pageSize = pageInfo.pageSize;
        this.pageNumber = pageInfo.pageIndex + 1;
        this.total = pageInfo.totalCount;
      }, this.handleError);
  }

  onSearchTypeSelect($event, selectSearchType: string) {
    this.searchType = selectSearchType;
  }


  // onSelectPackageStatus(status: string) {
  //   this.selectOrderSearchStatus = status;
  //
  //   this.doSearch();
  //   }

  onTrackNumberTypes(type: string) {
    this.selectTrackNumberType = type;

    this.doSearch();
  }

  onSelectShippingService(ssId: number) {
    this.selectShippingServiceId = ssId;

    this.doSearch();
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

    if (this.timeSearchStart == null || this.timeSearchStart.length < 1) {
      this.error("开始时间不能为空")
      return;
    }
    if (this.timeSearchEnd == null || this.timeSearchEnd.length < 1) {
      this.error("结束时间不能为空")
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
    this.batchsearchType = 'OrderNumber';
    this.selectOrderSearchStatus = null;
    this.selectShippingServiceId = null;
    this.selectTrackNumberType = null;
    this.selectedTimeValueType = null;
    this.timeSearchStart = null;
    this.timeSearchEnd = null;
    if (this.modalstate) {
      this.modalstate = 0;
      $('body').removeClass('modal-open');
    } else {
      this.modalstate = 1;
      $('body').addClass('modal-open');
    }
  }

  ClearBatchSearchText() {
    this.batchsearchText = null;
    this.batchsearchType = null;
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
      'ShippingServiceId': this.selectShippingServiceId,
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
      'BatchSearchText': this.batchsearchText
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

    var urlPre = `${environment.api_url}/api/v1/package/ExportNotShipmentPackages`;

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
    var urlPre = `${environment.api_url}/api/v1/package/ExportNotShipmentPackagesAll`;

    let url = [urlPre, params.toString()].join('?');

    let win = window.open(url);
    win.focus();
    win.location.href = url;
  }

  // isDisplayLink(packageRow: PackageListModel) {
  //   if (!this.isNullOrEmpty(packageRow.trackingNumber)) {
  //     return false;
  //   }
  //   if (!packageRow.isTrackingNumberRequired) {
  //     return false;
  //   }
  //   if (this.isNullOrEmpty(packageRow.apiName)) {
  //     return '';
  //   }
  //   if (this.isNullOrEmpty(packageRow.spPackageId)) {
  //     return true;
  //   }
  //   return true;
  // }

}
