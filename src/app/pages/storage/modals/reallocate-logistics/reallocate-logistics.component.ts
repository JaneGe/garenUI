import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import {ShippingMethodService} from "../../../../shared/services/shipping-method-service";
import {PackageService} from "../../../../shared/services/package-search-service";
import {RootComponent} from "../../../../shared/component/root.component";

@Component({
  selector: 'app-reallocate-logistics',
  templateUrl: './reallocate-logistics.component.html',
  styleUrls: ['./reallocate-logistics.component.scss'],
  providers: [ShippingMethodService, PackageService],
})

export class ReallocateLogisticsComponent extends RootComponent implements OnInit {
  logistics: any = null;
  @Input()
  packageId: number;
  @Input()
  warehouseId: number;


  selectedSsId: number = null;

  constructor(private modal: NgbActiveModal,
              private shippingMethodService: ShippingMethodService,
              private  packageService: PackageService) {
    super();
  }

  ngOnInit() {

    if (this.packageId && this.warehouseId) {
      this.shippingMethodService.getWarehouseAllSelectedShippingService(this.warehouseId).subscribe(data => {
        this.logistics = data.content;
      }, this.handleError);
    }
  }

  closeModal() {
    this.modal.dismiss();
  }

  doAllocate() {
    const postData = {
      packageId: this.packageId,
      ssId: this.selectedSsId,
    };
    this.packageService.reallocateShipping(postData).subscribe(data => {
      this.alertMessage('保存成功');
      this.modal.close();
    }, this.handleError);
  }
}
