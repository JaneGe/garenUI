import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { RootComponent } from "../../../../shared/component/root.component";
import {PickingService} from "../../../../shared/services/picking.service";

@Component({
  selector: 'app-packing-inventory',
  templateUrl: './packing-inventory.component.html',
  styleUrls: ['./packing-inventory.component.scss'],
  providers: [PickingService]
})

export class PackingInventoryComponent extends RootComponent implements OnInit {
  taskList: any;
  private timer;
  pickId;
  pickTaskModel;
  pickPrintDetails: Array<any>;
  constructor(private printModal: NgbActiveModal,
              private pickingService: PickingService) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.taskList = this.pickingService.GetPickPrintQuery(this.pickId).subscribe(data => {
      this.pickTaskModel = data.content;
      console.log( this.pickTaskModel);
      document.title = this.pickTaskModel.pickNumber;
      this.pickPrintDetails = this.pickTaskModel.pickPrintDetails;
      this.generateBarcode();
    }, this.error);
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
    this.printModal.close();
  }

  generateBarcode() {
    var value = '1801020004';
    var btype = 'code128';
    var renderer = $("input[name=renderer]:checked").val();

    var settings = {
      output: renderer,
    };
    ($("#barcodeTarget") as any).html("").show().barcode(value, btype, settings);
  }
}
