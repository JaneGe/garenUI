import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderService} from "../../../../../shared/services/order-service";
import {
  OrderDetailModel,
  OrderLineEditModel,
  OrderLineModel,
  OrderShippingAddress
} from "../../../../../shared/models/orders/order-detail-model";
import {RootComponent} from "../../../../../shared/component/root.component";
import {CommonService} from "app/shared/services/common-service";
import {CompletionDeclarationModalComponent} from "../CompletionDeclarationModal/CompletionDeclarationModal.component";
import {ChooseSkuModalComponent} from "../choose-sku-modal/choose-sku-modal.component";
import {ChooseSkuListModel} from "../../../../../shared/models/products/ChooseSku-list-model";
import {AddOrderNoteModalComponent} from "../add-order-note-modal/add-order-note-modal.component";
import {WarehouseService} from "../../../../../shared/services/warehouse-service";
import {WarehouseOptionModel} from "../../../../../shared/models/warehouses/warehouse-option-model";
import {ShippingMethodService} from "../../../../../shared/services/shipping-method-service";
import {WarehouseShippingServiceOptionModel} from "../../../../../shared/models/warehouses/warehouse-shipping-service-option-model";
import {ReissueModalComponent} from '../reissue-modal/reissue-modal.component';
import {OrderExceptionService} from "../../../../../shared/services/orderException-service";
import {SplitOrderModalComponent} from 'app/pages/order/components/modals/split-order-modal/split-order-modal.component';
import {MergeOrderModalComponent} from 'app/pages/order/components/modals/merge-order-modal/merge-order-modal.component';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../../../shared/component/authority.component";
import {ProfitDetailModalComponent} from "./profit-detail-modal/profit-detail-modal.component";

enum TrackingNumberFetchFormType {
  /// <summary>
  /// 不显示任何
  /// </summary>
  None = 0,
  /// <summary>
  /// 显示获取跟踪号链接
  /// </summary>
  Fetch = 1,
  /// <summary>
  /// 显示录入跟踪号输入框
  /// </summary>
  Fill = 2,
  /// <summary>
  /// 显示跟踪号
  /// </summary>
  DisplayTrackingNumber = 3,
  /// <summary>
  /// 显示自动获取中
  /// </summary>
  DisplayAutoFetch = 4,
  /// <summary>
  /// 显示已添加至第三方物流
  /// </summary>
  DisplayShippingOrderAdded = 5

}

export class Tabs {
  name: string;
  selected: number;

}

@Component({
  selector: 'app-order-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styleUrls: ['./order-detail-modal.component.scss'],
  providers: [OrderService, CommonService, WarehouseService, ShippingMethodService, OrderExceptionService]
})

export class OrderDetailModalComponent extends AuthorityComponent implements OnInit {

  mergeSplitLog = [];

  @Input()
  modalHeader: string;
  @Input()
  orderId: number;

  tabs: Tabs[] = [
    {name: '商品详情', selected: 0},
    {name: '仓储物流', selected: 0},
    // {name: '利润', selected: 0},
    {name: '日志', selected: 0},
    {name: '订单备注', selected: 0},
    {name: '退款/补发货', selected: 0},
    {name: '退换货记录', selected: 0},
    {name: '合并拆分', selected: 0},
  ];
  choose = 0;

  isEditBuyerAddress: boolean = false;
  isEditOrderLine: boolean = false;
  isCanRefuse: boolean = true;
  orderNavSatus: number[] = [100, 200, 300, 400, 500, 600];
  isCanMerge: boolean = true;
  allCountries: any[] = [];
  orderDetail: OrderDetailModel;

  buyerAddress: OrderShippingAddress = <OrderShippingAddress>{};

  orderLines: OrderLineEditModel[] = [];
  deletedOrderLineIds: number[] = [];
  allWarehouses: WarehouseOptionModel[] = [];

  loadingOrder: boolean = false;
  loadingShippingAddress: boolean = false;
  loadingOrderLines: boolean = false;
  loadingOrderAllocatedInfo: boolean = false;

  selectedWarehouseId?: number = 0;
  selectedSsId?: number = 0;
  isEditOrderAllocateInfo: boolean = false;

  trackingNumberDisplayType: TrackingNumberFetchFormType = TrackingNumberFetchFormType.None;


  private warehouseAllShippingService: WarehouseShippingServiceOptionModel[] = [];

  //selectOrderIds: number[] = [];

