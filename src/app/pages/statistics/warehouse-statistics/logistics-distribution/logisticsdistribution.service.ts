import {BaThemeConfigProvider} from "../../../../theme/theme.configProvider";
import {Injectable} from "@angular/core";
import {colorHelper} from "../../../../theme/theme.constants";
@Injectable()
export class LogisticsdistributionService{
  constructor(private _baConfig:BaThemeConfigProvider){

  }
  tableData=[
    {warehouse:'本地仓库',logistics:'顺风',num:110,percentage:10},
    {warehouse:'海外仓库',logistics:'中通',num:180,percentage:30},
    {warehouse:'本地仓库',logistics:'百世',num:200,percentage:10},
    {warehouse:'海外仓库',logistics:'圆通',num:420,percentage:5},
    {warehouse:'本地仓库',logistics:'京东',num:140,percentage:15},
    {warehouse:'本地仓库',logistics:'天天',num:110,percentage:20},
    {warehouse:'本地仓库',logistics:'申通',num:420,percentage:10},
  ];
  getTraceNumChannelData(){
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
        value: 150,
        color: dashboardColors.white,
        highlight: colorHelper.shade(dashboardColors.white, 15),
        label: '顺风',
        percentage: 10,
        order: 1,
      }, {
        value: 180,
        color: dashboardColors.gossip,
        highlight: colorHelper.shade(dashboardColors.gossip, 15),
        label: '中通',
        percentage: 30,
        order: 4,
      }, {
        value: 200,
        color: dashboardColors.silverTree,
        highlight: colorHelper.shade(dashboardColors.silverTree, 15),
        label: '百世',
        percentage: 10,
        order: 3,
      }, {
        value: 300,
        color: dashboardColors.surfieGreen,
        highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
        label: '圆通',
        percentage: 5,
        order: 2,
      },
      {
        value: 140,
        color: dashboardColors.success,
        highlight: colorHelper.shade(dashboardColors.success, 15),
        label: '京东',
        percentage: 15,
        order: 0,
      },
      {
        value: 110,
        color: dashboardColors.more5,
        highlight: colorHelper.shade(dashboardColors.more5, 15),
        label: '天天',
        percentage: 20,
        order: 0,
      },
      {
        value: 140,
        color: dashboardColors.warning,
        highlight: colorHelper.shade(dashboardColors.warning, 15),
        label: '申通',
        percentage: 10,
        order: 0,
      },
    ];
  }
}
