import {SkuSearchLiteModel} from "../products/sku-search-lite-model";

export class OrderCompleteSaleRuleModel {
  id: number;
  name: string;
  channelType: string;
  warehouseId: number;
  priority: number;
  channelIds: string[];
  countryCodes: string[];
  ssIds: string[];
  skuIds: string[];
  skus: SkuSearchLiteModel[];
  isActive: boolean;
  isAllChannel: boolean;
  trackingNumberType: string;
  runTimeInfo: CompleteSaleRunTimeData;
}

class CompleteSaleRunTimeData {
  times: CompleteSaleRunTimeDataItem[];
  shipTimeData: CompleteSaleShipTimeData;
}

class CompleteSaleRunTimeDataItem {
  dayOfWeek: string;
  hourFrom: number;
  hourTo: number;
}

class CompleteSaleShipTimeData {
  saleShipTimeType: string;
  hours: number;
}
