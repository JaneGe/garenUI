export class ShippingMethodListModel {
  ssId: number;
  ssCode: string;
  ssName: string;
  spCode: string;
  spName: string;
  spId: number;
  needAuthorize: boolean;
  isAuthorized: boolean;
  isActive: boolean;
  isCustom: boolean;
  logisticsProviderShippingMethod: string;
  hasTrackingNumber: boolean;
  trackingNumberApiName: string;
  carrireCodes: ShippingMethodCarrireCodeModel[];
}

class ShippingMethodCarrireCodeModel {
  channelType: string;
  carrierCode: string;
  customCarrierName: string;
}
