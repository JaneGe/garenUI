export class UnpackPackageInfoModel {
  skuId: number;
  skuCode: string;
  skuImage: string;
  name: string;
  createOrderUserId: number;
  createOrderUserName: string;

  payOrderUserId: number;
  payOrderUserName: string;
  accountName: string;
  accountId: number;
  ali1688Order: string;
  aliPayTradeId: string;
  supplierId: number;
  supplierName: string;
  trackingNumbers: TrackingNumberInfoModel[];

  length: number;
  width: number;
  height: number;
  weight: number;

  aliAttributeString: string;
  aliAttributes: string[];

  purchaseNote: string;
  purchaseQuantityRatio: string;

  isGroupSku: boolean;
  aliSpecId: string;
  aliOfferId: number;
  purchaseQuantity: number;
  instockQuantity: number;
  itemStatus: string;
  badQuantity: number;
  purchaseUrls: PurchaseUrlModel[];
  purchasePlatformOrderItemId: number;
  purchasePlatformOrderId: number;

  orderNotes: PurchasePlatformOrderNote[];
  unpackRecords: PurchasePlatformOrderItemUnpackRecordModel[];
}

class PurchaseUrlModel {
  id: number;
  url: string;
  title: string;
}

export class TrackingNumberInfoModel {
  isReceived: boolean;
  trackingNumber: string;
  logisticsCompanyName: boolean;
  id: number;
}

export class PurchasePlatformOrderNote {
  noteType: string;
  noteTypeDesc: string;
  content: string;
  id: number;
  createdTime: Date;
  userId: number;
  userName: string;
}
export class PurchasePlatformOrderItemUnpackRecordModel {
    id: number;
    inStcokQuantity: number;
    lackQuantity: number;
    badQuantity: number;
    sendWrongQuantity: number;
    createdTime: Date;
    userId: number;
    userName: string
}
