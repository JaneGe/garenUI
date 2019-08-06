import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ApiService} from "../../../../shared/services/api.service";
import {ApiResponseBaseModel} from "../../../../shared/models/api.response.basemodel";
import {EndPointsConfig} from "../../../../shared/Config";
import {URLSearchParams} from "@angular/http";

export class TaskListService {
  constructor(public apiService: ApiService) {

  }
  GetPickPrintQuery(pickId:any): Observable<ApiResponseBaseModel<any[]>> {
    const searchParams = new URLSearchParams();
    searchParams.set('pickId', pickId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Package_GetPickPrintQuery,searchParams);
  }

  taskList = [
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '（橙色）7刷除尘板条，清洁刷，一个一卖'},
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '十四格双排药盒，英文创意小药盒，超迷你便携药盒，随身药盒'},
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '莲花造型，棉签座牙签两座两用，LOTUS棉签收纳盒'},
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '【旋风小子 木瓜飞舞三阶彩色】彩色木瓜3阶魔方 免贴纸不褪色'},
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '【全网销量第一泳裤】时尚男士泳裤/平角男士泳衣批发 平角泳裤'},
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '（10支一卖，有漆，规格：14.5*3.6CM）环保餐具 果酱勺 创意蜜蜂勺 复古手工竹木勺子'},
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '100个一卖蓝色热缩防水接线端子'},
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '猫掌蛋糕模具'},
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '粉红色 童车车筐 车篮 蛙式车 车筐 加大号1 厂家直销 全编织车筐'},
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '（浅蓝杆+金管）15支化妆刷套装'},
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '淘宝爆款厂家现货 狗窝 猫窝 宠物窝 宠物用品 草莓窝 特价批发'},
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '专业指甲锉双面打磨圆头时尚EAV砂纸锉 抛光纱条美甲工具 批发'},
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '（一件一卖，彩色）一次性饮料果汁奶茶彩色吸管 可造型'},
    { warehouse: 'X10A02', SKU: '1016676DMT102202DP', num: '9', name: '厂家批发塑料小型三脚三角按摩器震动 USB礼品 迷你电动按摩器'},
  ];
}
