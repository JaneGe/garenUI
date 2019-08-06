import {Injectable} from "@angular/core";
import {BaThemeConfigProvider} from "../../../theme/theme.configProvider";
import {colorHelper} from "../../../theme/theme.constants";

@Injectable()
export class BossDataService{
  constructor(private _baConfig:BaThemeConfigProvider){}
  getGroupName=function () {
    let name:String='';
    for(var i=0;i<5;i++){
      name+=String.fromCharCode((Math.random()*(122-97+1)+97));
    }
    return name;
  }
  getNum=function () {
    return Number((Math.random()*500).toFixed(0));
  }
  storageWork=[{getPackage:this.getNum(),openPackage:this.getNum(),pickPackage:this.getNum(),
    pickUp:this.getNum(),weighPackage:this.getNum()},{updateTime:new Date().toLocaleString()}];
  pickUp=[
    {name:this.getGroupName(),singleS:this.getNum(),singleM:this.getNum(),Multiple:this.getNum(),special:this.getNum()},
    {name:this.getGroupName(),singleS:this.getNum(),singleM:this.getNum(),Multiple:this.getNum(),special:this.getNum()},
    {name:this.getGroupName(),singleS:this.getNum(),singleM:this.getNum(),Multiple:this.getNum(),special:this.getNum()},
    {name:this.getGroupName(),singleS:this.getNum(),singleM:this.getNum(),Multiple:this.getNum(),special:this.getNum()},
    {name:this.getGroupName(),singleS:this.getNum(),singleM:this.getNum(),Multiple:this.getNum(),special:this.getNum()},
    {name:this.getGroupName(),singleS:this.getNum(),singleM:this.getNum(),Multiple:this.getNum(),special:this.getNum()},
    {name:this.getGroupName(),singleS:this.getNum(),singleM:this.getNum(),Multiple:this.getNum(),special:this.getNum()},
    {name:this.getGroupName(),singleS:this.getNum(),singleM:this.getNum(),Multiple:this.getNum(),special:this.getNum()},
    {name:this.getGroupName(),singleS:this.getNum(),singleM:this.getNum(),Multiple:this.getNum(),special:this.getNum()},
  ];
  storagePeopleData=[
    {name:this.getGroupName(),num:this.getNum()}, {name:this.getGroupName(),num:this.getNum()},
    {name:this.getGroupName(),num:this.getNum()}, {name:this.getGroupName(),num:this.getNum()},
    {name:this.getGroupName(),num:this.getNum()}, {name:this.getGroupName(),num:this.getNum()},
    {name:this.getGroupName(),num:this.getNum()}, {name:this.getGroupName(),num:this.getNum()},
    {name:this.getGroupName(),num:this.getNum()}, {name:this.getGroupName(),num:this.getNum()},
  ];
  noStockOrder=[
    {day:'three',orderNum:1},{day:'four',orderNum:2},
    {day:'five',orderNum:3},{day:'six',orderNum:4},
    {day:'seven',orderNum:5},{day:'sevenMore',orderNum:6},
  ];
  loseMoneyOrder=[{totalMoney:2000,totalOrder:100,skuNum:66,updateTime:'2017/10/6 15:31'}];
  yesterdayAchievement=[{totalOrders:5000,totalMoney:20000,updateTime:'2017/9/18 18:30'}];
  purchaseSummary=[{totalCost:15000,totalQulity:20000,solved:200,unsolved:500},{todayQulity:25000,todaysolved:300,todayunsolved:600,updateTime:'2017/9/18 18:30'}];
  deliverySummary=[{pickPackage:100},{alreadyDelivery:200},{purchaseTotal:300},{openPackage:350}
  ,{inStorageNum:400},{updateTime:'2017/9/18 15:00'}];
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
    {date:'2017/9/17',order:15},
    {date:'2017/9/18',order:9},
    {date:'2017/9/19',order:25},
    {date:'2017/9/20',order:13},
    {date:'2017/9/21',order:30},
    {date:'2017/9/22',order:18},
  ];
  GroupData=[{group:'A',profit:2000,orders:500,money:4000},{group:'B',profit:500,orders:100,money:2500},
    {group:'C',profit:1500,orders:300,money:3500},{updateTime:'2017/9/19 8:00'}];
  countryOrders=[{country:'UK',order:150,money:2000},{country:'Italy',order:100,money:1500},{country:'Germany',order:350,money:1200},{country:'French',order:80,money:1000},
    {country:'Spain',order:120,money:1300},{country:'USA',order:160,money:800},{country:'other',order:0,money:0},
    {updateTime:'2017/9/18 15:00'}];
  getCalndarData() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2017-09-01',
      selectable: true,
      editable: true,
      eventLimit: true,
      events: [
        {
          title: 'Amazon:20单',
          start: '2017-09-16',
          color: dashboardColors.silverTree
        },
        {
          title: 'Wish:20单',
          start: '2017-09-16',
          color: dashboardColors.gossip
        },
        {
          title: 'Cdiscount:20单',
          start: '2017-09-16',
          color: dashboardColors.gossip
        },
        {
          title: '速卖通:20单',
          start: '2017-09-16',
          color: dashboardColors.gossip
        },
        {
          title: 'Lazada:20单',
          start: '2017-09-16',
          color: dashboardColors.gossip
        },
      ]
    };
  }
  getChannelData(){
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
        value: 700,
        color: dashboardColors.white,
        highlight: colorHelper.shade(dashboardColors.white, 15),
        label: 'ebay',
        percentage: 87,
        money:2000,
        order: 1,
      }, {
        value: 700,
        color: dashboardColors.gossip,
        highlight: colorHelper.shade(dashboardColors.gossip, 15),
        label: 'Amazon',
        percentage: 22,
        money:2500,
        order: 4,
      }, {
        value: 600,
        color: dashboardColors.silverTree,
        highlight: colorHelper.shade(dashboardColors.silverTree, 15),
        label: '速卖通',
        percentage: 70,
        money:3000,
        order: 3,
      }, {
        value: 600,
        color: dashboardColors.surfieGreen,
        highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
        label: 'Wish',
        percentage: 38,
        money:4000,
        order: 2,
      },
      {
        value: 600,
        color: dashboardColors.success,
        highlight: colorHelper.shade(dashboardColors.success, 15),
        label: '手工订单',
        percentage: 17,
        money:5000,
        order: 0,
      },
      {
        value: 600,
        color: dashboardColors.warning,
        highlight: colorHelper.shade(dashboardColors.warning, 15),
        label: 'Cdiscount',
        percentage: 17,
        money:10000,
        order: 0,
      },
    ];
  }
}
