import { Component, OnInit } from '@angular/core';
import { PickingService } from "../../../shared/services/picking.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PrintTaskComponent } from '../modals/printTask/printTask.component';
import { TaskEditComponent } from '../modals/taskEdit/taskEdit.component';

import * as JQuery from "jquery";
import { PackingTaskModel } from "../../../shared/models/warehouses/packing-task-model";
import { CommonOptionModel } from "app/shared/services/site-const";
import { RootComponent } from "../../../shared/component/root.component";
import { TaskDetailComponent } from "../modals/task-detail/task-detail.component";
import { AllSkuDetailComponent } from "../modals/all-sku-detail/all-sku-detail.component";
import { PackingInventoryComponent } from 'app/pages/storage/modals/packing-inventory/packing-inventory.component';
import {StockService} from "../quantity-in-stock/stock.service";
import {AuthorityComponent} from "../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-packing-task',
  templateUrl: './packing-task.component.html',
  styleUrls: ['./packing-task.component.scss'],
  providers: [PickingService]
})
export class PackingTaskComponent extends AuthorityComponent implements OnInit {
  warehose: Array<any> = [];
  allStatsus = [{ text: '全部', value: -1 }, { text: '已指派', value: 1 }, { text: '未完成', value: 2 }, { text: '已完成', value: 3 }];
 // taskSchedule = [{ text: '全部', value: null }, { text: '已完成', value: 1 }, { text: '未完成', value: 2 }];

  //allStatsus: CommonOptionModel[] = [{ text: '全部', value: -1 }, { text: '已指派', value: 1 }, { text: '发货中', value: 2 }, { text: '已发货', value: 3 }];
  taskData: Array<any> = [];
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  searchParam: PackingTaskModel;
  pageSize: number = 10;
  storeSearchKey: string = '';
  tracenumber: string = '';

  pendingGeneratePackageCount: number = 0;
  WaitingForTaskCount: number = 0;
  loadingGeneratePicking: boolean = false;
  toggleOperate: number = 1;
  constructor(private pickingService: PickingService,
    private modalService: NgbModal,
              private stockService:StockService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }

  ngOnInit() {
    this.stockService.getMarkPackageFailEvent().subscribe(data=>{
      if(data=='marked'){
        this.loadData(this.PageInfo.pageIndex);
      }
    });
    this.searchParam = new PackingTaskModel();
    this.pickingService.GetStorageData().subscribe(data => {
      this.warehose = data.content;

      if (this.warehose.length > 0) {
        this.searchParam.wareHouseId = this.warehose[0].warehouseId;
        this.searchParam.status = 1;
        this.loadPendingInfo();
      }
      this.loadData();
    });
  }


  OnWarehouseChange($event) {
    this.searchParam.wareHouseId = $event.value;
    this.loadData();
    this.loadPendingInfo();
    // this.searchParam.wareHouseId = name.warehouseId;
    // alert(name.warehouseId);
    // this.loadData();
    // this.loadPendingInfo();
  }

  genterTask() {
    if (this.storeSearchKey == '') {
      this.error("请输入工号信息!");
      return;
    }
    if(this.searchParam.wareHouseId == null){
      this.error("请选择仓库!");
      return;
    }
    this.pickingService.AssignedPickTaskToUserById(this.searchParam.wareHouseId, this.storeSearchKey).subscribe(data => {
      this.storeSearchKey = '';
      const assignedPickId = data.content;
      this.openModal(assignedPickId);
      this.loadData();
    }, e => {
      this.storeSearchKey = '';
      this.handleError(e);
    });
  }


  loadPendingInfo() {
    if (!this.isNullOrEmpty(this.searchParam.wareHouseId)) {
      this.pickingService.getPendingHandlePackageInfo(this.searchParam.wareHouseId).subscribe(data => {
        this.pendingGeneratePackageCount = data.content;
      }, this.handleError);
    }
  }

  changeTab(type: number) {
    this.toggleOperate = type;
    if (type == 1) {
      this.searchParam.status = 1;
      this.storeSearchKey = '';
      this.loadData();
    } else {
      this.selectedpStatus = -1;
      this.searchParam.status = -1;
      this.storeSearchKey = '';
      this.loadData();

    }
  }

