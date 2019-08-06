export class PackingScanModel {
  WareHouseid: number;
  SkuCode:string;
  PickNumber:string;
  PickingId: number;
}

export class PackageCalculateModel {
  totalCaleType: number;
  totalCount:number;
  packageCount:number;
  pickingId:number;
  pendingPrintPackageCount:number;
  packageType:string;
}

