import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import { AbnormalDetailComponent } from '../modals/abnormalDetail/abnormalDetail.component';
import { RootComponent } from "../../../shared/component/root.component";
import { PackageService } from "../../../shared/services/package-search-service";
import { CommonOptionModel } from "../../../shared/services/site-const";
import { WarehouseService } from "../../../shared/services/warehouse-service";
import { PackageDetailComponent } from 'app/pages/storage/modals/package-detail/package-detail.component';
import { CheckedBillComponent } from 'app/pages/storage/modals/checked-bill/checked-bill.component';
import { TaskListComponent } from 'app/pages/storage/modals/task-list/task-list.component';
import { PickingFaileRecordService } from "../../../shared/services/picking-faile-record.service";
import { PickingFailSkusListModel } from "../../../shared/models/pickings/picking-fail-skus-list-model";
import { PickingFailCheckingTaskListModel } from "../../../shared/models/pickings/picking-fail-checking-task-list-model";
import { PrintCheckingInventoryTaskModalComponent } from "../modals/print-checking-inventory-task-modal/print-checking-inventory-task-modal.component";
import { EnterPurchaseComponent } from 'app/pages/storage/modals/enter-purchase/enter-purchase.component';
import { stat } from "fs";
import {AuthorityComponent} from "../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-abnormal-package',
  templateUrl: './abnormal-package.component.html',
  styleUrls: ['./abnormal-package.component.scss'],
  providers: [PackageService, WarehouseService, PickingFaileRecordService]
})
export class AbnormalPackageComponent extends AuthorityComponent implements OnInit {
  ngTimeSearchStart1: any = {};
  ngTimeSearchEnd1: any = {};
  ngShortTimeStart1: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  ngShortTimeEnd1: NgbTimeStruct = {hour: 0, minute: 0, second: 0};


  ngTimeSearchStart2: any = {};
  ngTimeSearchEnd2: any = {};
  ngShortTimeStart2: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  ngShortTimeEnd2: NgbTimeStruct = {hour: 0, minute: 0, second: 0};



  ngTimeSearchStart3: any = {};
  ngTimeSearchEnd3: any = {};
  ngShortTimeStart3: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  ngShortTimeEnd3: NgbTimeStruct = {hour: 0, minute: 0, second: 0};

  timeSearchStart:string='';

  timeSearchEnd:string='';
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;

  isCustom: boolean = false;

  warehouse = [];
  timeChoose = [];
  timeSpan = [];

  item: any[] = [];
  failSkuList: PickingFailSkusListModel[] = [];
  taskLists: PickingFailCheckingTaskListModel[] = [];

  allWarehouses;
  selectedIsShipped: boolean;
  selectIsPurchased: boolean;
  selectedIsCompletedStatus: boolean;
  selectedCanShipStatus: boolean;
  selectedUntreatedSearchType: string;
  selectedPackageType: string;
  selectedWarehouseId: number;
  selectedTimeFiltType: string = 'CreatedTime';
  selectedTimeValueType: string;

  selectSearchType: string= 'SKUCode';
  searchText: string;

  selectPackageIds: number[] = [];
  isCheckAllPages: boolean = false;

  suppprtSearchIsExceptionStatus: CommonOptionModel[] = [{ text: '全部', value: null }, { text: '异常件', value: 'False' },
  { text: '已发货', value: 'True' }];
  suppprtHandleTypes: CommonOptionModel[] = [{ text: '全部', value: null }, { text: '是', value: 'True' },
  { text: '否', value: 'False' }];
  suppprtGenerateTypes: CommonOptionModel[] = [{ text: '全部', value: null }, { text: '是', value: 'True' },
  { text: '否', value: 'False' }];

  suppprtPackageTypes: CommonOptionModel[] = [{ text: '全部', value: null },
  { text: '单品多', value: 'SingleSkuMoreItem' }, { text: '多品', value: 'MoreSkuMoreItem' }];
  suppprtUntreatedTypes: CommonOptionModel[] = [{ text: '全部', value: null },
  { text: '1天', value: 'OneDay' }, { text: '2天', value: 'TwoDay' },
  { text: '3天', value: 'ThreeDay' }, { text: '4天', value: 'FourDay' },
  { text: '5天', value: 'FiveDay' }, { text: '5天以上', value: 'MoreFiveDay' }];

  suppprtSearchTimeTypes: CommonOptionModel[] = [{ text: '创建时间', value: 'CreatedTime' },
  { text: '发货时间', value: 'CompletedTime' }];

  suppprtTimeValueTypes: CommonOptionModel[] = [{ text: '全部', value: null },
  { text: '今天', value: 'Today' }, { text: '昨天', value: 'Yesterday' }, { text: '7天以内', value: 'Within7Days' },
  { text: '30天以内', value: 'Within30Days' }, { text: '自定义', value: 'Custom' }];