  isOrderChanged: boolean = false;

  constructor(private searchModel: NgbActiveModal,
              private modalService: NgbModal,
              private orderService: OrderService,
              private commonService: CommonService,
              private shippingMethodService: ShippingMethodService,
              private warehouseService: WarehouseService,
              private orderExceptionService: OrderExceptionService, public activerouter: ActivatedRoute, public  router: Router) {
    super(activerouter, router);
    this.orderDetail = new OrderDetailModel();
    this.orderDetail.orderNotes = [];

    this.tabs[this.choose].selected = 1;
  }

  ngOnInit() {

    this.warehouseService.getAllOptions().subscribe(data => {
      this.allWarehouses = data.content;
    });

    this.loadOrderData();
  }

  loadOrderData() {
    this.loadingOrder = true;
    this.orderService.getOrderDetail(this.orderId).subscribe(data => {
      this.loadingOrder = false;

      this.orderDetail = data.content;
      console.log(this.orderDetail);
      let orderSkuLines = [];
      orderSkuLines = data.content.orderLines;
      if ((orderSkuLines.length == 1) && (orderSkuLines[0].quantity == 1)) {
        this.isCanRefuse = false;
      }
      if (data.content.isMerged) {
        this.isCanRefuse = false;
      }
      if (data.content.isLocked) {
        this.isCanRefuse = false;
      }
      if (data.content.refuseCount > 0) {
        this.isCanMerge = false;
      }
      this.trackingNumberDisplayType = this.getTrackingNumberFetchFormType();
      this.buyerAddress = Object.assign({}, this.orderDetail.shippingAddress);

      this.fillOrderLines();
      this.selectedWarehouseId = this.orderDetail.allocatedWarehouseId;
      this.selectedSsId = this.orderDetail.allocatedShippingServiceId;


      if (this.selectedWarehouseId > 0) {
        this.loadWarehouseShippingService();
      }
      this.loadOrderLogs();

    }, e => {
      this.loadingOrder = false;
      this.handleError(e);
    });
  }

  fillOrderLines() {
    this.orderLines = [];
    for (let ol of this.orderDetail.orderLines) {
      const newOl = new OrderLineEditModel();
      newOl.id = ol.id;
      newOl.skuCode = ol.skuCode;
      newOl.skuId = ol.skuId;
      newOl.quantity = ol.quantity;
      newOl.externalSku = ol.externalSku;

      this.orderLines.push(newOl);
    }
  }

  tabChoose(i) {
    for (const a of this.tabs) {
      a.selected = 0;
    }
    this.tabs[i].selected = 1;
    this.choose = i;
  }

  loadCountries() {
    this.commonService.getAllCountries().subscribe(data => {

      for (let c of data.content) {
        const item = <any>{};
        item.id = c.code;
        item.text = `${c.chineseName}(${c.code})`;
        this.allCountries.push(item);
      }

    }, this.handleError);
  }

  loadOrderLogs() {
    this.orderService.getOrderLogActionQuery(this.orderId).subscribe(data => {

      this.mergeSplitLog = data.content;
    }, this.handleError);
  }

  setEditBuyerAddressStatus(isEdit: boolean) {
    this.isEditBuyerAddress = isEdit;
    if (isEdit && this.allCountries.length == 0) {
      this.loadCountries();
    }
  }

  resetBuyerAddress() {
    this.buyerAddress = Object.assign({}, this.orderDetail.shippingAddress);
  }

  cancelBuyAddress() {
    this.isEditBuyerAddress = false;
    this.resetBuyerAddress();
  }

  onChangeCountryChanged(data: { value: string }) {
    this.buyerAddress.countryCode = data.value;
  }

  saveBuyerAddress() {
    const data = {
      orderId: this.orderId,
      buyerName: this.buyerAddress.buyerName,
      addressLine1: this.buyerAddress.addressLine1,
      addressLine2: this.buyerAddress.addressLine2,
      city: this.buyerAddress.city,
      stateOrProvince: this.buyerAddress.stateOrProvince,
      postalCode: this.buyerAddress.postalCode,
      countryCode: this.buyerAddress.countryCode,
      phoneNumber1: this.buyerAddress.phoneNumber1,
      phoneNumber2: this.buyerAddress.phoneNumber2
    };

    this.loadingShippingAddress = true;
    this.orderService.saveBuyerShippingAddress(this.orderId, data).subscribe(data => {
      this.isEditBuyerAddress = false;

      this.loadingShippingAddress = false;
      this.isOrderChanged = true;
      this.loadOrderData();
    }, e => {
      this.loadingShippingAddress = false;
      this.handleError(e);
    });
  }

