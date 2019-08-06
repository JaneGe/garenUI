import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WarehouseService} from "../../../../shared/services/warehouse-service";
import {RootComponent} from "../../../../shared/component/root.component";

@Component({
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: ['./warehouse-detail.component.scss', '../../public.scss'],
  providers: [WarehouseService]
})
export class WarehouseDetailComponent extends RootComponent implements OnInit {
  @Input()
  modalHeader: string;


  @Input()
  warehouseId: number;

  warehouseName: string;
  contactManName: string;
  phoneNumber: string;
  address: string;

  form: FormGroup;
  submitted: boolean = false;

  constructor(private activeModal: NgbActiveModal,
              fb: FormBuilder,
              private warehouseService: WarehouseService) {
    super();
    this.form = fb.group({
      'warehouseName': ['', Validators.compose([Validators.required, Validators.maxLength(16)])],
      'packagePreNumber': ['', Validators.compose([Validators.required])],
      'address': [''],
      'isGeneatePurchaseTask': ['']
    });


  }

  ngOnInit() {
    if (this.warehouseId > 0) {
      this.warehouseService.getWarehouseDetail(this.warehouseId).subscribe(data => {
        let detail = data.content;

        this.form.controls['warehouseName'].setValue(detail.name);
        this.form.controls['address'].setValue(detail.chineseAddress);
        this.form.controls['packagePreNumber'].setValue(detail.packagePrefix);
        this.form.controls['isGeneatePurchaseTask'].setValue(detail.isAutoGeneratePurchaseTask);

        this.form.controls['packagePreNumber'].disable();
      });
    }
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  onSubmit(value) {
    this.submitted = true;

    if (this.warehouseId > 0) {

      let editWarehouseData = {
        id: this.warehouseId,
        name: value.warehouseName,
        chineseAddress: value.address,
        isAutoGeneratePurchaseTask: value.isGeneatePurchaseTask
      };
      this.warehouseService.updateWarehouseDetail(editWarehouseData).subscribe(data => {
        this.alertMessage("保存成功");
        this.activeModal.close();

      }, this.handleError, () => {
        this.submitted = false;
      });
    }
    else {
      let addWarehouseData = {
        name: value.warehouseName,
        chineseAddress: value.address,
        isAutoGeneratePurchaseTask: value.isGeneatePurchaseTask,
        packageNumberPrefix: value.packagePreNumber
      };

      this.warehouseService.addWarehouse(addWarehouseData).subscribe(data => {
         this.alertMessage("保存成功");
         this.activeModal.close();

      }, e=>{
        this.submitted = false;

        this.handleError(e);
      });
    }

  }
}
