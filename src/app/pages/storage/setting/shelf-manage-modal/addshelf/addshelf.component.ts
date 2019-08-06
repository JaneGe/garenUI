import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RootComponent } from "../../../../../shared/component/root.component";
import { WarehouseService } from "../../../../../shared/services/warehouse-service";

@Component({
  selector: 'app-addshelf',
  templateUrl: './addshelf.component.html',
  styleUrls: ['./addshelf.component.scss', '../../../public.scss'],
  providers: [WarehouseService]
})
export class AddshelfComponent extends RootComponent implements OnInit {
  @Input()
  modalHeader: string;
  warehouseId: number;

  locationType: string;
  start: string;
  end: string;

  form: FormGroup;
  submitted: boolean = false;

  constructor(private activeModal: NgbActiveModal,
    fb: FormBuilder,
    private warehouseService: WarehouseService) {

    super();

    this.form = fb.group({
      'start': ['', Validators.compose([Validators.required, Validators.maxLength(16)])],
      'end': ['', Validators.compose([Validators.required, Validators.maxLength(16)])],
      'locationType': [''],
    });

    this.form.controls['locationType'].setValue('good');
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  onSubmit(value) {
    this.submitted = true;

    let data = {
      warehousesId: this.warehouseId,
      locationType: value.locationType,
      start: value.start,
      end: value.end
    };
    console.info(data);

    this.warehouseService.addLocationCode(data).subscribe(data => {
      this.alertMessage("创建成功");
      this.activeModal.close();
    }, e => {
      this.submitted = false;
      this.handleError(e);
    });
  }
}