  setEditOrderLineStatus(isEdit: boolean) {
    this.isEditOrderLine = isEdit;
  }

  resetOrderLine() {
    this.deletedOrderLineIds = [];
    this.fillOrderLines();
  }

  cancelOrderLine() {
    this.isEditOrderLine = false;
    this.resetOrderLine();
  }

  addOrderLine() {
    const data = new OrderLineEditModel();
    data.id = 0;
    this.orderLines.push(data);
  }

  saveOrderLine() {
    let data = <any>{};

    data.orderId = this.orderId;
    data.deleteOrderLineIds = this.deletedOrderLineIds;
    data.orderLines = [];
    for (let m of this.orderLines) {
      data.orderLines.push({id: m.id, skuCode: m.skuCode, skuId: m.skuId, quantity: m.quantity});
    }

    this.loadingOrderLines = true;
    this.orderService.saveOrderLines(this.orderId, data).subscribe(data => {
      this.isEditOrderLine = false;
      this.deletedOrderLineIds = [];
      this.loadingOrderLines = false;
      this.loadOrderData();
      this.isOrderChanged = true;
    }, e => {
      this.loadingOrderLines = false;
      this.handleError(e);
    });
  }

  deleteOrderLine(ol: OrderLineEditModel) {
    const olIndex = this.orderLines.indexOf(ol);
    if (olIndex >= 0) {
      if (ol.id > 0) {
        this.deletedOrderLineIds.push(ol.id);
      }
      this.orderLines.splice(olIndex, 1);
    }
  }

  closeModal() {
    if (this.isOrderChanged) {
      this.searchModel.close(1);
    }
    else {
      this.searchModel.dismiss();
    }
  }

  openChooseSkuModal(orderLine: OrderLineEditModel) {

    const modal = this.modalService.open(ChooseSkuModalComponent, {size: 'sm', backdrop: 'static'});
    modal.result.then(result => {
      orderLine.skuId = result.id;
      orderLine.skuCode = result.skuCode;
    }, reason => {
    });
  }

  openCompletionDeclarationModal(ol: OrderLineEditModel) {
    const searchModal = this.modalService.open(CompletionDeclarationModalComponent, {size: 'sm', backdrop: 'static'});
    searchModal.componentInstance.orderId = this.orderId;
    searchModal.componentInstance.orderLineTitle = ol.title;
    searchModal.componentInstance.skuId = ol.skuId;

    searchModal.result.then(re => {
      this.loadOrderData();
      this.isOrderChanged = true;
    }, reason => {
    })
  }

  openProfitDetailModal() {
    const Modal = this.modalService.open(ProfitDetailModalComponent, {size: 'lg', backdrop: 'static'});
    Modal.componentInstance.orderDetail = this.orderDetail;
    Modal.result.then(s => {
    }, r => {
    });
  }

  openAddOrderNoteModal() {
    const searchModal = this.modalService.open(AddOrderNoteModalComponent, {size: 'sm', backdrop: 'static'});
    searchModal.componentInstance.orderId = this.orderId;

    searchModal.result.then(re => {
      this.loadOrderData();

    }, reason => {
    })
  }

  voidOrder() {
    this.confirm("确定作废订单?", () => {
      this.loadingOrder = true;

      this.orderService.voidOrder(this.orderId).subscribe(data => {
        this.loadingOrder = false;
        this.alertMessage("作废成功");
        this.loadOrderData();
        this.isOrderChanged = true;
      }, e => {
        this.loadingOrder = false;
        this.handleError(e);
      });
    })
  }

  resetOrder() {
    this.confirm("确定重置订单?", () => {
      this.loadingOrder = true;

      this.orderService.resetOrder(this.orderId).subscribe(data => {
        this.loadingOrder = false;
        this.alertMessage("重置成功");
        this.loadOrderData();
        this.isOrderChanged = true;
      }, e => {
        this.loadingOrder = false;
        this.handleError(e);
      });
    })
  }

  activeOrder() {
    this.confirm("确定激活订单?", () => {
      this.loadingOrder = true;

      this.orderService.activeOrder(this.orderId).subscribe(data => {
        this.loadingOrder = false;

        this.alertMessage("激活成功");
        this.loadOrderData();
        this.isOrderChanged = true;
      }, e => {
        this.loadingOrder = false;
        this.handleError(e);
      });
    })
  }

