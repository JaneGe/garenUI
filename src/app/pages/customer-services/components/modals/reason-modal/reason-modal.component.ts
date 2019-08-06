import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { RootComponent } from "../../../../../shared/component/root.component";

@Component({
  selector: 'app-reason-modal',
  templateUrl: './reason-modal.component.html',
  styleUrls: ['./reason-modal.component.scss']
})

export class ReasonModalComponent extends RootComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) {
    super();
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

}

