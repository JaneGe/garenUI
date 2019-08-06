import { ApiService } from "../../../../shared/services/api.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PurchaseService {
  constructor(public apiService: ApiService) {
  }
  getScreen() {
    return screen;
  }
  Data = [
    {
      actualNumber: 1,
      aliOrderNumber: null,
      allInventoryPrice: 0,
      avaiableSaleDays: 0,
      availableInventory: 0,
      createdTime: "2017-11-18T09:42:32.7109468+08:00",
      currentInventory: 0,
      forecastInNumber: 2,
      id: 10008,
      isHot: false,
      loginId: null,
      orderNumber: 2,
      outOfStockQuantity: 2,
      planType: "All",
      planTypeDesc: "采购+欠票",
      purchaseDay: 7,
      purchaseNote: null,
      purchaseOrderId: null,
      purchasePlanId: 7,
      purchasePlanItemId: 7,
      purchaseUrlId: 0,
      purchaseUrlLines: [{
        attr: ["白色"],
        purchaseUrl: "https://detail.1688.com/offer/36354021070.html",
        purchaseUrlId: 20028,
        purchaseUrlNote: null,
        purchaseUrlPrice: 0,
        purchaseUrlSkuId: 10019,
        supplierId: 24,
      }],
      purchasingQuantity: 0,
      purchasingQuantityExtra: 0,
      remark: "",
      skuCode: "777",
      skuId: 10019,
      skuImg: "https://cbu01.alicdn.com/img/order/trading/086/915/95905793688/3202761806_413639445.jpg",
      skuName: "777",
      status: "Completed",
      statusDesc: "已完成",
      supplierId: 24,
      supplierName: "系统自定义_24",
      waitReceiveQuantity: 0,
      waitReceiveQuantityExtra: 0,
    }
  ];

}
