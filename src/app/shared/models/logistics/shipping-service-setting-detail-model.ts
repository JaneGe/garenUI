export class ShippingServiceSettingDetailModel {
  settingId: number;
  ssId: number;
  spId: number;
  spName: string;
  ssName: string;
  spWarehouse: string;
  pickingType: string;
  shipType:string;
  hasTrackingNumber: boolean;
  needReturnPackage: boolean;
  shippingLabelSetting: WarehouseShippingLabelSetting;
  senderAddressCn: AddressEntity;
  senderAddressEn: AddressEntity;
  pickupAddress: AddressEntity;
  returnAddress: AddressEntity;
  extendDataModel: any;
  warehouseId: number;
  carrierCodes: ShippingSettingCarrierCodeModel[];
  trackSite: string;
}

class WarehouseShippingLabelSetting {
  paperType: string;
  addressLabelCode: string;
  declarationLabelCode: string;
}

export class AddressEntity {
  phoneNumber: string;
  email: boolean;
  userName: string;
  provinceId: string;
  cityId: string;
  regionId: string;
  street: string;
  zipCode: string;
}

export class ShippingSettingCarrierCodeModel {
  channelType: string;
  carrierCode: string;
  customCarrierName: string;
}
