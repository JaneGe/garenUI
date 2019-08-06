export class PackagePickingFailLackInfoModel {
  items: PackagePickingFailItemModel[];
}
class PackagePickingFailItemModel {
  skuId: number;
  skuCode: string;
  quantity: number;
  lackQuantity: number;
  isLackItem: boolean;
  // ui使用
  purchaseQty: number;
}
