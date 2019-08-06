export class CheckingStockTaskPrintDataModel {
  createdTime: Date;
  warehouseId: number;
  warehouseName: string;
  taskId: number;
  packageCount: number;
  skuTypeCount: number;
  locationCount: number;
  items: CheckingStockTaskPrintDataItemModel[]
}
class CheckingStockTaskPrintDataItemModel {
    skuCode: string;
    locationCode: string;
    skuId: number;
    locationId: number;
    skuName: string;
    lackQuantity: number;
    isMoreLocation: boolean;
}
