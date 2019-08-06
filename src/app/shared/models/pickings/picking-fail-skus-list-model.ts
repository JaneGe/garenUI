export class PickingFailSkusListModel {
  recordItemId: number;
  skuId: number;
  skuCode: number;
  locationId: number;
  locationCode: string;
  lackQuantity: number;
  canCheckingInventory: boolean;
  createdTime: Date;
  checkInventoryTime: Date;
  purchasedTime: Date;
  shippedTime: Date;
  status: string;
  statusDesc: string;
}
