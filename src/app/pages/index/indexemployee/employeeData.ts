
import {Injectable} from "@angular/core";
import {BaThemeConfigProvider} from "../../../theme/theme.configProvider";
import {colorHelper} from "../../../theme/theme.constants";

@Injectable()
export class EmployeeData{
  InSevenDayMoney=[
    {date:'2017/9/16',money:20},
    {date:'2017/9/17',money:40},
    {date:'2017/9/18',money:80},
    {date:'2017/9/19',money:120},
    {date:'2017/9/20',money:70},
    {date:'2017/9/21',money:50},
    {date:'2017/9/22',money:30},
  ];
  InSevenDayOrder=[
    {date:'2017/9/16',order:10},
    {date:'2017/9/17',order:11},
    {date:'2017/9/18',order:12},
    {date:'2017/9/19',order:10},
    {date:'2017/9/20',order:11},
    {date:'2017/9/21',order:13},
    {date:'2017/9/22',order:10},
  ];
  Todo=[
    '无对应SKU','有超风险','按规则选出','收货信息不全','需人工分配','需补全报关信息','需跟踪号',
    '缺货订单','需平台审核'
  ];
  getChannelData(){
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
        target:10000,
        value: 0,
        color: dashboardColors.silverTree,
        highlight: colorHelper.shade(dashboardColors.white, 15),
        label: 'target',
        percentage: 87,
        order: 0,
      }
      ,{
        value: 3000,
        color: dashboardColors.success,
        highlight: colorHelper.shade(dashboardColors.success, 15),
        label: 'finished',
        percentage: 10,
        profit:900,
        order: 1,
      },
      {
        value: 0,
        color: dashboardColors.danger,
        highlight: colorHelper.shade(dashboardColors.danger, 15),
        label: 'unfinished',
        percentage: 10,
        order: 2,
      },
    ];
  }
  getData() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2017-10-01',
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      events: [
        {
          title: 'Amazon:20单',
          start: '2017-10-16',
          color: dashboardColors.surfieGreen
        },
        {
          title: 'Amazon:20单',
          start: '2017-10-17',
          color: dashboardColors.surfieGreen
        },
        {
          title: 'Shopee:20单',
          start: '2017-10-17',
          color: dashboardColors.surfieGreen
        },
        {
          title: 'Lazada:20单',
          start: '2017-10-17',
          color: dashboardColors.surfieGreen
        },
        {
          title: 'Wish:20单',
          start: '2017-10-17',
          color: dashboardColors.surfieGreen
        },
        {
          title: '速卖通:20单',
          start: '2017-10-17',
          color: dashboardColors.surfieGreen
        },
      ]
    };
  }
  constructor(private _baConfig:BaThemeConfigProvider){}
}
