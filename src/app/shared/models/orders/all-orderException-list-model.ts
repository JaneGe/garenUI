export class AllOrderExceptionListModel {
  id: number;
  channelId: number;
  allocatedWarehouseId: number;
  allocatedShippingServiceId: number;
  isLocked: boolean;
  externalOrderId: string;
  orderNumber: string;
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
  orderedTime: Date;
  paidTime: Date;
  printedTime?: Date;
  shippedTime?: Date;
  earliestShipDate?: Date;
  latestShipDate?: Date;
  flag?: string;
}

export class AllOrderLineListModel{
  orderLineId: number;
  title: string;
  skuCode: string;
  externalOrderLineId: number;
  externalItemId: string;
  externalSku: string;
  quantity: number;
  price: Currency;
  externalProductId: string;
  inventoryId?: number;
  productUrl: string;
  productImgUrl: string;
  shippingMethod: string;
}

export class Currency {
  currencyCode: string;
  currencySymbol: string;
  amount: number;
}
