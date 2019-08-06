import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { RootComponent } from "../../../shared/component/root.component";

import { ShelfManageModalComponent } from './shelf-manage-modal/shelf-manage-modal.component';
import { BatchManageModalComponent } from './batch-manage-modal/batch-manage-modal.component';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

import { SettingsService } from './setting.service';
import { WarehouseService } from "../../../shared/services/warehouse-service";
import { WarehouseListModel } from "../../../shared/models/warehouses/warehouse-model";
import { WarehouseDetailComponent } from "./warehouse-detail/warehouse-detail.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorityComponent } from "../../../shared/component/authority.component";

@Component({
  selector: 'setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss', '../public.scss'],
  providers: [WarehouseService]
})
export class SettingComponent extends AuthorityComponent implements OnInit {


  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  items: WarehouseListModel[] = [];


  constructor(private modalService: NgbModal
    , private _SettingService: SettingsService
    , private warehouyseService: WarehouseService, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
  }

  ngOnInit() {
    this.loadData();
  }

  reload() {
    this.loadData(this.pageNumber);
  }

  loadData(pageNumber: number = 1) {
    this.warehouyseService.warehousePageList(pageNumber, this.pageSize).subscribe(data => {
      this.items = data.content.items;
      const pageInfo = data.content.pageInfo;
      this.pageSize = pageInfo.pageSize;
      this.pageNumber = pageInfo.pageIndex + 1;
      this.total = pageInfo.totalCount;
    });
  }

  openShelfManageModal(warehouseId: number) {
    const activeModal = this.modalService.open(ShelfManageModalComponent,
      { size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = '货架位设置';
    activeModal.componentInstance.warehouseId = warehouseId;
  }

  openBatchManageModal(warehouseId: number) {
    const activeModal = this.modalService.open(BatchManageModalComponent,
      { size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = '捡货方式设置';
    activeModal.componentInstance.warehouseId = warehouseId;
  }

  openCreateModal() {
    const activeModal = this.modalService.open(WarehouseDetailComponent,
      { size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = '创建仓库';
    activeModal.result.then(r => {
      this.reload();
    }, reason => { });
  }

  openEditModal(warehouseId: number) {
    const activeModal = this.modalService.open(WarehouseDetailComponent,
      { size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = '编辑仓库';
    activeModal.componentInstance.warehouseId = warehouseId;

    activeModal.result.then(r => {
      this.reload();
    }, reason => { });
  }

  setStatusDisable(warehouseId: number) {
    this.confirm("确定停用该仓库", () => {
      this.warehouyseService.setWarehouseStatus(warehouseId, false).subscribe(data => {
        this.alertMessage("停用成功");
        this.reload();
      }, this.handleError);
    })
  }

  setStatusOnable(warehouseId: number) {
    this.confirm("确定启用该仓库", () => {
      this.warehouyseService.setWarehouseStatus(warehouseId, true).subscribe(data => {
        this.alertMessage("启用成功");
        this.reload();
      }, this.handleError);
    })
  }
}
