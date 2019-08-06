import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as JQuery from "jquery";

@Component({
  selector: 'app-group-sku-bill-modal',
  templateUrl: './group-sku-bill-modal.component.html',
  styleUrls: ['./group-sku-bill-modal.component.scss']
})
export class GroupSkuBillModalComponent implements OnInit {
  @Input()
  skuCode
  @Input()
  optionUser
  @Input()
  instockNumber
  @Input()
  trackNumber
  @Input()
  purchaseUser
  @Input()
  purchaseTime


  optionTime = new Date();
  constructor(private printModal: NgbActiveModal) { }

  ngOnInit() {
    this.getQRcode(this.skuCode);
    this.getQRcodeTrack(this.trackNumber);
  }

  printPDF() {
    ($('.print-body') as any).print();
  }

  closeModal() {
    this.printModal.close();
  }

  getQRcode(code: string) {
    ($("#barcode-target") as any).qrcode({
      render: "table",
      width: 40,
      height: 40,
      text: code
    });;
  }

  getQRcodeTrack(code: string) {
    ($("#barcode-target-track") as any).qrcode({
      render: "table",
      width: 40,
      height: 40,
      text: code
    });;
  }
}
