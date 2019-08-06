import {Observable} from "rxjs/Observable";
import {EndPointsConfig} from "../../../shared/Config";
import {ApiResponseBaseModel} from "../../../shared/models/api.response.basemodel";
import {ApiService} from "../../../shared/services/api.service";
import {Injectable} from "@angular/core";

@Injectable()
export class TabelChartService{
  constructor(public apiService: ApiService) {

  }

  QueryForOrder(param:any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Orderstatistics_QueryForOrderPriceStatistic, param);
  }

  GetOrderLoseMoneyStatisticQuery(param:any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.OrderStatistics_GetOrderLoseMoneyStatisticQuery,param);
  }
  GetOrderAccountMoneyStatisticQuery(param:any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.OrderStatistics_GetOrderAccountMoneyStatisticQuery,param);
  }

  backmoneyinfo=[
    {orderNum:"111",country:"China",plateForm:"Ebay",account:'666',ifbackmoney:'是',money:888,time:new Date().toLocaleDateString()},
    {orderNum:"222",country:"China",plateForm:"Amazon",account:'777',ifbackmoney:'是',money:111,time:new Date().toLocaleDateString()},
    {orderNum:"222",country:"China",plateForm:"Amazon",account:'888',ifbackmoney:'是',money:222,time:new Date().toLocaleDateString()},
    {orderNum:"222",country:"China",plateForm:"Amazon",account:'999',ifbackmoney:'是',money:333,time:new Date().toLocaleDateString()},
  ];
  InSevenDayMoney=[
    {date:'2017/9/16',money:20},
    {date:'2017/9/17',money:40},
    {date:'2017/9/18',money:80},
    {date:'2017/9/19',money:120},
    {date:'2017/9/20',money:70},
    {date:'2017/9/21',money:50},
    {date:'2017/9/22',money:30},

    {date:'2017/9/23',money:20},
    {date:'2017/9/24',money:40},
    {date:'2017/9/25',money:80},
    {date:'2017/9/26',money:120},
    {date:'2017/9/27',money:70},
    {date:'2017/9/28',money:50},
    {date:'2017/9/29',money:30},

    {date:'2017/9/30',money:20},
    {date:'2017/10/1',money:40},
    {date:'2017/10/2',money:80},
    {date:'2017/10/9',money:120},
    {date:'2017/10/10',money:70},
    {date:'2017/10/11',money:50},
    {date:'2017/10/12',money:30},

    {date:'2017/10/13',money:20},
    {date:'2017/10/14',money:40},
    {date:'2017/10/15',money:80},
    {date:'2017/10/16',money:120},
    {date:'2017/10/17',money:70},
    {date:'2017/10/18',money:50},
    {date:'2017/10/19',money:30},

    {date:'2017/10/20',money:70},
    {date:'2017/10/21',money:50},
    {date:'2017/10/22',money:30},
  ];
  ordernuminfo=[
    {orderNum:"111",country:"China",plateForm:"Ebay",account:'666',num:999,time:new Date().toLocaleDateString()},
    {orderNum:"222",country:"China",plateForm:"Amazon",account:'666',num:888,time:new Date().toLocaleDateString()},
    {orderNum:"333",country:"China",plateForm:"Amazon",account:'666',num:777,time:new Date().toLocaleDateString()},
    {orderNum:"444",country:"China",plateForm:"Amazon",account:'666',num:666,time:new Date().toLocaleDateString()},
  ];
  InSevenDayNum=[
    {date:'2017/9/16',num:20},
    {date:'2017/9/17',num:40},
    {date:'2017/9/18',num:80},
    {date:'2017/9/19',num:120},
    {date:'2017/9/20',num:70},
    {date:'2017/9/21',num:50},
    {date:'2017/9/22',num:30},
  ];

  freightInfo=[
    {deliverTime:'2017/12/20 下午 17:47:20',storage:"本地仓库",orderNum:300,packageNum:6000,estimateMoney:2000,alreadyConfirmPackage:5888,actualMoney:2200},
    {deliverTime:'2017/12/20 下午 17:47:20',storage:"海外仓库",orderNum:300,packageNum:6000,estimateMoney:2000,alreadyConfirmPackage:5888,actualMoney:2200},
    {deliverTime:'2017/12/20 下午 17:47:20',storage:"海外仓库",orderNum:300,packageNum:6000,estimateMoney:2000,alreadyConfirmPackage:5888,actualMoney:2200},
  ];
  InSevenDayFreightConfirm=[
    {date:'2017/9/16',actualMoney:20},
    {date:'2017/9/17',actualMoney:40},
    {date:'2017/9/18',actualMoney:80},
    {date:'2017/9/19',actualMoney:120},
    {date:'2017/9/20',actualMoney:70},
    {date:'2017/9/21',actualMoney:50},
    {date:'2017/9/22',actualMoney:30},
  ];
  InSevenDayFreightestimate=[
    {date:'2017/9/16',estimateMoney:0},
    {date:'2017/9/17',estimateMoney:50},
    {date:'2017/9/18',estimateMoney:40},
    {date:'2017/9/19',estimateMoney:0},
    {date:'2017/9/20',estimateMoney:55},
    {date:'2017/9/21',estimateMoney:120},
    {date:'2017/9/22',estimateMoney:0},
  ];

}
