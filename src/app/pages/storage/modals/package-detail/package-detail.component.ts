import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss']
})
export class PackageDetailComponent implements OnInit {

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
