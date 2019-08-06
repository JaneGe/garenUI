
export class ShippingFeeRuleItem{
  shippingFeeRuleItemId: number;
  minWeight: number;
  maxWeight: number;
  calcType: number;
  calcTypeEnum: RuleItemChargeType;
  //每克价格
  unitPrice: number;
  //固定金额
  fixedFee:number;
  ///固定燃油费用
  fuelCost: number;
  ///固定燃油费率
  fuelRate: number;
  //操作费
  handlingFee: number;
  //其他费用
  otherFee: number;
  discountRate: number;
}
export enum RuleItemChargeType{
  ///按克收费
  ByGram = 0,
  //固定金额
  FixedAmount = 1
}

