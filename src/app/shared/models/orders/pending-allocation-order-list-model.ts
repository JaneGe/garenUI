export class PendingGroupAllocationOrderListModel{
  orders: PendingAllocationOrderListModel[];
  orderOutOfStockQuantityList:any;
}

export class PendingAllocationOrderListModel {
  id: number;
  channelId: number;
  isLocked: boolean;
  externalOrderId: string;
  orderNumber: string;
  trackingNumber: string;
  channelType: string;
  currency: string;
  totalAmount: number;
  status: string;
  statusDesc: string;
  exception: string;
  exceptionDesc: string;
  prority: number;
  shippingCountryCode: string;
  shippingCountryName: string;
  buerName: string;
  warehouseName: string;
  channelName: string;
  ssName: string;
  orderedTime: Date;
  paidTime: Date;
  printedTime?: Date;
  shippedTime?: Date;
  earliestShipDate?: Date;
  latestShipDate?: Date;
  orderLines: PendingAllocationOrderListItemModel[];
}
class PendingAllocationOrderListItemModel {
  orderLineId: number;
  title: string;
  skuCode: string;
  externalOrderLineId: string;
  externalItemId: string;
  externalSku: string;
  quantity: number;
  externalProductId: number;
  inventoryId: number;
  productUrl: string;
  productImgUrl: string;
  shippingMethod: string;
}
