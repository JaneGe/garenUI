import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShippingTrackService} from "../../../../../shared/services/shipping-track-service";
import {RootComponent} from "../../../../../shared/component/root.component";

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss'],
  providers: [ShippingTrackService]
})

export class ShippingDetailsComponent extends RootComponent implements OnInit {
  @Input()
  trackingOrderId:number;
  items:any[]=[];

  constructor(private activeModal:NgbActiveModal,
              private shippingTrackService: ShippingTrackService) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData( ) {

    this.shippingTrackService.getOrderTrackingEvents(this.trackingOrderId).subscribe(data => {

      this.items = data.content;
      console.log(this.items);

    }, this.handleError);

  }

  closeModal(){
    this.activeModal.close();
  }
}
