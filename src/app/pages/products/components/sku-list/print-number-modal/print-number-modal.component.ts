import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from "../../../../../../environments/environment";

@Component({
  selector: 'app-print-number-modal',
  templateUrl: './print-number-modal.component.html',
  styleUrls: ['./print-number-modal.component.scss']
})
export class PrintNumberModalComponent implements OnInit {

  @Input()
  skuId: string;

  printNumber: number;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

  printSkuLabel() {
    const featrure = "toolbar=yes, location=yes, directories=no, " +
      "status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=600, height=600";
    let newWin = window.open('', "_blank", featrure);
    const printUrl = `${environment.api_url}/sku-print/PrintSingleSku?skuid=${this.skuId}&quantity=${this.printNumber}`;
    newWin.focus();
    newWin.location.href = printUrl;
  }

}
