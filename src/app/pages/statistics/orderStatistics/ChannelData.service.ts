import {BaThemeConfigProvider} from "../../../theme/theme.configProvider";
import {colorHelper} from "../../../theme/theme.constants";
import {Injectable} from "@angular/core";
@Injectable()
export class ChannelDataService{
  constructor(private _baConfig:BaThemeConfigProvider){
  }
  getCountryChannelData(){
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
        value: 1000,
        color: dashboardColors.white,
        highlight: colorHelper.shade(dashboardColors.white, 15),
        label: '英国',
        percentage: 8,
        order: 1,
      }, {
        value: 1000,
        color: dashboardColors.gossip,
        highlight: colorHelper.shade(dashboardColors.gossip, 15),
        label: '意大利',
        percentage: 12,
        order: 4,
      }, {
        value: 1000,
        color: dashboardColors.silverTree,
        highlight: colorHelper.shade(dashboardColors.silverTree, 15),
        label: '德国',
        percentage: 6,
        order: 3,
      }, {
        value: 1000,
        color: dashboardColors.surfieGreen,
        highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
        label: '法国',
        percentage: 1,
        order: 2,
      },
      {
        value: 1000,
        color: dashboardColors.success,
        highlight: colorHelper.shade(dashboardColors.success, 15),
        label: '西班牙',
        percentage: 22,
        order: 0,
      },
    ];
  }
  getAccountChannelData(){
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
        value: 500,
        color: dashboardColors.white,
        highlight: colorHelper.shade(dashboardColors.white, 15),
        label: 'wish-asdfas',
        percentage: 10,
        order: 1,
      }, {
        value: 1500,
        color: dashboardColors.gossip,
        highlight: colorHelper.shade(dashboardColors.gossip, 15),
        label: 'amzon-rfgrf',
        percentage: 25,
        order: 4,
      }, {
        value: 600,
        color: dashboardColors.silverTree,
        highlight: colorHelper.shade(dashboardColors.silverTree, 15),
        label: 'smt-agrgerd',
        percentage: 8,
        order: 3,
      }, {
        value: 400,
        color: dashboardColors.surfieGreen,
        highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
        label: 'wish-trhrttgh',
        percentage: 12,
        order: 2,
      },
      {
        value: 1300,
        color: dashboardColors.success,
        highlight: colorHelper.shade(dashboardColors.success, 15),
        label: 'amzon-tgmrmtgh',
        percentage: 16,
        order: 0,
      },
      {
        value: 900,
        color: dashboardColors.white,
        highlight: colorHelper.shade(dashboardColors.white, 15),
        label: 'wish-asdfas',
        percentage: 7,
        order: 1,
      }, {
        value: 700,
        color: dashboardColors.gossip,
        highlight: colorHelper.shade(dashboardColors.gossip, 15),
        label: 'amzon-rfgrf',
        percentage: 14,
        order: 4,
      }, {
        value: 500,
        color: dashboardColors.silverTree,
        highlight: colorHelper.shade(dashboardColors.silverTree, 15),
        label: 'smt-agrgerd',
        percentage: 19,
        order: 3,
      }, {
        value:650,
        color: dashboardColors.surfieGreen,
        highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
        label: 'wish-trhrttgh',
        percentage: 2,
        order: 2,
      },
      {
        value: 300,
        color: dashboardColors.success,
        highlight: colorHelper.shade(dashboardColors.success, 15),
        label: 'amzon-tgmrmtgh',
        percentage: 6,
        order: 0,
      },
    ];
  }
}
