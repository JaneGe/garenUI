export class PackageShipmentInfo {
  packageId: number;
  warehouseId: number;
  packageNumber: string;
  orderNumbers: string[];
  isLocked: boolean;
  packageStatus: string;
  packageStatusDesc: string;
  skuInfos: SkuInfo[];
  spPackageId: string;
  trackingNumber: string;
  estimateWeight: number;
}

class SkuInfo {
  skuId: number;
  skuCode: string;
  quantity: number;
}
