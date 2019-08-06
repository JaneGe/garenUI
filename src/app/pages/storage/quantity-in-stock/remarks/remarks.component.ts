import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { RootComponent } from "../../../../shared/component/root.component";

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.scss']
})
export class RemarksComponent extends RootComponent implements OnInit {
  @Input()
  modalHeader: string;
  remarks: string;
  constructor(private activaModal: NgbActiveModal) { super(); }

  ngOnInit() {
  }
  OnSubmit(value: any) {
    if (value == '') {
      this.error('备注不能为空');
    }
    else {
      this.remarks = value;
      this.activaModal.close(this.remarks);
    }
  }
  closeModal() {
    this.activaModal.close();
  }
}
