import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseSkuOrderService } from "../../../../../shared/services/purchaseSkuOrder-service";
import { RootComponent } from "../../../../../shared/component/root.component";
import { OrderDetailModalComponent } from '../../../../order/components/modals/order-detail-modal/order-detail-modal.component';

@Component({
  selector: 'app-orderId-detail-modal',
  templateUrl: './orderId-detail-modal.component.html',
  styleUrls: ['./orderId-detail-modal.component.scss'],
  providers: [PurchaseSkuOrderService]
})
export class OrderIdDetailModalComponent extends RootComponent implements OnInit {

  Data = [1, 1, 1, 1, 1, 1];
  totalCount: number = 1;
  pageIndex: number = 1;

  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  purchaseSkuOrderDetail: any[];
  purchasePlanId: number;
  purchaseOrderId:any;
  skuId: number

  constructor(private ordeIdModal: NgbActiveModal,
    private modalService: NgbModal,
    protected purchaseSkuOrderService: PurchaseSkuOrderService) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  closeModal() {
    this.ordeIdModal.close();
  }
  pageChanged(pN: number): void {
    this.loadData(pN);
  }

  loadData(pageNumber: number = 1) {
    this.purchaseSkuOrderService.GetPurchaseSkuOrderDetail(
      this.purchasePlanId, this.skuId,
      // 2,11,
      pageNumber, this.pageSize).subscribe(data => {
        this.purchaseSkuOrderDetail = data.content.items;
        console.log(this.purchaseSkuOrderDetail);

        const pageInfo = data.content.pageInfo;
        this.pageSize = pageInfo.pageSize;
        this.pageNumber = pageInfo.pageIndex + 1;
        this.total = pageInfo.totalCount;
      });
  }

  openOrderDetailModal(orderId: number) {
    const searchModal = this.modalService.open(OrderDetailModalComponent, { size: 'sm', backdrop: 'static' });
    searchModal.componentInstance.modalHeader = '编辑订单';
    searchModal.componentInstance.orderId = orderId;
    searchModal.result.then(result => {
    }, reason => {
    })
  }
}
