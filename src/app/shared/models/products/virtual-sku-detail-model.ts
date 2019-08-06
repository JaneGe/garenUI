export class VirtualSkuDetailModel {
  id: number;
  code:string;
  items:VirtualSkuItemModel[];
}

export class VirtualSkuItemModel {
   skuId: number;
   skuCode: string;
   quantity: number=1;
}
