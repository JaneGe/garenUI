export class  ShippingProviderAuthMetadataModel{
  spId: number;
  spCode: string;
  spName: string;

  authorizeHelpUrl: string;
  fields: ShippingProviderAuthMetadataFiledModel[];
}
export  class  ShippingProviderAuthMetadataFiledModel {
  fieldName: string;
  fieldDisplyName: string;
  isRequired: boolean;
  stringMaximumLength?: number;
}
