import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as JQuery from "jquery";
import { PickingService } from "../../../../shared/services/picking.service";
import { RootComponent } from "../../../../shared/component/root.component";

@Component({
  selector: 'app-printTask',
  templateUrl: './printTask.component.html',
  styleUrls: ['./printTask.component.scss'],
  providers: [PickingService]
})
export class PrintTaskComponent extends RootComponent implements OnInit {
  taskList: any;
  pickTaskModel: any;
  pickPrintDetails: Array<any> = [];
  private timer;
  pickId: number = 4;
  constructor(private printModal: NgbActiveModal, private pickingService: PickingService) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.taskList = this.pickingService.GetPickPrintQuery(this.pickId).subscribe(data => {
      this.pickTaskModel = data.content;
      document.title = this.pickTaskModel.pickNumber;
      this.pickPrintDetails = this.pickTaskModel.pickPrintDetails;
      this.splitTask();
      this.generateBarcode();
    }, this.error);
  }

  allPickPrintDetails: Array<any> = [];
  splitTask() {
    let currData = [];
    for (let i = 0; i < this.pickPrintDetails.length; i++) {
      currData.push(this.pickPrintDetails[i]);
      //console.log(i)
      if ((i != 0 && (i + 1) % 23 == 0) || i == this.pickPrintDetails.length - 1) {
        this.allPickPrintDetails.push(currData);
        //console.log(this.allPickPrintDetails);
        currData = [];
      }
    };
  }

  printPDF() {
    ($('.print-body') as any).print();
    this.timer = setInterval(() => {
      this.closeModal();
    }, 2000)
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  closeModal() {
    document.title = 'Demarkt订单管理系统';
    this.printModal.close();
  }

  generateBarcode() {
    var value = this.pickTaskModel.pickNumber;
    var btype = 'code128';
    var renderer = 'css';
    var settings = {
      output: renderer,
    };
    ($("#barcodeTarget") as any).html("").show().barcode(value, btype, settings);
  }
}
