import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-isTrouble',
  templateUrl: './isTrouble.component.html',
  styleUrls: ['./isTrouble.component.scss']
})
export class IsTroubleComponent implements OnInit {

  isLack: boolean = false;
  isQuality: boolean = false;
  isRelease: boolean = false;
  constructor(private printModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.printModal.close();
  }
}
