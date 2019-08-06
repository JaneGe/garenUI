export class PackageListModel {
  id: number;
  packageNumber: string;
  orderId: number;
  orderNumber: string;
  packageItems: PackageItemModel[];
  estimateWeight: number;
  estimateShippingFee: number;
  buyerName: string;
  countryCode: string;
  shippingService: string;
  trackingNumber: string;
  status: string;
  statusDesc: string;
  createdTime: Date;
  apiName: string;
  spPackageId: string;
  isTrackingNumberRequired: boolean;
  shipWeight: number;
  shipShippingFee: number;
}

export class PackageItemModel {
  skuId: number;
  skuCode: string;
  quantity: number;
}
