import { ApiService } from "../../../../shared/services/api.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PurchaseService {
  constructor(public apiService: ApiService) {
  }
  getScreen() {
    return screen;
  }
  screen = [
    {
      title: '状态筛选',
      items: ['全部', '未处理', '已完成', '已忽略']
    },
    {
      title: '1688商品',
      items: ['全部', '是', '否']
    },
    {
      title: '是否爆款',
      items: ['全部', '是', '否']
    }
  ];
/*   Data = [
    {
      store: '张周三特色水杯店',
      isAll: false,
      data: [
        {
          checked: false,
          skuCode: 'AAAA',
          sku: '水杯 水瓶 保温杯 金属 小马 黄色',
          isUrgent: '是',
          num: 200,
          numDetail: 'shawrich1(Cdiscount)*7 手工订单*5',
          linkName: '【默认】黑色小马;130*185cm',
          statu: '未完成',
          imgSrc: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3871891412,690454292&fm=27&gp=0.jpg',
          package: 'STB120024,STB120957,STB107173,STB120022,STB96474,STB120956,STB120958,STB116822,STB108790,STB120015,STB120016,STB214522',
        },
        {
          checked: false,
          skuCode: 'AAAA',
          sku: '水杯 水瓶 保温杯 金属 小马 黄色',
          isUrgent: '是',
          num: 200,
          numDetail: 'shawrich1(Cdiscount)*7 手工订单*5',
          linkName: '【默认】黑色小马;130*185cm',
          statu: '已完成',
          imgSrc: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3871891412,690454292&fm=27&gp=0.jpg',
          package: 'STB120024,STB120957,STB107173,STB120022,STB96474,STB120956,STB120958,STB116822,STB108790,STB120015,STB120016,STB214522'
        }
      ]
    },
    {
      store: '李周四化妆品店',
      isAll: false,
      data: [
        {
          checked: false,
          skuCode: 'AAAA',
          sku: '20支黑色眼影眼刷 化妆刷套装（金色）',
          isUrgent: '是',
          num: 200,
          numDetail: 'shawrich1(Cdiscount)*7 手工订单*5',
          linkName: '20支黑色眼影眼刷 化妆刷套装（金色）',
          statu: '已忽略',
          imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509525178&di=884ba294943d70e73c92b80947032f14&imgtype=jpg&er=1&src=http%3A%2F%2Fp1.ol-img.com%2Fproduct%2F400x400%2F5%2F430%2F59aeb2882c0b4.jpg',
          package: 'STB116822,STB108790,STB120015,STB120016,STB214522'
        },
        {
          checked: false,
          skuCode: 'AAAA',
          sku: '20支黑色眼影眼刷 化妆刷套装（金色）',
          isUrgent: '是',
          num: 200,
          numDetail: 'shawrich1(Cdiscount)*7 手工订单*5',
          linkName: '20支黑色眼影眼刷 化妆刷套装（金色）',
          statu: '已完成',
          imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509525178&di=884ba294943d70e73c92b80947032f14&imgtype=jpg&er=1&src=http%3A%2F%2Fp1.ol-img.com%2Fproduct%2F400x400%2F5%2F430%2F59aeb2882c0b4.jpg',
          package: 'STB116822,STB108790,STB120015,STB120016,STB214522'
        },
        {
          checked: false,
          skuCode: 'AAAA',
          sku: '20支黑色眼影眼刷 化妆刷套装（金色）',
          isUrgent: '是',
          num: 200,
          numDetail: 'shawrich1(Cdiscount)*7 手工订单*5',
          linkName: '20支黑色眼影眼刷 化妆刷套装（金色）',
          statu: '未完成',
          imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509525178&di=884ba294943d70e73c92b80947032f14&imgtype=jpg&er=1&src=http%3A%2F%2Fp1.ol-img.com%2Fproduct%2F400x400%2F5%2F430%2F59aeb2882c0b4.jpg',
          package: 'STB116822,STB108790,STB120015,STB120016,STB214522'
        }
      ]
    }
  ]; */


}
