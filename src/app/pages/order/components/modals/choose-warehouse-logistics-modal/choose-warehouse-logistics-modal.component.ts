import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RootComponent} from "../../../../../shared/component/root.component";
import {OrderService} from "../../../../../shared/services/order-service";
import {forEach} from "@angular/router/src/utils/collection";
import {ShippingMethodService} from "../../../../../shared/services/shipping-method-service";

@Component({
  selector: 'app-choose-warehouse-logistics-modal',
  templateUrl: './choose-warehouse-logistics-modal.component.html',
  styleUrls: ['./choose-warehouse-logistics-modal.component.scss'],
  providers: [OrderService, ShippingMethodService]
})
export class ChooseWarehouseLogisticsModalComponent extends RootComponent implements OnInit {
  @Input()
  orderId: number;
  @Input()
  chooseOrdersId: any[];
  warehouseItem: any[];
  selectWarehouseId: number;
  selectlogisticsId: number;
  logisticsItem: any[];

  constructor(private activeModal: NgbActiveModal,
              private shippingMethodService: ShippingMethodService,
              private modalService: NgbModal,
              private orderService: OrderService) {
    super();
  }

  ngOnInit() {

    this.orderService.GetStorageData().subscribe(data => {
      this.warehouseItem = data.content;
      if (data.content.length > 0) {
        this.selectWarehouseId = data.content[0].warehouseId;
        this.loadShippingServices();
      }
    });


  }

  closeModal(re = 0) {
    this.activeModal.close(re);
  }

  loadShippingServices() {
    if (!(this.selectWarehouseId > 0)) {
      return;
    }
    this.shippingMethodService.getWarehouseAllSelectedShippingService(this.selectWarehouseId).subscribe(data => {
      const warehouseShippinges = [{id:-1,text:'无选择'}];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.ssid;
        item.text = c.name;
        warehouseShippinges.push(item);
      }
      this.logisticsItem = warehouseShippinges;
    }, this.handleError);
  }

  confirmMerge() {
    this.confirm("确定合并订单?", () => {
      this.orderService.OrderCombine(this.chooseOrdersId, this.orderId, this.selectWarehouseId, this.selectlogisticsId)
        .subscribe(data => {
        this.closeModal(1);
      }, this.handleError);
    });
  }

  OnWarehouseChange(target) {
    this.selectWarehouseId = target.value;
    this.loadShippingServices();
  }

  onLogicChanged(data: { value: number }) {
    this.selectlogisticsId = data.value;
  }
}