  suppprtSearchTypes: CommonOptionModel[] = [{ text: 'Sku', value: 'SKUCode' },{ text: '包裹号', value: 'PackageNumber' },
  { text: '货架位', value: 'LocationCode' }];

  suppprtTaskTimeValueTypes: CommonOptionModel[] = [{ text: '全部', value: null },
  { text: '今天', value: 'Today' }, { text: '昨天', value: 'Yesterday' }, { text: '7天以内', value: 'Within7Days' },
  { text: '30天以内', value: 'Within30Days' }, { text: '自定义', value: 'Custom' }];

  suppprtTaskSearchTypes: CommonOptionModel[] = [{ text: 'SKU', value: 'SKUCode' }, { text: '盘库任务编号', value: 'TaskNumber' }];

  isCheckAllFailSkus: boolean = false;
  checkedFailSkuRecordIds: number[] = [];

  constructor(private modalService: NgbModal,
    private packageService: PackageService,
    private pickingFaileRecordService: PickingFaileRecordService,
    private warehouseService: WarehouseService,public activerouter: ActivatedRoute,public router:Router) {
    super(activerouter,router);
  }

  ngOnInit() {

    this.warehouseService.getAllOptions().subscribe(data => {
      this.allWarehouses = data.content;
      this.selectedWarehouseId = this.allWarehouses[0].warehouseId;
      this.loadData();

    });

  }

  loadData(pageNumber: number = 1) {
    // if(this.selectSearchType==null)
    // {
    //   if (this.tabChangedIndex == 0) {
    //     this.selectSearchType='SKUCode';
    //   }
    //   else if (this.tabChangedIndex == 1) {
    //     this.selectSearchType='SKUCode';
    //   }
    //   else if (this.tabChangedIndex == 2) {
    //     this.selectSearchType='PackageNumber';
    //   }
    //   console.log(this.selectSearchType);
    // }

    if (this.tabChangedIndex == 0) {
      this.pickingFaileRecordService.getPickingFailSkusList(this.selectedWarehouseId, this.selectedTimeValueType,
        this.timeSearchStart, this.timeSearchEnd, this.searchText,
        this.selectSearchType, pageNumber, this.pageSize).subscribe(data => {
          this.failSkuList = data.content.items;
          const pageInfo = data.content.pageInfo;
          this.pageSize = pageInfo.pageSize;
          this.pageNumber = pageInfo.pageIndex + 1;
          this.total = pageInfo.totalCount;
        }, this.handleError);
    }
    else if (this.tabChangedIndex == 1) {
      this.pickingFaileRecordService.getCheckingInventoryTaskList(this.selectedWarehouseId, this.selectedTimeValueType,
        this.timeSearchStart, this.timeSearchEnd, this.searchText,
        this.selectSearchType, pageNumber, this.pageSize).subscribe(data => {
          this.taskLists = data.content.items;
          const pageInfo = data.content.pageInfo;
          this.pageSize = pageInfo.pageSize;
          this.pageNumber = pageInfo.pageIndex + 1;
          this.total = pageInfo.totalCount;
        }, this.handleError);
    }
    else if (this.tabChangedIndex == 2) {
      this.packageService.getPackagePickingFailList(this.selectedWarehouseId, this.selectedIsShipped,
        this.selectedTimeFiltType, this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
        this.searchText, this.selectSearchType, pageNumber, this.pageSize, this.selectIsPurchased,
        this.selectedCanShipStatus, this.selectedPackageType,
        this.selectedUntreatedSearchType)
        .subscribe(data => {
          this.item = data.content.items;
          const pageInfo = data.content.pageInfo;
          this.pageSize = pageInfo.pageSize;
          this.pageNumber = pageInfo.pageIndex + 1;
          this.total = pageInfo.totalCount;
        }, this.handleError);
    }
   // this.selectSearchType=null;
  }


  pageChanged(pN: number): void {
    this.loadData(pN);
  }

