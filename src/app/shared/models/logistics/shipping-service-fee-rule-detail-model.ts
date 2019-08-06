import {ShippingFeeRuleItem} from "./shipping-fee-rule-item";

export class ShippingServiceFeeRuleDetailModel {

  id:number;
  shippingServiceId:number;
  name: string;
  countryCodes: string;
  ///物流方式级别的折扣
  discountRate: number;
  items: ShippingFeeRuleItem[];
}

