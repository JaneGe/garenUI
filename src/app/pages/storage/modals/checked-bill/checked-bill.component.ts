import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-checked-bill',
  templateUrl: './checked-bill.component.html',
  styleUrls: ['./checked-bill.component.scss']
})
export class CheckedBillComponent implements OnInit {

  constructor(private printModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  printPDF() {
    ($('.print-body') as any).print();
  }

  closeModal() {
    this.printModal.close();
  }
}
