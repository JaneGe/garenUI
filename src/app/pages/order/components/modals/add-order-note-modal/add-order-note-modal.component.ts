import {Component, Input, OnInit} from '@angular/core';
import {RootComponent} from "../../../../../shared/component/root.component";
import {OrderService} from "../../../../../shared/services/order-service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-order-note-modal',
  templateUrl: './add-order-note-modal.component.html',
  styleUrls: ['./add-order-note-modal.component.scss'],
  providers:[OrderService]
})
export class AddOrderNoteModalComponent extends RootComponent implements OnInit {

  @Input()
  orderId: number;


  noteContent: string;

  constructor(private activeModal: NgbActiveModal,
              private orderService: OrderService) {
    super();
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  saveOrderNote() {
    let data={
      orderId: this.orderId,
      content: this.noteContent
    };
    this.orderService.addOrderNote(this.orderId,data).subscribe(re => {
      this.activeModal.close();
      }, this.handleError);
  }
}
