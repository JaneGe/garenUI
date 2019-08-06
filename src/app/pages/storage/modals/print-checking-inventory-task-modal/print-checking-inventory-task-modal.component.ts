import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { RootComponent } from "../../../../shared/component/root.component";
import { PickingFaileRecordService } from "../../../../shared/services/picking-faile-record.service";
import { CheckingStockTaskPrintDataModel } from "../../../../shared/models/pickings/checking-stock-task-print-data-model";
@Component({
  selector: 'app-print-checking-inventory-task-modal',
  templateUrl: './print-checking-inventory-task-modal.component.html',
  styleUrls: ['./print-checking-inventory-task-modal.component.scss'],
  providers: [PickingFaileRecordService]
})

export class PrintCheckingInventoryTaskModalComponent extends RootComponent implements OnInit {
  constructor(private printModal: NgbActiveModal,
    private pickingFaileRecordService: PickingFaileRecordService) {
    super();
  }

  @Input()
  taskId: number;

  taskData: CheckingStockTaskPrintDataModel;

  ngOnInit() {
    if (!(this.taskId > 0)) {
      this.error('请指定任务');
      return;
    }
    this.pickingFaileRecordService.getCheckingInventoryTaskPrintData(this.taskId).subscribe(d => {
      this.taskData = d.content;
    }, this.handleError);
  }

  ngDoCheck() {
    if (this.taskData) {
      this.getQRcode();
    }
  }
  /*   ngAfterContentInit() {
      this.getQRcode();
    } */

  printPDF() {
    ($('.print-body') as any).print();
  }

  closeModal() {
    this.printModal.dismiss();
  }

  getQRcode() {
    for (let i in this.taskData.items) {
      if (($(".qrcode") as any).eq(i).html() == '') {
        ($(".qrcode") as any).eq(i).qrcode({
          render: "table",
          width: 40,
          height: 40,
          text: this.taskData.items[i].skuCode
        });;
      }
    }
  }

}
