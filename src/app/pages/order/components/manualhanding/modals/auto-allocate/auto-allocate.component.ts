import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as modalAnimate from '../../../../../../shared/animations/modal-Slide';
import { ShippingMethodService } from "../../../../../../shared/services/shipping-method-service";
import { WarehouseService } from "../../../../../../shared/services/warehouse-service";
import { OrderExceptionService } from "../../../../../../shared/services/orderException-service";
import { RootComponent } from "../../../../../../shared/component/root.component";
@Component({
  selector: 'app-auto-allocate',
  templateUrl: './auto-allocate.component.html',
  styleUrls: ['./auto-allocate.component.scss'],
  providers: [ShippingMethodService, WarehouseService, OrderExceptionService]
})
export class AutoAllocateComponent extends RootComponent implements OnInit {
  @Input()
  modalHeader: string;
  orderException; string;
  selectedChannelType: string;
  selectedTimeFiltType: string;
  selectedChannelId: number;
  selectedTimeValueType: string;
  timeSearchStart: string;
  timeSearchEnd: string;
  selectCountryCode: string;
  selectSearchType: string;
  searchText: string;
  orderBatchsearchType: string = 'OrderNumber';
  orderBatchsearchText: string;
  orderBatchsearch: string;


  selectOrderNum: number;
  selectOrderIds: number[] = [];
  isCheckAllPages: boolean = false;
  node: any;

  allWarehouses;
  warehouseAllShippingService;
  selectedWarehouseId: number;



  constructor(private activeModal: NgbActiveModal,
    private shippingMethodService: ShippingMethodService,
    private warehouseService: WarehouseService,
    private orderExceptionService: OrderExceptionService) {
    super();
  }

  ngOnInit() {

    this.warehouseService.getAllOptions().subscribe(data => {
      this.allWarehouses = data.content;
      this.selectedWarehouseId = this.allWarehouses[0].warehouseId;

      this.shippingMethodService.getWarehouseAllSelectedShippingService(this.selectedWarehouseId).subscribe(data => {
        this.warehouseAllShippingService = data.content;
      });


    });
    this.node = document.getElementById('form').parentNode.parentNode.parentNode;
    modalAnimate.slideIn(this.node);

  }
  closeModal() {
    //  modalAnimate.slideLeft(this.node,this);
    this.activeModal.dismiss();
  }
  Onsubmit(st: any, lo: any) {

    if (this.isCheckAllPages) {

      this.orderExceptionService.ChangeShippingService(this.orderException,
        this.selectedChannelType,
        this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
        this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
        this.orderBatchsearchType, this.orderBatchsearchText,
        st, lo, null
      ).subscribe(data => {
        this.alertMessage(data.content);
        var result = { warehouseId: st, ssid: lo };
        console.log(result)
        this.activeModal.close(result);
        //  modalAnimate.slideRight(this.node,this,result);
      }, this.handleError);

    }
    else {

      this.orderExceptionService.ChangeShippingService(this.orderException,
        this.selectedChannelType,
        this.selectedChannelId, this.selectCountryCode, this.selectedTimeFiltType,
        this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd, this.selectSearchType, this.searchText,
        this.orderBatchsearchType, this.orderBatchsearchText,
        st, lo, this.selectOrderIds
      ).subscribe(data => {
        this.alertMessage(data.content);
        var result = { warehouseId: st, ssid: lo };
        console.log(result)
        this.activeModal.close(result);
        //   modalAnimate.slideRight(this.node,this,result);
      }, this.handleError);

    }




    // this.activeModal.close(result);
  }
}
