import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-limitinglabel',
  templateUrl: './limitinglabel.component.html',
  styleUrls: ['./limitinglabel.component.scss','../../public.scss']
})
export class LimitinglabelComponent implements OnInit {
  modalHeader:string='';
  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close();
  }
}