  onSelectWarehouseChange() {
    this.loadingOrderAllocatedInfo = true;

    this.loadWarehouseShippingService();

  }

  loadWarehouseShippingService() {
    this.shippingMethodService.getWarehouseAllSelectedShippingService(this.selectedWarehouseId).subscribe(data => {
      this.loadingOrderAllocatedInfo = false;
      this.warehouseAllShippingService = data.content;
    }, e => {
      this.loadingOrderAllocatedInfo = false;
      this.handleError(e);
    });
  }

  editOrderAllocateInfo() {
    this.isEditOrderAllocateInfo = true;
    this.tabChoose(1);
  }

  cancelEditOrderAllocateInfo() {
    this.isEditOrderAllocateInfo = false;

    this.selectedWarehouseId = this.orderDetail.allocatedWarehouseId;
    this.selectedSsId = this.orderDetail.allocatedShippingServiceId;
  }

  saveOrderAllocateInfo() {
    let allocateData = <any>{};
    allocateData.orderid = this.orderId;
    allocateData.warehouseId = this.selectedWarehouseId;
    allocateData.ssId = this.selectedSsId;

    this.loadingOrderAllocatedInfo = false;
    this.orderService.saveOrderAllocateInfo(this.orderId, allocateData).subscribe(data => {
      this.loadingOrderAllocatedInfo = false;
      this.isEditOrderAllocateInfo = false;
      this.loadOrderData();
      this.isOrderChanged = true;
    }, e => {
      this.confirm(e.error.message, () => {
        this.loadOrderData();
        this.isOrderChanged = true;
        this.loadingOrderAllocatedInfo = false;
        this.isEditOrderAllocateInfo = false;
      }, () => {
      });
      //this.handleError(e);
    });
  }

  doLockOrder() {
    this.loadingOrder = true;
    this.orderService.lockOrder(this.orderId).subscribe(data => {
      this.loadingOrder = false;
      this.loadOrderData();
      this.isOrderChanged = true;
    }, e => {
      this.loadingOrder = false;
      this.handleError(e);
    });
  }

  unlockOrder() {
    this.loadingOrder = true;
    this.orderService.unlockOrder(this.orderId).subscribe(data => {
      this.loadingOrder = false;
      this.loadOrderData();
      this.isOrderChanged = true;
    }, e => {
      this.loadingOrder = false;
      this.handleError(e);
    });
  }

  orderApproved() {
    let selectOrderIds: any[] = [];
    selectOrderIds.push(this.orderDetail.id);
    this.confirm("确定审核通过订单?", () => {
      if (selectOrderIds == null || selectOrderIds.length == 0) {
        this.error("订单异常，稍后再试!");
        return;
      }

      this.orderExceptionService.orderApproved(null,
        null,
        null, null, null,
        null, null, null, null, null,
        null, null,
        selectOrderIds
      ).subscribe(data => {
        this.alertMessage("审核成功");
        this.loadOrderData();
        this.isOrderChanged = true;
      }, this.handleError);
    });

  }

  orderLowProfitApproved() {
    let selectOrderIds: number[] = [];
    selectOrderIds.push(this.orderDetail.id);
    this.confirm("确定审核通过订单?", () => {
      if (selectOrderIds == null || selectOrderIds.length == 0) {
        this.error("订单异常，稍后再试!");
        return;
      }

      this.orderExceptionService.orderLowProfitApproved(null,
        null,
        null, null, null,
        null, null, null, null, null,
        null, null,
        selectOrderIds
      ).subscribe(data => {
        this.alertMessage("审核成功");
        this.loadOrderData();
        this.isOrderChanged = true;
      }, this.handleError);
    });

  }

  getTrackingNumberDisplayText(): string {

    const fetchType = this.trackingNumberDisplayType;

    if (fetchType == TrackingNumberFetchFormType.None) {
      if (this.isNullOrEmpty(this.orderDetail.trackingNumber)) {
        return '--';
      }
      return this.orderDetail.trackingNumber;
    }
    if (fetchType == TrackingNumberFetchFormType.Fetch) {
      return '';
    }
    if (fetchType == TrackingNumberFetchFormType.DisplayTrackingNumber) {
      return this.orderDetail.trackingNumber;
    }
    if (fetchType == TrackingNumberFetchFormType.DisplayAutoFetch) {
      return "自动获取中...";
    }
    if (fetchType == TrackingNumberFetchFormType.DisplayShippingOrderAdded) {
      return "已添加至物流商";
    }
    return '';
  }

