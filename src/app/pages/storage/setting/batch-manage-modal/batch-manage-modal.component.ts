import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { WarehouseService } from "../../../../shared/services/warehouse-service";
import { RootComponent } from "../../../../shared/component/root.component";

@Component({
  selector: 'app-batch-manage-modal',
  templateUrl: './batch-manage-modal.component.html',
  styleUrls: ['./batch-manage-modal.component.scss', '../../public.scss'],
  providers: [WarehouseService]
})
export class BatchManageModalComponent extends RootComponent implements OnInit {
  @Input()
  modalHeader: string;
  warehouseId: number;


  pickingPackageCountForOneSkuOneItem: number;
  pickingPackageCountForOneSkuMoreItems: number;
  pickingPackageCountForMoreSkus: number;
  pickingPackageCountForPickingByPackage: number;
  pickingMaxSkuQuantity: number;


  constructor(private activeModal: NgbActiveModal,
    private warehouseService: WarehouseService) {
    super();
  }

  ngOnInit() {

    this.warehouseService.getWarehouseBatchSetting(this.warehouseId).subscribe(data => {
      const result = data.content;
      this.pickingPackageCountForOneSkuOneItem = result.warehouseSetting.pickingPackageCountForOneSkuOneItem;
      this.pickingPackageCountForOneSkuMoreItems = result.warehouseSetting.pickingPackageCountForOneSkuMoreItems;
      this.pickingPackageCountForMoreSkus = result.warehouseSetting.pickingPackageCountForMoreSkus;
      this.pickingPackageCountForPickingByPackage = result.warehouseSetting.pickingPackageCountForPickingByPackage;
      this.pickingMaxSkuQuantity = result.warehouseSetting.pickingMaxSkuQuantity;
    });
  }

  saveSetting() {
    let data = {
      id: this.warehouseId,
      warehouseSetting: {
        PickingPackageCountForOneSkuOneItem: this.pickingPackageCountForOneSkuOneItem,
        pickingPackageCountForOneSkuMoreItems: this.pickingPackageCountForOneSkuMoreItems,
        pickingPackageCountForMoreSkus: this.pickingPackageCountForMoreSkus,
        pickingPackageCountForPickingByPackage: this.pickingPackageCountForPickingByPackage,
        pickingMaxSkuQuantity: this.pickingMaxSkuQuantity
      }
    };
    this.warehouseService.saveWarehouseBatchSetting(data).subscribe(data => {
      this.alertMessage("保存成功");
      this.closeModal();
    }, this.handleError);

  }

  closeModal() {
    this.activeModal.close();
  }
}