  selectedpStatus: any = this.allStatsus[0].value;
  onStatusChange(value: number) {
    console.log(value);
    
    this.selectedpStatus = value;
    this.searchParam.status = value;
    this.loadData();
  }

  // onSlectProgress(value: number) {
  //   this.searchParam.progress = value;
  //   console.log( this.searchParam.progress);
  //   this.loadData();
  // }

  pageChanged(pN: number): void {
    this.loadData(pN);
  }

  loadData(pageNumber: number = 1) {
    // this.taskData = this.ReceiveService.taskData;
    // this.total = this.taskData.length;
    // this.pageNumber = pageNumber;
    this.searchParam.pageSize = this.PageInfo.pageSize;
    this.searchParam.pageIndex = pageNumber - 1;
    this.searchParam.searchText = this.storeSearchKey;

    this.pickingService.GetPickTaskQuery(this.searchParam).subscribe(data => {
      this.taskData = data.content.pageLists.items;
      console.log(this.taskData);

      this.PageInfo = data.content.pageLists.pageInfo;
      this.WaitingForTaskCount = data.content.waitingForTask;
      this.PageInfo.pageIndex++;
    });
  }

  openModal(id: number) {
    const printModal = this.modalService.open(PrintTaskComponent,
      { size: 'sm', backdrop: 'static' });
    printModal.componentInstance.pickId = id;
  }

  openPackingInventory(id: number) {
    const printModal = this.modalService.open(PackingInventoryComponent,
      { size: 'sm', backdrop: 'static' });
    printModal.componentInstance.pickId = id;
  }

  printPDF(url: string) {
    const featrure = "toolbar=yes, location=yes, directories=no, " +
      "status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=600, height=600";
    let newWin = window.open(url, "_blank", featrure);
    //newWin.location.href = url;
    //newWin.focus();
    this.storeSearchKey = '';
  }

  // PickingTask() {
  //   this.openModal();
  //   this.tracenumber = '';
  // }
  openDetailsModal(picknumber: number, id: number, empName: string, packType: string) {
    const activeModal = this.modalService.open(TaskDetailComponent,
      { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = '查看包裹详情';
    activeModal.componentInstance.pickId = id;
    activeModal.componentInstance.picknumber = picknumber;
    activeModal.componentInstance.packType = packType;
    activeModal.componentInstance.empName = empName;
    activeModal.result.then(() => { }, () => null);
  }
  openSkusModal(picknumber: number, id: number, empName: string, packType: string) {
    const activeModal = this.modalService.open(AllSkuDetailComponent,
      { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = '查看SKU详情';
    activeModal.componentInstance.pickId = id;
    activeModal.componentInstance.picknumber = picknumber;
    activeModal.componentInstance.packType = packType;
    activeModal.componentInstance.empName = empName;
    activeModal.result.then(() => { }, () => null);
  }
  openEditModal(id: number, empId: number) {
    this.pickingService.GetAllUsers().subscribe(data => {
      const activeModal = this.modalService.open(TaskEditComponent,
        { size: 'sm', backdrop: 'static' });
      let users = [];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.id;
        item.text = c.userName;
        users.push(item);
      }

      activeModal.componentInstance.empName = users;
      activeModal.componentInstance.selectValue = empId;
      activeModal.componentInstance.pickId = id;
      activeModal.result.then(result => {
        this.loadData();
      });
      activeModal.componentInstance.empName = users;
      activeModal.componentInstance.selectValue = empId;
      activeModal.componentInstance.pickId = id;
    });
  }


  generatePicking() {
    if (this.isNullOrEmpty(this.searchParam.wareHouseId)) {
      this.error("请选择仓库");
      return;
    }
    this.loadingGeneratePicking = true;
    this.storeSearchKey = '';
    this.pickingService.generatePicking(this.searchParam.wareHouseId).subscribe(data => {
      this.alertMessage("生成成功");
      this.loadData();
      this.pendingGeneratePackageCount = 0;
      this.loadingGeneratePicking = false;
    }, e => {
      this.handleError(e);
      this.loadingGeneratePicking = false;
    });
  }


}
