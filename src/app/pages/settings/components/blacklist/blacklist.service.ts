import { ApiService } from "../../../../shared/services/api.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BlacklistService {
  constructor(public apiService: ApiService) {
  }
  getScreen() {
    return screen;
  }
  screen = [
    {
      title: '国家',
      items: ['英国', '意大利', '德国', '法国', '西班牙', '美国', '日本', '其他']
    }
  ];
  salesInfo = [
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
  ];
  reimburseInfo = [
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
    { receiver: 'Aliver Dvas', country: 'America', times: '10', money: '200' },
  ];
  shuadanInfo = [
    { receiver: 'Aliver Dvas', country: 'America', account: 'Alverasvas@foxmail.com' },
    { receiver: 'Aliver Dvas', country: 'America', account: 'Alverasvas@foxmail.com' },
    { receiver: 'Aliver Dvas', country: 'America', account: 'Alverasvas@foxmail.com' },
    { receiver: 'Aliver Dvas', country: 'America', account: 'Alverasvas@foxmail.com' },
    { receiver: 'Aliver Dvas', country: 'America', account: 'Alverasvas@foxmail.com' },
    { receiver: 'Aliver Dvas', country: 'America', account: 'Alverasvas@foxmail.com' },
    { receiver: 'Aliver Dvas', country: 'America', account: 'Alverasvas@foxmail.com' },
    { receiver: 'Aliver Dvas', country: 'America', account: 'Alverasvas@foxmail.com' },
  ];
}
