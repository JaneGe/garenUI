import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as Slide from '../../../../../shared/animations/modal-Slide';
import {PurchaseOrder1688Service} from "../../purchase-1688/purchase-1688.service";
import {RootComponent} from "../../../../../shared/component/root.component";

@Component({
  selector: 'app-add-remarks',
  templateUrl: './add-remarks.component.html',
  styleUrls: ['../modal-public.scss', './add-remarks.component.scss'],
  providers: [PurchaseOrder1688Service]
})
export class AddRemarksComponent extends RootComponent implements OnInit {
  node: any;
  platOrderId: any;
  modalHeader:string='';

  constructor(private activeModal: NgbActiveModal, private purchaseOrderService: PurchaseOrder1688Service) {
    super();
  }

  ngOnInit() {
    this.node = document.getElementById("form").parentNode.parentNode.parentNode;
    Slide.slideIn(this.node, "sm");
  }

  closeModal() {
    Slide.slideLeft(this.node, this, "sm");
  }


  Onsubmit(val: any) {
    Slide.slideRight(this.node,this,val);
    // this.RefuseOrder(this.platOrderId, val);
  }
//   RefuseOrder(id: any,note:string) {
//   this.purchaseOrderService.RefuseOrder(id,note).subscribe(data => {
//   Slide.slideRight(this.node,this,'sm');
// },this.handleError);
// }
}
