export class ChannelTypeName {
  displayName: string;
  code: string;
}

export class CommonOptionModel {
  text: string;
  value: any;
}

export class SiteConst {

  static supportChannelTypes: ChannelTypeName[] = [
    { displayName: 'Amazon', code: 'Amazon' },
    { displayName: 'Wish', code: 'Wish' },
    { displayName: '速卖通', code: 'AliExpress' },
    { displayName: '手工订单', code: 'Manual' },
  ];

  static supportChannelTypeNoManual: ChannelTypeName[] = [
    { displayName: 'Amazon', code: 'Amazon' },
    { displayName: 'Wish', code: 'Wish' },
    { displayName: '速卖通', code: 'AliExpress' },
  ];

  static supportFilterCountries: CommonOptionModel[] = [
    { text: '英国', value: 'GB' },
    { text: '法国', value: 'FR' },
    { text: '德国', value: 'DE' },
    { text: '美国', value: 'US' },
    { text: '意大利', value: 'IT' },
    { text: '西班牙', value: 'ES' },
    { text: '日本', value: 'JP' },
    { text: '俄罗斯', value: 'RU' },
    { text: '其他', value: 'Other' },
  ]
}

