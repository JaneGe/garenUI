import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-complete-order-modal',
  templateUrl: './complete-order-modal.component.html',
  styleUrls: ['./complete-order-modal.component.scss']
})
export class CompleteOrderModalComponent implements OnInit {
  orderItem = [];

  constructor(private completeOrdeModal: NgbActiveModal) { }

  ngOnInit() {
    this.addHandworkOrder();
  }

  closeModal() {
    this.completeOrdeModal.close();
  }

  addHandworkOrder() {
    let newOrder = new OrderModel;
    this.orderItem.push(newOrder);
  }

  deleteOrder(index) {
    this.orderItem.splice(index,1);
  }
}

export class OrderModel{
  unit_price:number;
  freight:number;
  reduced:string;
  order_id:string;
  track_id:string;
  number:number;
  remark:string;
}