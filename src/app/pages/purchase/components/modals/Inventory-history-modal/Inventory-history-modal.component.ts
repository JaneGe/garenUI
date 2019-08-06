import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryService } from './inventory-data.service';
import { WarehouseFlowModel } from "../../../../../shared/models/warehouses/warehouse-flow-model";

@Component({
  selector: 'app-Inventory-history-modal',
  templateUrl: './Inventory-history-modal.component.html',
  styleUrls: ['./Inventory-history-modal.component.scss', '../../../style.scss'],
  providers: [InventoryService]
})
export class InventoryHistoryModalComponent implements OnInit {
  skuId: any;
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  searchParam: WarehouseFlowModel;
  recordTypes = [];
  warehouse = [];
  todate: any;
  fromdate: any;
  storeSearchKey: string = '';
  timeSpan = [];
  isCustom: boolean = false;
  Data = [];

  timeSearchStart: any = new Date();
  timeSearchEnd: any = new Date();

  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  constructor(private InventoryModal: NgbActiveModal,
    private _inventoryService: InventoryService) {
  }

  ngOnInit() {
    this.recordTypes = this._inventoryService.recordTypes;
    this.timeSpan = this._inventoryService.timeSpan;
    this.searchParam = new WarehouseFlowModel();
    this.searchParam.searchType = 0;
    this.searchParam.operateKind = -1;
    this.searchParam.timeSearch = 0;
    this.searchParam.wareName = '全部';
    this.searchParam.searchText = '';
    this.searchParam.pageIndex = 0;
    this.searchParam.pageSize = 10;
    this.searchParam.skuId = this.skuId;
    this._inventoryService.GetStorageData().subscribe(data => {
      this.warehouse = data.content;
      if (data.content.length > 0) {
        this.searchParam.wareName = data.content[0].name;
        this.loadData();
      }
    });
    this.timeSearchStart.setDate(this.timeSearchStart.getDate() - 1);

  }

  closeModal() {
    this.InventoryModal.close();
  }

  onSelect($event, type, value) {
    console.log($event.innerText);
    if ($event.innerText === '自定义') {
      this.isCustom = true;
      this.searchParam.timeSearch = value;
      this.dateTransition();
      return;
    } else {
      this.isCustom = false;
    }
    switch (type) {
      case "recordTypes":
        this.searchParam.operateKind = value;
        break;
      case "warehouse":
        this.searchParam.wareName = value;
        break;
      case "searchTypes":
        this.searchParam.searchType = value;
        break;
      case "timeSpan":
        this.searchParam.timeSearch = value;
        break;
    }

    this.searchParam.pageIndex = this.PageInfo.pageIndex;
    this.searchParam.pageSize = this.PageInfo.pageSize;
    if (this.searchParam.timeSearch != 5) {
      this.loadData();
    }
  }

  loadData(pageNumber: number = 1) {
    this.searchParam.beginTime = this.fromdate;
    this.searchParam.pageSize = this.PageInfo.pageSize;
    this.searchParam.endTime = this.todate;
    this.searchParam.pageIndex = pageNumber - 1;
    this.searchParam.searchText = this.storeSearchKey;
    this._inventoryService.GetStockOverFlowQuery(this.searchParam).subscribe(data => {
      this.Data = data.content.items;
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    });
  }

  pageChanged(pN: number) {
    this.loadData(pN);
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
  }
}
