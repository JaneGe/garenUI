import {BaThemeConfigProvider} from "../../../../theme/theme.configProvider";
import {Injectable} from "@angular/core";
import {colorHelper} from "../../../../theme/theme.constants";
@Injectable()
export class TablePieChartService{
  constructor(private _baConfig:BaThemeConfigProvider){

  }
  traceNumTableData=[
    {day:'1天',num:2312,percentage:25},
    {day:'2天',num:1152,percentage:20},
    {day:'3天',num:123,percentage:23},
    {day:'4天',num:4353,percentage:34},
    {day:'5天',num:1243,percentage:65},
    {day:'6天',num:6452,percentage:12},
    {day:'7天',num:234,percentage:11},
  ];
  getTraceNumChannelData(){
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
        value: 0,
        color: dashboardColors.white,
        highlight: colorHelper.shade(dashboardColors.white, 15),
        label: '1天',
        percentage: 0,
        order: 1,
      }, {
        value: 1000,
        color: dashboardColors.gossip,
        highlight: colorHelper.shade(dashboardColors.gossip, 15),
        label: '2天',
        percentage: 12,
        order: 4,
      }, {
        value: 1000,
        color: dashboardColors.silverTree,
        highlight: colorHelper.shade(dashboardColors.silverTree, 15),
        label: '3天',
        percentage: 6,
        order: 3,
      }, {
        value: 1000,
        color: dashboardColors.surfieGreen,
        highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
        label: '4天',
        percentage: 1,
        order: 2,
      },
      {
        value: 1000,
        color: dashboardColors.success,
        highlight: colorHelper.shade(dashboardColors.success, 15),
        label: '5天',
        percentage: 22,
        order: 0,
      },
      {
        value: 1000,
        color: dashboardColors.more5,
        highlight: colorHelper.shade(dashboardColors.more5, 15),
        label: '6天',
        percentage: 22,
        order: 0,
      },
      {
        value: 1000,
        color: dashboardColors.warning,
        highlight: colorHelper.shade(dashboardColors.warning, 15),
        label: '7天',
        percentage: 22,
        order: 0,
      },
    ];
  }
}
