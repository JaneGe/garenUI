import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RootComponent} from "../../../shared/component/root.component";
import {ReceiveRecordModel} from "../../../shared/models/warehouses/warehouse-receiverecord-model";
import {PackageModalComponent} from "../../order/components/modals/packageModal/packageModal.component";
import {PrintGoodsBillsComponent} from "../modals/print-goods-bills/print-goods-bills.component";
import {ReallocateLogisticsComponent} from "../modals/reallocate-logistics/reallocate-logistics.component";
import {SettingReturnReasonComponent} from "../modals/setting-return-reason/setting-return-reason.component";
import {PrintBillsComponent} from "../modals/printBills/printBills.component";
import {PackageReturnService} from "../../../shared/services/package-return.service";
import {PackageReturnListModel} from "../../../shared/models/Package/paclage-return-list-model";
import {PackageService} from "../../../shared/services/package-search-service";
import {ReceiveService} from "app/pages/storage/receive-record/receive.service";
import {toggleSingleClass} from "../../../shared/publicFunction/publicFunction";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../shared/component/authority.component";

@Component({
  selector: 'app-package-return-list',
  templateUrl: './package-return-list.component.html',
  styleUrls: ['../public.scss', './package-return-list.component.scss'],
  providers: [ReceiveService, PackageReturnService, PackageService]
})
export class PackageReturnListComponent extends AuthorityComponent implements OnInit {

  warehose = [];
  pageIndex: number = 1;
  pageSize: number = 20;
  totalCount: number = 0;
  pageItems: PackageReturnListModel[] = [];

  searchParam: ReceiveRecordModel;
  record: Array<any> = [];
  operators: string[] = [];
  storeSearchKey: string = '';
  storeUserSet: string = '';
  selectName: string = '全部';
  num: number = 0;
  tracenumber: string = '';
  purchasenumer: string = '';
  confirmTraceNum: string = '';
  issearchToggle: number = 1;
  weight: number;
  receiveWay = [{id: 1, text: '跟踪号'}, {id: 2, text: '包裹号'}];
  searchTypes: any[] = [{id: 'TrackingNumber', text: '跟踪号'}, {id: 'OrderNumber', text: '订单号'},
    {id: 'PackageNumber', text: '包裹号'}, {id: 'InventoryBatchId', text: '批次Id'},
    {id: 'SkuCode', text: 'SkuCode'}
  ];
  searchTimeValueTypes = [{id: 'Today', text: '今天'}, {id: 'Yesterday', text: '昨天'}, {id: 'Within7Days', text: '7天内'}, {id: 'Within30Days', text: '30天内'}, {
    id: 'Custom', text: '自定义'}];
  selecteddaysort: any;
  isTraceNum: boolean = true;

  timeSearchStart: Date = new Date();
  timeSearchEnd:  Date = new Date();
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  selectWarehouseId: number = null;
  scanText: string = '';
  scanWeight: string = null;
  selectedReceiveWayId: number = 1;
  selectSearchType: string = 'TrackingNumber';
  searchText: string = '';
  selectTimeVauleType: string = '';
  constructor(private modalService: NgbModal,
              private packageReturnService: PackageReturnService,
              private packageSearchService: PackageService,
              private receiveService: ReceiveService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }

  ngOnInit() {
    this.receiveService.GetStorageData().subscribe(data => {
      this.warehose = data.content;
      if (data.content.length > 0) {
        this.selectWarehouseId = data.content[0].warehouseId;
      }
      this.loadData();
    });
    this.getOperator();
  }

  receiveWayChange(val: any) {
    this.selectedReceiveWayId = val;
    if (val == 1) {
      this.isTraceNum = true;
    } else {
      console.log(val);
      this.isTraceNum = false;
    }
  }

  QueryForDate() {
     this.loadData();
  }


  doScanText() {
    if (this.isNullOrEmpty(this.scanText)) {
      this.error('扫描内容不能为空');
      return;
    }
    $('#weight')[0].focus();
  }

  doScanWeight() {
    let weight = this.scanWeight;

    let reg = /^\d+(\.\d+)?$/;
    if (!reg.test(weight)) {
      this.error('重量格式不对！');
      return;
    }
    else {
      if (this.isNullOrEmpty(this.scanText)) {
        this.error('请确认扫描跟踪号是否有异常!');
        return;
      }
      if (!(this.selectWarehouseId > 0)) {
        this.error('请选择仓库!');
        return;
      }
      const data = {
        warehouseId: this.selectWarehouseId,
        scanType: this.selectedReceiveWayId,
        scanText: this.scanText,
        weight: this.scanWeight
      };
      this.packageReturnService.addReturnRecord(data).subscribe(data => {
        this.loadData();
        this.scanText = '';
        this.scanWeight = null;
        if (this.selectedReceiveWayId == 1) {
          $('#tracenum').focus();
        }
        else {
          $('#purchasenum').focus();
        }
      }, this.handleError);
    }
  }

