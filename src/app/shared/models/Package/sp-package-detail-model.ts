export class SpPackageDetailModel {
  id: string;
  idNum: number;
  packageNumber: string;
  pickingNumber: string;
  estimateWeight: number;
  shipWeight: number;
  shippingService: string;
  trackingNumber: string;
  status: string;
  statusDesc: string;
  isTrackingNumberRequired: boolean;
  trackingNumberApiName: string;
  trackingNumberApiFetchType: string;
  shippingPackageId: number;
  spPackageId: string;
  pickingId: number;
  warehouseId: number;
  spWeight: number;
  spShippingFee: number;
  shipShippingFee: number;
  spFeeCheckTime: Date;
}
