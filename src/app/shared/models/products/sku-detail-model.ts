export class SkuDetailModel {
  id: number;
  skuCode: string;
  name: string;
  length: number;
  width: number;
  height: number;
  costPrice: number;
  weight: number;

  shippingAttributes: string[];
  compositeAttrs: string[];
  skuUnit: string;

  imageUrl: string;
  status: string;

  declaration: SkuDeclaration;
  isGroupSku: boolean;
}

export class SkuDeclaration {
  chineseName: string;
  englishName: string;
  currencyCode: string;
  declaredValue?: number;

  hsCode: string;
}