  dateTransition() {

      if (this.tabChangedIndex == 0) {
        if (this.ngTimeSearchStart1.year&&this.ngShortTimeStart1) {
          this.timeSearchStart=this.ngTimeSearchStart1.year+'-'+this.ngTimeSearchStart1.month+'-'+this.ngTimeSearchStart1.day+' '+
            this.ngShortTimeStart1.hour+':'+this.ngShortTimeStart1.minute+':'+this.ngShortTimeStart1.second;

        }else{
          this.timeSearchStart='';
        }
        if (this.ngTimeSearchEnd1.year&&this.ngShortTimeEnd1) {
          this.timeSearchEnd = this.ngTimeSearchEnd1.year+'-'+this.ngTimeSearchEnd1.month+'-'+this.ngTimeSearchEnd1.day+' '+
            this.ngShortTimeEnd1.hour+':'+this.ngShortTimeEnd1.minute+':'+this.ngShortTimeEnd1.second;
        }else{
          this.timeSearchEnd='';
        }
      }
      else if (this.tabChangedIndex == 1) {
        if (this.ngTimeSearchStart2.year&&this.ngShortTimeStart2) {
          this.timeSearchStart=this.ngTimeSearchStart2.year+'-'+this.ngTimeSearchStart2.month+'-'+this.ngTimeSearchStart2.day+' '+
            this.ngShortTimeStart2.hour+':'+this.ngShortTimeStart2.minute+':'+this.ngShortTimeStart2.second;

        }else{
          this.timeSearchStart='';
        }
        if (this.ngTimeSearchEnd2.year&&this.ngShortTimeEnd2) {
          this.timeSearchEnd = this.ngTimeSearchEnd2.year+'-'+this.ngTimeSearchEnd2.month+'-'+this.ngTimeSearchEnd2.day+' '+
            this.ngShortTimeEnd2.hour+':'+this.ngShortTimeEnd2.minute+':'+this.ngShortTimeEnd2.second;
        }else{
          this.timeSearchEnd='';
        }
      }
      else if (this.tabChangedIndex == 2) {
        if (this.ngTimeSearchStart3.year&&this.ngShortTimeStart3) {
          this.timeSearchStart=this.ngTimeSearchStart3.year+'-'+this.ngTimeSearchStart3.month+'-'+this.ngTimeSearchStart3.day+' '+
            this.ngShortTimeStart3.hour+':'+this.ngShortTimeStart3.minute+':'+this.ngShortTimeStart3.second;

        }else{
          this.timeSearchStart='';
        }
        if (this.ngTimeSearchEnd3.year&&this.ngShortTimeEnd3) {
          this.timeSearchEnd = this.ngTimeSearchEnd3.year+'-'+this.ngTimeSearchEnd3.month+'-'+this.ngTimeSearchEnd3.day+' '+
            this.ngShortTimeEnd3.hour+':'+this.ngShortTimeEnd3.minute+':'+this.ngShortTimeEnd3.second;
        }else{
          this.timeSearchEnd='';
        }
      }



  }

  //openDetailModal(pickingId: number,packageId:number) {
  openDetailModal(packageId: number) {
    const detailModal = this.modalService.open(AbnormalDetailComponent,
      { size: 'sm', backdrop: 'static' });
    // detailModal.componentInstance.pickingId = pickingId;
    detailModal.componentInstance.packageId = packageId;
  }

  printPackageDetailModal(theTaskId: number) {
    const detailModal = this.modalService.open(PrintCheckingInventoryTaskModalComponent,
      { size: 'sm', backdrop: 'static' });
    detailModal.componentInstance.taskId = theTaskId;
  }

  printCheckedBillModal() {
    const detailModal = this.modalService.open(CheckedBillComponent,
      { size: 'sm', backdrop: 'static' });
  }

  onWarehouseSelect(warehouseId: number) {
    this.selectedWarehouseId = warehouseId;
    this.loadData();
  }

  onSelectedIsExceptionStatus(status: boolean) {
    this.selectedIsShipped = status;
    this.doSearch();
  }

  onSelectedCanShipStatus(status: boolean) {
    this.selectedCanShipStatus = status;
    this.doSearch();
  }

  onSelectedIsCompletedStatus(status: boolean) {
    this.selectIsPurchased = status;
    this.doSearch();
  }

  onSelectedPackageType(status: string) {
    this.selectedPackageType = status;
    this.doSearch();
  }

  onSelectedUntreatedSearchType(status: string) {
    this.selectedUntreatedSearchType = status;
    this.doSearch();
  }

  onSelectTimeSearchType(timeSearchType: string) {
    this.selectedTimeFiltType = timeSearchType;
    if (this.selectedTimeValueType != null && this.selectedTimeValueType.length > 0) {
      this.loadData();
    }
  }

  onSelectTimeValueType(timeValue: string) {
    this.selectedTimeValueType = timeValue;
    if (timeValue != 'Custom') {
      this.loadData();
    } else {
      this.dateTransition();
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
      return;
    }
    this.loadData();
  }

  onSelectSearchType(type: string) {
    this.selectSearchType = type;
  }

  doSearch() {
    this.loadData();
  }

  onCheclAllPageChange(checked: boolean) {
    if (checked) {
      this.selectPackageIds = [];
      for (let o of this.item) {
        this.selectPackageIds.push(o.id);
      }
      this.isCheckAllPages = true;
    }
    else {
      this.selectPackageIds = [];
      this.isCheckAllPages = false;
    }
  }

