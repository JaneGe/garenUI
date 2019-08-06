import { ApiService } from "../../../../shared/services/api.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { EndPointsConfig } from "../../../../shared/Config";
import { ApiResponseBaseModel } from "../../../../shared/models/api.response.basemodel";
import { PurchaseSuggestModel } from "../../../../shared/models/purchases/purchase-suggest-model";
import { URLSearchParams } from "@angular/http";

@Injectable()
export class PurchaseService {
  constructor(public apiService: ApiService) {

  }

  PurchasePlanItemQuery(params: PurchaseSuggestModel): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Purchase_PlanItemQuery, params);
  }

  UpdatePurchasePlanCount(Id: number, count: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('PurchasePlanItemId', Id.toString());
    searchParams.set('Count', count.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Purchase_UpdatePurchasePlanCount, searchParams);
  }

  ActivaPurchasePlan(Id: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('PurchasePlanItemId', Id && Id.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Purchase_ActivaPurchasePlan, searchParams);
  }

  GeneratePurchaseOrder(Id: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('purchasePlanId', Id.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Purchase_Plan_GeneratePurchaseOrder, searchParams);
  }

  GetSupplierList(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Supplier_List);
  }
  getScreen() {
    return screen;
  }
  screen = [
    {
      title: '状态筛选',
      type: 'status',
      items: [{ Id: -1, Name: '全部' }, { Id: 0, Name: '已创建' }, { Id: 10, Name: '已确认' }, { Id: 20, Name: '已忽略' }, { Id: 40, Name: '已生成' }]
    },
    {
      title: '是否爆款',
      type: 'ishot',
      items: [{ Id: 0, Name: '全部' }, { Id: -1, Name: '是' }, { Id: 1, Name: '否' }]
    }
  ];
  Data = [
    {
      id: 244,
      imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509525178&di=884ba294943d70e73c92b80947032f14&imgtype=jpg&er=1&src=http%3A%2F%2Fp1.ol-img.com%2Fproduct%2F400x400%2F5%2F430%2F59aeb2882c0b4.jpg',
      skuName: '20支黑色眼影眼刷 化妆刷套装（金色）',
      isFire: true
    },
    {
      id: 242,
      imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508930571179&di=c72557e235606cfaed2c38257b3d3c32&imgtype=0&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft1297%2F268%2F26477101%2F522102%2F32ebb371%2F55435024Nde859bdd.jpg',
      skuName: '【默认】粉色猫群;130*185cm',
      isFire: false
    },
    {
      id: 21,
      imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508930689561&di=88ee65d641526ae43331545caa0d88d8&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd833c895d143ad4b14e96edd88025aafa50f06e3.jpg',
      skuName: '领带 男士 格子纹 多色 南充丝绸',
      isFire: true
    },
    {
      id: 34,
      imgSrc: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3871891412,690454292&fm=27&gp=0.jpg',
      skuName: '水杯 水瓶 保温杯 金属 小马 黄色',
      isFire: false
    }
  ];
}
