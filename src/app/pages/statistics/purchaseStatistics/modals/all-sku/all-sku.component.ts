import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-all-sku',
  templateUrl: './all-sku.component.html',
  styleUrls: ['./all-sku.component.scss']
})

export class AllSkuComponent implements OnInit {

  constructor(private modal: NgbActiveModal) { }

  ngOnInit() { }

  closeModal() {
    this.modal.close();
  }

}
