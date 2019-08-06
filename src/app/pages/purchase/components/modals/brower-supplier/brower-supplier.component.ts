import { Component, OnInit } from '@angular/core';
import * as Slide from '../../../../../shared/animations/modal-Slide';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-brower-supplier',
  templateUrl: './brower-supplier.component.html',
  styleUrls: ['../modal-public.scss', './brower-supplier.component.scss']
})
export class BrowerSupplierComponent implements OnInit {
  node: any;
  modalHeader: string = '';

  info = new infoClass;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.node = document.getElementById("form").parentNode.parentNode.parentNode;
    Slide.slideIn(this.node, 'sm');
  }
  closeModal() {
    Slide.slideLeft(this.node, this, "sm");
  }

}

export class infoClass {
  name: string;
  address: string; 
  url: string; 
  contactName: string; 
  phone: string;
  email: string; 
  maintainMan: string; 
  note: string; 
}