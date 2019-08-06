

export class PackageDetailModel {
  id: number;
  packageNumber: string;
  orderNumber: string;
  pickingNumber: string;
  packageItems:PackageItemModel[];
  logs: PackageLogModel[];
  estimateWeight:number;
  shipWeight:number;
  shippingService:string;
  trackingNumber:string;
  status:string;
  statusDesc: string;
  isTrackingNumberRequired: boolean;
  trackingNumberApiName: string;
  trackingNumberApiFetchType: string;
  shippingPackageId: number;
  spPackageId: string;
  pickingId: number;
  warehouseId: number;
  exceptionLocation:string
}

export class PackageItemModel {
  skuId: number;
  skuCode: string;
  quantity: number;
  locationLable: string;
  locationDesc: string;
}
export class PackageLogModel {
  message: string;
  createdTime: Date;
  userName: string;
}
export class PackageDefuseParam {
  packageId: number;
  pageIndex:number;
  pageSize:number;
}
