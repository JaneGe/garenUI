export class NeedMergeOrderGroupListModel {
  addressHash: string;
  orders: NeedMergeOrderListModel[];
}
export class NeedMergeOrderListModel  {
  id: number;
  channelId: number;
  isLocked: boolean;
  orderNumber: string;
  trackingNumber: string;
  channelType: string;
  currency: string;
  totalAmount: number;
  status: string;
  statusDesc: string;
  exception: string;
  exceptionDesc: string;
  allocatedWarehouseId: number;
  warehouseName: string;
  allocatedShippingServiceId: number;
  ssName: string;
  shippingCountryCode: string;
  shippingCountryName: string;
  buyerName: string;
  completeSalesStatus: string;
  returnField: boolean;
  orderedTime: Date;
  paidTime:Date;
}
