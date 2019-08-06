import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-profit-detail-modal',
  templateUrl: './profit-detail-modal.component.html',
  styleUrls: ['../order-detail-modal.component.scss','./profit-detail-modal.component.scss'],
})
export class ProfitDetailModalComponent implements OnInit{
  orderDetail:any;
  constructor(private activeModal:NgbActiveModal){}
  ngOnInit(){

  }
  closeModal(){
    this.activeModal.close();
  }
}