  onCheckAllPackageChanged(checked: boolean) {
    if (checked) {
      this.selectPackageIds = [];
      for (let o of this.item) {
        this.selectPackageIds.push(o.id);
      }
    }
    else {
      this.selectPackageIds = [];
      this.isCheckAllPages = false;
    }
    console.info(this.selectPackageIds);
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

  creatNewExceptionInformation() {

    this.confirm("确定生成新异常件信息?", () => {

      if (this.isCheckAllPages) {
        console.log('选中所有页');
        // this.packageService.creatNewExceptionInformation(this.selectedWarehouseId, this.selectedIsExceptionStatus,
        //   this.selectedTimeFiltType, this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
        //   this.searchText, this.selectSearchType,
        //   this.selectedCanHandleStatus,this.selectedIsCompletedStatus, this.selectedPackageType,null).subscribe(data => {
        //
        //   this.alertMessage("生成新异常件信息成功");
        //  this.loadData();
        // }, this.handleError);
        this.printCheckedBillModal();
      }
      else {
        console.log('单选');
        if (this.selectPackageIds == null || this.selectPackageIds.length == 0) {
          this.error("请选择操作包裹!");
          return;
        }

        // this.packageService.creatNewExceptionInformation(this.selectedWarehouseId, this.selectedIsExceptionStatus,
        //   this.selectedTimeFiltType, this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
        //   this.searchText, this.selectSearchType,
        //   this.selectedCanHandleStatus,this.selectedIsCompletedStatus, this.selectedPackageType,this.selectPackageIds).subscribe(data => {
        //
        //   this.alertMessage("生成新异常件信息成功");
        //   this.loadData();
        // }, this.handleError);

      }

    });

  }

  tabChangedIndex: number = 0;

  tabChange(tabChanged: number) {
    this.pageSize = 20;
    this.pageNumber = 1;

    this.selectedWarehouseId=this.allWarehouses[0].warehouseId;
    this.selectedTimeValueType=null;
    this.selectSearchType='SKUCode';
    this.searchText=null;

    this.tabChangedIndex = tabChanged;
    this.loadData();
  }

  openTaskList() {
    const detailModal = this.modalService.open(TaskListComponent,
      { size: 'sm', backdrop: 'static' });
  }

  onCheckAllFailSkusChanged(checked: boolean) {
    if (checked) {
      this.checkedFailSkuRecordIds = [];
      for (let o of this.failSkuList) {
        this.checkedFailSkuRecordIds.push(o.recordItemId);
      }
      this.isCheckAllFailSkus = true;
    }
    else {
      this.checkedFailSkuRecordIds = [];
      this.isCheckAllFailSkus = false;
    }
  }

  onCheckThePageFailSkusChanged(checked: boolean) {
    if (checked) {
      this.checkedFailSkuRecordIds = [];
      for (let o of this.failSkuList) {
        this.checkedFailSkuRecordIds.push(o.recordItemId);
      }
    }
    else {
      this.checkedFailSkuRecordIds = [];
      this.isCheckAllFailSkus = false;
    }
  }

  onCheckFailSkusChanged(isChecked: boolean, failRecordId: number) {
    if (isChecked) {
      const orderIndex = this.checkedFailSkuRecordIds.indexOf(failRecordId);
      if (orderIndex >= 0) {
        return;
      }
      else {
        this.checkedFailSkuRecordIds.push(failRecordId);
      }
    }
    else {
      const orderIndex = this.checkedFailSkuRecordIds.indexOf(failRecordId);
      if (orderIndex >= 0) {
        this.checkedFailSkuRecordIds.splice(orderIndex, 1);
      }
      this.isCheckAllFailSkus = false;
    }
  }

  createCheckingStockTask() {
    if (this.checkedFailSkuRecordIds.length < 1) {
      this.error("请选择需要盘库的Sku");
      return;
    }
    let data = <any>{};
    data.selectedWarehouseId = this.selectedWarehouseId;
    if (!(data.selectedWarehouseId > 0)) {
      this.error("请选择仓库");
      return;
    }


    this.confirm("确定生成盘库任务", () => {
      if (this.isCheckAllFailSkus) {
        data.TimeValueType = this.selectedTimeValueType;
        data.TimeStart = this.timeSearchStart;
        data.TimeEnd = this.timeSearchEnd;
        data.SearchText = this.searchText;
        data.TimeValueType = this.selectedTimeValueType;
      }
      else {
        data.itemIds = this.checkedFailSkuRecordIds;
      }

      console.info(data);

      this.pickingFaileRecordService.createCheckingStockTask(data).subscribe(re => {
        this.alertMessage("生成成功");
      }, this.handleError);
    });
  }

  enterPurchaseNumber(packageId: number) {
    const modal = this.modalService.open(EnterPurchaseComponent, { size: 'sm', backdrop: 'static' });
    modal.componentInstance.packageId = packageId;
    modal.result.then(r => {
      this.loadData();
    }, e => {
    })
  }
}
