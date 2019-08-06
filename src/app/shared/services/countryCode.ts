import {CountryCodeModel} from '../models/logistics/countryCode.model';

let img =  'assets/country';

export let country: CountryCodeModel[] = [
    { country: '美国', currencyCode: 'USD', countryCode: 'US', flag:(`${img}/US.svg`)},
    { country: '英国', currencyCode: 'GBP', countryCode: 'GB', flag:(`${img}/GB.svg`)},
    { country: '法国', currencyCode: 'EUR', countryCode: 'FR', flag:(`${img}/FR.svg`)},
    { country: '意大利', currencyCode: 'EUR', countryCode: 'IT', flag:(`${img}/IT.svg`)},
    { country: '德国', currencyCode: 'EUR', countryCode: 'DE', flag:(`${img}/DE.svg`)},
    { country: '西班牙', currencyCode: 'EUR', countryCode: 'ES', flag:(`${img}/ES.svg`)},
    { country: '日本', currencyCode: 'JPY', countryCode: 'JP', flag:(`${img}/JP.svg`)},
    { country: '加拿大', currencyCode: 'CAD', countryCode: 'CA', flag:(`${img}/CA.svg`)},
    { country: '墨西哥', currencyCode: 'MEX', countryCode: 'MY', flag:(`${img}/MY.svg`)},
    { country: '澳大利亚', currencyCode: 'AUD', countryCode: 'AU', flag:(`${img}/AU.svg`)},
    // { country: '中国', currencyCode: 'CNY', countryCode: 'CN', flag:(`${img}/CN.svg`)},
    { country: '台湾', currencyCode: 'TWD', countryCode: 'TW', flag:(`${img}/TW.svg`)},
]