  addClass1(target: any, type: string, item: any) {
    this.num = 0;
    //publicFunction.toggleSingleClass(target);
    switch (type) {
      case "warehouse":
        this.searchParam.wareName = item.name;
        this.searchParam.wareId = item.warehouseId;
        break;
      case 'searchType':
        this.searchParam.SearchType = item.id;
        break;
      case 'daysort':
        this.selecteddaysort = item.id;
        this.searchParam.OrderTimeSpan = item.id;
        if (item.id == 5) return;
        break;
    }
    this.loadData();
  }

  onWarehouseSelect(event: any, warehouseId: number) {
    toggleSingleClass(event.target);
    this.selectWarehouseId = warehouseId;
    this.loadData();
  }

  onSearchTypeChange(event:any, item: any) {
    toggleSingleClass(event.target);
    this.selectSearchType = item.id;
  }
  onSelectTimeValueType(event:any, item: any) {
    toggleSingleClass(event.target);
    this.timeSearchEnd = new Date();
    this.timeSearchStart = new Date();
    this.selectTimeVauleType = item.id;

    if (this.selectTimeVauleType != 'Custom') {
        this.loadData();
    }
  }
  getOperator() {
    let temp: string[] = [];
    for (var i = 0; i < this.record.length; i++) {
      var obj;
      obj = this.record[i];
      temp.push(this.record[i].operator);
    }
    for (var i = 0; i < temp.length; i++) {
      if (this.operators.indexOf(temp[i]) == -1) {
        this.operators.push(temp[i])
      }
    }
  }

  pageChanged(pN: number): void {
    this.loadData(pN);
  }

  loadData(pageNumber: number = 1) {
    this.packageReturnService.getRecordPageList(pageNumber, this.pageSize, this.selectWarehouseId, this.selectSearchType,
      this.searchText, this.selectTimeVauleType, this.timeSearchStart,  this.timeSearchEnd)
      .subscribe(data => {

      this.pageItems = data.content.items;

      this.pageIndex = data.content.pageInfo.pageIndex + 1;
      this.pageSize = data.content.pageInfo.pageSize;
      this.totalCount = data.content.pageInfo.totalCount;
    }, this.handleError);
  }

  confirmReceive(confirmTraceNum: any) {
    const param = {
      TraceNum: confirmTraceNum,
      WarehousesId: this.searchParam.wareId,
      WarehousesName: this.searchParam.wareName,
      PageIndex: this.searchParam.pageIndex,
      PageSize: this.searchParam.pageSize
    };
    if (confirmTraceNum == '') {
      this.error('请输入跟踪号');
    }
    else if (confirmTraceNum != '123') {
      this.confirm('未找到此跟踪号，是否确定收货？',
        () => {
          this.receiveService.AddReceiveRecord(param).subscribe(data => {
            this.loadData();
            $('#tracenum')[0].focus();
            this.tracenumber = '';
            this.confirmTraceNum = '';
            this.weight = null;
          });
        }, () => {
          this.confirmTraceNum = '';
        });
    }
    else {
      this.receiveService.AddReceiveRecord(param).subscribe(data => {
        this.loadData();
        $('#tracenum')[0].focus();
        this.tracenumber = '';
        this.confirmTraceNum = '';
        this.weight = null;
      });
    }
  }

  openPackageDetailModal(packageId: number) {
    const searchModal = this.modalService.open(PackageModalComponent, {size: 'lg', backdrop: 'static'});
    searchModal.componentInstance.modalHeader = '包裹详情';
    searchModal.componentInstance.packageId = packageId;
    searchModal.result.then(result => {
    }, reason => {
    })
  }

  openPrintGoodsBillsModal() {
    const searchModal = this.modalService.open(PrintGoodsBillsComponent, {size: 'lg', backdrop: 'static'});
    searchModal.result.then(result => {
    }, reason => {
    })
  }

  getDownloadUrl(packageId, packageNumber) {
    return this.packageSearchService.getDownloadUrl(packageId, packageNumber);
  }

  openReallocateLogisticsModal(packageId: number, warehouseId: number) {
    const searchModal = this.modalService.open(ReallocateLogisticsComponent, {size: 'lg', backdrop: 'static'});
    searchModal.componentInstance.packageId = packageId;
    searchModal.componentInstance.warehouseId = warehouseId;
    searchModal.result.then(result => {
      this.alertMessage("分配成功");
      this.reload();
    }, reason => {
    })
  }

  openSettingReturnReasonModal(returnRecordId: number) {
    const searchModal = this.modalService.open(SettingReturnReasonComponent, {size: 'lg', backdrop: 'static'});
    searchModal.componentInstance.packageReturnRecordId = returnRecordId;
    searchModal.result.then(result => {
      this.reload();
    }, reason => {
    })
  }

  markAsShipped(returnRecordId: number, warehouseId: number) {
    const postData = {
      RecordId: returnRecordId,
      WarehouseId: warehouseId
    };
    this.confirm("确定标记发货", () => {
      this.packageReturnService.markReturnRecordPackageShipped(postData).subscribe(data => {
        this.alertMessage("标记发货成功");
        this.reload();
      }, this.handleError);
    });
  }

  reload() {
    this.loadData(this.pageIndex);
  }

}
