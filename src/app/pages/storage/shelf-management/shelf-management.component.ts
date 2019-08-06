import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { WarehouseService } from 'app/shared/services/warehouse-service';
import { RootComponent } from 'app/shared/component/root.component';
import { LocationCodeListModel } from 'app/shared/models/warehouses/location-code-list-model';
import { AddshelfComponent } from 'app/pages/storage/setting/shelf-manage-modal/addshelf/addshelf.component';
import { ActivatedRoute } from '@angular/router';
  @Component({
    selector: 'app-shelf-management',
    templateUrl: './shelf-management.component.html',
    styleUrls: ['./shelf-management.component.scss'],
    providers: [WarehouseService]
  })
export class ShelfManagementComponent extends RootComponent implements OnInit {
  @Input()
  warehouseId: number;
  screenItem = [
    { name: 'N01', value: 'A' },
    { name: 'N02', value: 'B' },
    { name: 'N03', value: 'C' },
    { name: 'N04', value: 'D' },
    { name: 'N05', value: 'A' },
    { name: 'N06', value: 'B' },
    { name: 'N07', value: 'C' },
    { name: 'N08', value: 'D' },
    { name: 'N09', value: 'A' },
    { name: 'N010', value: 'B' },
    { name: 'N011', value: 'C' },
    { name: 'N012', value: 'D' },
  ];
  pageSize: number = 10;
  pageNumber: number;
  total: number;
  items: LocationCodeListModel[] = [];
  serachCode: string;

  constructor(private warehouseService: WarehouseService,
    private modalService: NgbModal,
    private routeInfo: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.warehouseId = this.routeInfo.snapshot.params['id'];

    this.loadData();
  }

  loadData(pageNumber: number = 1) {
    /* this.warehouseService.getLocationCodePageList(this.warehouseId, this.serachCode, pageNumber, this.pageSize)
      .subscribe(data => {
        const pageData = data.content;
        this.items = pageData.items;
        this.pageNumber = pageData.pageInfo.pageIndex + 1;
        this.pageSize = pageData.pageInfo.pageSize;
        this.total = pageData.pageInfo.totalCount;
      }, this.handleError); */

  }
  onSelect(index) {
    this.serachCode = this.screenItem[index].value;
    this.loadData();
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
    }, r => { });
  }

  deleteLocationCode(locationId: number) {
    this.confirm("确定删除货架位?", () => {
      this.warehouseService.deleteLocationCode(locationId).subscribe(data => {
        this.alertMessage("删除成功");
        this.reloadData();
      }, this.handleError)
    });
  }
}
