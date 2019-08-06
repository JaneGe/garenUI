export class OrderRulesModel {
  id: number;
  name: string;
  comments: string;
  isactive: boolean;
  priority: number;
  ruletype: number;
 orderpriority: number;
}

export class OrderRulesAddModel {
  priority: number;
  id: number;
  name: string;
  limitingmoney: LimitingMoneyModel;
  limitingcommodity: string[];
  limitingcountry: string[];
  limitingaccount: LimitingAccountModel[];
  limitingChannelType:LimitingOrderChannelTypeModel;
  weightrange: WeightRangeModel;
  outrangecountry: string[];
  hasrefund: boolean;
  hasretroactive: boolean;
  notmatchPaypal: boolean;
  noprovince: boolean;
  allorder: boolean;
  warehouseId:number;
  shippingServiceId:number;
  limitinglogistics: number[];
  productAttrIn:string[];
  productAttrOut:string[];
}


export class LimitingMoneyModel {
  min: string;
  max: string;
  currency: string;
}

 export class LimitingAccountModel {
   id: string;
  name: string;
}
export class LimitingOrderChannelTypeModel {
  channelType: string;
  channelTypeName: string;
}
export class LimitingLogisticsModel {
  platform: string;
  stations: string;
  logistics: string;
  id: number;
}
export class WeightRangeModel {
  min: number;
  max: number;
}
