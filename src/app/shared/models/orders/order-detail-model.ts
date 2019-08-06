

export class OrderDetailModel {
  id: number;
  channelId: number;
  channelName: string;
  isLocked: boolean;
  refuseCount:number;
  isMerged: boolean;
  externalOrderId: string;
  orderNumber: string;
  channelType: string;
  channelTypeDesc: string;
  currency: string;
  currencyExchangeRate: number;
  totalAmount: number;
  financeShippingFee: number;
  financeProfit: number;
  totalAmountCny: number;
  siteShippingFee: number;
  siteCommissionFee: number;
  paymentMethod: string;
  site: string;
  shippingMethod: string;
  shippingMethodId: number;
  status: string;
  statusInt: number;
  statusDesc: number;
  exception: string;
  exceptionDesc: string;
  exceptionMessage: string;
  matchedRuleId: number;
  matchedRuleName: string;
  allocatedWarehouseId: number;
  warehouseName: string;
  allocatedShippingServiceId: number;
  shippingServiceName: string;
  allocatedPakcageId: number;
  allocatedPakcageNumber: string;
  trackingNumber: string;
  isChannelTrackingNumber: boolean;
  canPreCompleteSale: boolean;
  orderMessage: string;
  hasReissue: boolean;
  relatedOrderId: number;
  reissueReason: string;
  buyerId: number;
  fulfillmentChannel: string;
  estimateTotalWeight: number;
  estimateShippingFee: number;
  estimateProfit: number;
  skuCostAmount: number;
  completeSalesStatus: string;
  completeSalesStatusDesc: string;
  isIgnoreCompleteSales: boolean;
  isTrackingNumberRequired:boolean;
  trackingNumberApiName: string;
  trackingNumberApiFetchType: string;
  shippingPackageId: number;
  spPackageId: string;

  priority: number;
  orderedTime: Date;
  paidTime: Date;
  printedTime: Date;
  shippedTime: Date;
  earliestShipDate: Date;
  latestShipDate: Date;
  operator: any;
  shippingAddress: OrderShippingAddress;
  orderOperationStatus: OrderOprationStatusModel;

  confirmShippingFee?: number;
  confirmSkuCostAmount?: number;
  confirmProfit?: number;
  confirmCurrencyExchangeRate?: number;


  orderLines: OrderLineModel[];
  orderLogs: OrderLogModel[];
  orderNotes: OrderNoteModel[];
}
export class OrderOprationStatusModel {
  canActive: boolean;
  canReset: boolean;
  canVoid: boolean;
  canAllocate: boolean;
}

export class OrderShippingAddress {
  orderId: number;
  externalAddressId: string;
  buyerAccount: string;
  buyerEmail: string;
  buyerName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  countryCode: string;
  countryEnName: string;
  countryCnName: string;
  phoneNumber1: string;
  phoneNumber2: string;
}

export class OrderLineModel {
  id: number;
  orderId: number;
  skuId: number;
  skuCode: string;
  externalOrderLineId: string;
  externalItemId: string;
  externalSku: string;
  title: string;
  quantity: number;
  price: Currency;
  externalProductId: number;
  inventoryId: number;
  productUrl: string;
  productImgUrl: string;
  shippingMethod: string;

  isDeclarationMissed: boolean;
  skuInfo: OrderLineSkuInfoModel;
}

export class OrderLogModel {
  id: number;
  message: string;
  createdByUserId: number;
  userName: string;
  createdTime: Date;
}

export class OrderNoteModel {
  id: number;
  content: string;
  userName: string;
  createdByUserId: number;
  createdTime: Date;
}

export class Currency {
  currencyCode: string;
  currencySymbol: string;
  amount: number;
}
export class OrderLineSkuInfoModel{
  length: number;
  width: number;
  height: number;
  weight: number;
  declaration: Declaration;
}
class Declaration {
  chineseName: string;
  englishName: string;
  currencyCode: string;
  declaredValue: number;
  hsCode: string;
}

export class OrderLineEditModel {
  id: number;
  skuId: number;
  skuCode: string;
  externalOrderLineId: string;
  externalItemId: string;
  externalSku: string;
  title: string;
  quantity: number;
  inventoryId: number;
  productUrl: string;
  productImgUrl: string;
  shippingMethod: string;
}
export class OrderDefuseParam {
  orderId: number;
  pageIndex:number;
  pageSize:number;
}
