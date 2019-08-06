import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddshelfComponent } from './addshelf/addshelf.component'
import { WarehouseService } from "../../../../shared/services/warehouse-service";
import { LocationCodeListModel } from "../../../../shared/models/warehouses/location-code-list-model";
import { RootComponent } from "../../../../shared/component/root.component";
import { WarehouseAreaListModel } from "../../../../shared/models/warehouses/warehouse-area-list-model";
import { PopUpComponent } from '../pop-up/pop-up.component';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-shelf-manage-modal',
  templateUrl: './shelf-manage-modal.component.html',
  styleUrls: ['./shelf-manage-modal.component.scss'],
  providers: [WarehouseService]
})
export class ShelfManageModalComponent extends RootComponent implements OnInit {
  @Input()
  modalHeader: string;
  warehouseId: number;
  code: string;
  areas: WarehouseAreaListModel[] = [];
  pageSize: number = 10;
  pageNumber: number;
  total: number;
  items: LocationCodeListModel[] = [];
  searchText: string;
  areacode: string=null;
  selectIsUsing: string = '';

  selectLocationTypes: string;
  locationTypes = [
    { Name: '全部', Id: null },
    { Name: '良品', Id: 'Good' },
    { Name: '次品', Id: 'Bad' },
    { Name: '异常', Id: 'Exception' }
  ];

  isUsing = [
    { Name: '全部', Id: null },
    { Name: '是', Id: 'true' },
    { Name: '否', Id: 'false' },
  ];

  selectedShelfIds: number[] = [];
  isCheckAllPages:boolean=false;
  searchStart:string;
  searchEnd:string;
  constructor(private activeModal: NgbActiveModal,
    private warehouseService: WarehouseService,
    private modalService: NgbModal) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  closeModal() {
    this.activeModal.close();
  }

  loadData(pageNumber: number = 1) {
    this.warehouseService.getWarehouseAreas(this.warehouseId).subscribe(data => {
      this.areas = data.content;
    }, this.handleError);
    this.warehouseService.getLocationCodePageList(this.warehouseId,
      this.searchText, this.areacode, pageNumber, this.pageSize,
      this.selectLocationTypes, this.selectIsUsing)
      .subscribe(data => {
        const pageData = data.content;
        this.items = pageData.items;
        this.pageNumber = pageData.pageInfo.pageIndex + 1;
        this.pageSize = pageData.pageInfo.pageSize;
        this.total = pageData.pageInfo.totalCount;
        console.log(this.items)
      }, this.handleError);

  }



  reloadData() {
    this.loadData(this.pageNumber);
  }

  pageChanged(pN: number) {
    this.loadData(pN);
  }

  doSearch() {
    this.loadData();
  }

  openaddShelfModal() {
    const activeModal = this.modalService.open(AddshelfComponent,
      { size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = '编辑仓库';
    activeModal.componentInstance.warehouseId = this.warehouseId;
    activeModal.result.then(re => {
      this.reloadData();
      this.confirm('是否需要打印新生成的货架位',()=>{});
    }, r => {
    });
  }

  printLocation(itemCode) {
    const printModal = this.modalService.open(PopUpComponent,
      { size: 'sm', backdrop: 'static' });
    printModal.componentInstance.modalHeader = '货架位'
    printModal.componentInstance.code = itemCode
    printModal.result.then(re => {
      this.reloadData();
    }, r => {
    })
  }

  deleteLocationCode(locationId: number) {
    this.confirm("确定删除货架位?", () => {
      this.warehouseService.deleteLocationCode(locationId).subscribe(data => {
        this.alertMessage("删除成功");
        this.reloadData();
      }, this.handleError)
    });
  }

  lockLocation(locationId: number) {
    this.confirm("确定锁定货架位?", () => {
      this.warehouseService.lockLocationCode(locationId).subscribe(data => {
        this.alertMessage("锁定成功");
        this.reloadData();
      }, this.handleError)
    });
  }

  unlockLocation(locationId: number) {
    this.confirm("确定解锁货架位?", () => {
      this.warehouseService.unlockLocationCode(locationId).subscribe(data => {
        this.alertMessage("解锁成功");
        this.reloadData();
      }, this.handleError)
    });
  }

  onSelectArea(code: string) {
    this.areacode = code;
    this.loadData();
  }

  onselectLocationType(type: string) {
    this.selectLocationTypes = type;
    this.loadData();
  }

  onselectIsUsing(value: string) {
    this.selectIsUsing = value;
    this.loadData();
  }
  onCheckAllPageChanged(checked: boolean) {
    if (checked) {
      this.selectedShelfIds = [];
      for (let o of this.items) {
        this.selectedShelfIds.push(o.id);
      }
    }
    else {
      this.selectedShelfIds = [];
    }
    this.isCheckAllPages = checked;
  }
  onCheckAllShelfChanged(checked: boolean) {
    if (checked) {
      this.selectedShelfIds = [];
      for (let o of this.items) {
        this.selectedShelfIds.push(o.id);
      }
    }
    else {
      this.selectedShelfIds = [];
      this.isCheckAllPages = false;
    }
  }
  onCheckShelfChanged(isChecked: boolean, Id: number) {

    if (isChecked) {
      const Index = this.selectedShelfIds.indexOf(Id);
      if (Index >= 0) {
        return;
      }
      else {
        this.selectedShelfIds.push(Id);
      }
    }
    else {
      const Index = this.selectedShelfIds.indexOf(Id);
      if (Index >= 0) {
        this.selectedShelfIds.splice(Index, 1);
      }
      this.isCheckAllPages = false;
    }
  }
  printLocations(){
    if(this.selectedShelfIds.length == 0){
      this.error('请选择需要打印的货架位');
      return;
    }
    const data = <any>{};
    if(this.isCheckAllPages){
      data.locationType = this.selectLocationTypes;
      data.isUsing = this.selectIsUsing;
      data.warehouseId = this.warehouseId;
      data.areacode = this.areacode;
      data.searchText = this.searchText;
    }
    else {
      const locationCodes: any[] = [];
      for(let itemId of this.selectedShelfIds){
          let pItem = this.items.find(m=>m.id == itemId);
          if(pItem != null){
            locationCodes.push(pItem.code)
          }
      }
       data.batchCodes = locationCodes.join(',');
    }

    const params = $.param(data);

    const win = window.open("","_blank");
    if(win == null){
      this.error("打开新窗口失败");
      return;
    }
    const printUrl = `${environment.api_url}/WarehouseLocation-Print/batchprint?${params}`;
    win.focus();
    win.location.href = printUrl;
  }
}