  getTrackingNumberFetchFormType(): TrackingNumberFetchFormType {
    if (!this.canFetchOrFillTrackingNumber()) {
      return TrackingNumberFetchFormType.None;
    }
    if (!this.orderDetail.isTrackingNumberRequired) {
      if (this.isNullOrEmpty(this.orderDetail.trackingNumberApiName)) {
        return TrackingNumberFetchFormType.None;
      }

      return this.isNullOrEmpty(this.orderDetail.spPackageId) ?
        TrackingNumberFetchFormType.Fetch : TrackingNumberFetchFormType.DisplayShippingOrderAdded;
    }

    if (!this.isNullOrEmpty(this.orderDetail.trackingNumber)) {
      return TrackingNumberFetchFormType.DisplayTrackingNumber;
    }
    if (this.isNullOrEmpty(this.orderDetail.trackingNumberApiName)) {
      // return TrackingNumberFetchFormType.Fill;
      return TrackingNumberFetchFormType.Fetch;
    }

    if (this.orderDetail.shippingPackageId > 0) {
      return TrackingNumberFetchFormType.DisplayAutoFetch;
    }
    return this.isNullOrEmpty(this.orderDetail.spPackageId) ?
      TrackingNumberFetchFormType.Fetch : TrackingNumberFetchFormType.DisplayAutoFetch;
  }

  canFetchOrFillTrackingNumber() {
    if (this.orderDetail.isChannelTrackingNumber) {
      return false;
    }
    if (this.orderDetail.allocatedShippingServiceId == null) {
      return false;
    }
    if (this.orderDetail.statusInt < 300) {
      return false;
    }
    if (this.orderDetail.exception == 'None') {
      return true;
    }
    if (this.orderDetail.exception == 'TrackingNumberFectchFailed') {
      return false;
    }
    return false;
  }

  onFetchTrackingNumber() {
    this.loadingOrderAllocatedInfo = true;
    this.orderService.fetchTrackingNumber(this.orderId).subscribe(data => {
      this.loadingOrderAllocatedInfo = false;
      this.loadOrderData();
    }, e => {
      this.loadingOrderAllocatedInfo = false;
      this.handleError(e);
    });
  }

  openReissueModal() {
    const modal = this.modalService.open(ReissueModalComponent, {size: 'sm', backdrop: 'static'});
    modal.componentInstance.orderDetail = this.orderDetail;
    modal.componentInstance.goodsList = this.orderLines;
    modal.componentInstance.buyerAddress = this.buyerAddress;
    modal.result.then(result => {
      this.loadOrderData();
      this.isOrderChanged = true;
    }, reason => {
    })
  }

  splitOrderModal() {
    const modal = this.modalService.open(SplitOrderModalComponent, {size: 'sm', backdrop: 'static'});
    modal.componentInstance.OrderId = this.orderId;
    modal.componentInstance.externalOrderId = this.orderDetail.externalOrderId;
    modal.componentInstance.orderNumber = this.orderDetail.orderNumber;
    modal.result.then(result => {
      this.loadOrderData();
      this.isOrderChanged = true;
    }, reason => {
    })
  }

  mergeOrderModal() {
    const modal = this.modalService.open(MergeOrderModalComponent, {size: 'sm', backdrop: 'static'});
    modal.componentInstance.OrderId = this.orderId;
    modal.result.then(result => {
      if (result) {
        this.loadOrderData();
        this.isOrderChanged = true;
      }
    }, reason => {
    })
  }

  ChangeOrderPrority(priority: number) {
    this.orderService.ChangeOrderPrority(this.orderId, priority).subscribe(data => {
      this.orderDetail.priority = priority;
      this.alertMessage("操作成功");
      this.isOrderChanged = true;

    }, this.handleError);
  }

  orderBackComesBack() {

    this.loadingOrder = true;
    this.confirm("确定重新回传订单?", () => {
      this.orderService.orderBackComesBack(this.orderId).subscribe(data => {
        this.loadingOrder = false;
        this.alertMessage("回传成功");
        this.loadOrderData();
        this.isOrderChanged = true;
      }, e => {
        this.loadingOrder = false;
        this.handleError(e);
      });
    })
  }

}
