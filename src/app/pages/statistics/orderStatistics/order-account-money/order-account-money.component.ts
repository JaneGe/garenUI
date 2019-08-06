import {Component, Input, OnInit} from '@angular/core';
import {TabelChartService} from "../tabelChart.service";
import {findBigSmallvalue} from '../../function'
import * as theme from '../../chart.theme';
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
import {JwtService} from "../../../../shared/services/jwt.service";
import {DetailMoneyStatisticsComponent} from "../modals/detail-money-statistics/detailMoneyStatistics.component";
import {environment} from "../../../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

var Highcharts = require('highcharts');



@Component({
  selector: 'app-order-account-money',
  templateUrl: './order-account-money.component.html',
  styleUrls: ['../../public.scss','../order-head/order-head.component.scss','../order-money/order-money.component.scss'],
  providers: [TabelChartService,JwtService]
})
export class OrderAccountMoneyComponent extends AuthorityComponent implements OnInit {
  linemoneyData: any = [];
  backmoneyinfo: any = [];
  title = "7天订单金额走势";
  toggle = true;
  PageInfo = {pageSize: 100, pageIndex: 1, totalCount: 2};
  biggestmoneyindex = [];
  smallestmoneyindex = [];

  @Input()
  selectedplateForm: any;
  @Input()
  selectedordertimesearch: any = 1;
  @Input()
  selectedorder: any = 1;

  @Input()
  selectedcountry: string = '全部';
  @Input()
  rangeTimes: any = {};

  selectedAccounts: any[] = [{ChannelId:-1,ChannelName:'全部'}];
  accountList: any[] = [];
  isShowAccount: boolean = false;
  aLLAccountDescList: any[] = [];

  types = {type: 'num', des: 'allnum'};
  linenumData: any = [];
  numtitle = "7天订单数量走势";
  moneytitle = "7天订单金额走势";
  ordernuminfo: any = [];
  totalSumData = {totalAmount: 0, totalNumber: 0};

  constructor(private tabelChartService: TabelChartService, public activerouter: ActivatedRoute,
              public router: Router,public jwtService: JwtService,
              private modalService: NgbModal) {
    super(activerouter, router);
    this.linemoneyData = this.tabelChartService.InSevenDayMoney;
    this.linenumData = this.tabelChartService.InSevenDayNum;
    this.linemoneyData = this.tabelChartService.InSevenDayMoney;
    this.ordernuminfo = this.tabelChartService.ordernuminfo;
  }

  ngOnInit() {
    this.OnQuery();
  }

  getchildChangePlateForm(val: any) {
    this.selectedplateForm = val;
    this.OnQuery();
  }

  getchildChangeOrdertimeSearch(val: any) {
    this.selectedordertimesearch = val;
    this.OnQuery();
  }

  getchildSelectOrder(val: any) {
    this.selectedorder = val;
    if (this.selectedorder != 5) {
      this.OnQuery();
    }
  }

  getchildChangeAccounts(val: any) {
    this.selectedAccounts = val;
    this.OnQuery();
  }

  getchildChangeCountry(val: any) {
    this.selectedcountry = val;
    this.OnQuery();
  }

  getchildOnchangeTime(val: { beginTime: any, endTime: any, directly: boolean }) {
    this.rangeTimes = {beginTime: val.beginTime, endTime: val.endTime};
    if (val.directly) {
      this.OnQuery();
    }
  }

  toggleBar(val: any) {
    if (val) {
      this.toggle = true;
    }
    else {
      this.toggle = false;
    }
  }

  topage() {

  }

  tolast() {

  }

  pageChanged(pn) {
    console.log(pn);
    this.PageInfo.pageIndex = pn;
    this.OnQuery(pn);
  }

  OnQuery(pageNumber: number = 1) {
    if(this.selectedAccounts.length>0) {
      this.isShowAccount=true;
      for (let i = 0; i < this.selectedAccounts.length; i++) {
        if (this.selectedAccounts[i].ChannelId == -1) {
          this.isShowAccount = false;
          break;
        }
      }
    }
    console.log(this.accountList);

    const param = {
      ChannelType: this.selectedplateForm,
      TimeSearchType: this.selectedordertimesearch,
      TimeSpanEnum: this.selectedorder,
      BeginTime: this.rangeTimes.beginTime,
      EndTime: this.rangeTimes.endTime,
      // ChannelIds: this.selectedAccount.ChannelId,
      // ChannelName: this.selectedAccount.ChannelName,
      Country: this.selectedcountry,
      PageIndex: pageNumber - 1,
      PageSize: this.PageInfo.pageSize,
      SelectedAccounts: this.selectedAccounts
    };
    console.log(param);
    this.tabelChartService.GetOrderAccountMoneyStatisticQuery(param).subscribe(data => {

      this.totalSumData.totalAmount = data.content.totalAmount;
      this.totalSumData.totalNumber = data.content.totalNumber;
      this.backmoneyinfo = data.content.totaList.items;
      this.PageInfo = data.content.totaList.pageInfo;
      this.PageInfo.pageIndex++;

      this.aLLAccountDescList=data.content.allAccountDesc;
      console.log(this.aLLAccountDescList);
      const dateRange = data.content.dateRange;
      this.numtitle = "账号订单数量走势";
      this.moneytitle = "账号订单金额走势";
      this.initNumChart(this.backmoneyinfo, this.numtitle);
      this.initMoneyChart(this.backmoneyinfo, this.moneytitle);
    }, this.handleError);
    // this.backmoneyinfo=this.tabelChartService.backmoneyinfo;
    // this.PageInfo.totalCount=this.backmoneyinfo.length;
    // let moneyindex=findBigSmallvalue(this.backmoneyinfo,'money');
    // this.biggestmoneyindex=moneyindex.biggestindex;
    // this.smallestmoneyindex=moneyindex.smallestindex;
  }

  doExport(){
    const token = this.jwtService.getToken();
    const urlParams = {
      token: token.toString(),
      ChannelType: this.selectedplateForm,
      TimeSearchType: this.selectedordertimesearch,
      TimeSpanEnum: this.selectedorder,
      BeginTime: this.rangeTimes.beginTime,
      EndTime: this.rangeTimes.endTime,
      Country: this.selectedcountry,
      PageIndex: this.PageInfo.pageIndex,
      PageSize: this.PageInfo.pageSize,
      SelectedAccountJsons: JSON.stringify(this.selectedAccounts)
    };
    let params = new URLSearchParams();
    for (let key in urlParams) {
      if (!urlParams[key]) {
        params.set(key, '')
      }
      else {
        params.set(key, urlParams[key])
      }
    }

    var urlPre= `${environment.api_url}/api/v1/orderstatistics/QueryForOrderPriceExport`;
    let url = [urlPre, params.toString()].join('?');

    let win = window.open(url);
    win.focus();
    // let params = new URLSearchParams();
    // const token = this.jwtService.getToken();
    // params.set('token', token.toString());
    // params.set('ChannelType',this.selectedplateForm);
    // params.set('TimeSearchType',this.selectedordertimesearch);
    // params.set('TimeSpanEnum',this.selectedorder);
    // params.set('BeginTime',this.rangeTimes.beginTime);
    // params.set('EndTime',this.rangeTimes.endTime);
    // params.set('Country',this.selectedcountry);
    // params.set('PageIndex',this.PageInfo.pageIndex.toString());
    // params.set('PageSize',this.PageInfo.pageSize.toString());
    // params.set('SelectedAccounts',this.selectedAccounts);
  }
  initNumChart(list: any, title: any) {
    Highcharts.theme = {};
    var options = {
      chart: {type: 'spline'},
      title: {text: `${title}`},
      xAxis: {type: 'datetime', xDateFormat: '%m-%d', categories: []},
      yAxis: {
        title: {text: this.types.type.toUpperCase()},
      },
      series: [{name: '', data: [], color: '#fff'}]
    };
    let num: string[] = [];
    let numdate: string[] = [];
    for (var i = 0; i < list.length; i++) {
      num.push(list[i].orderCount);
      numdate.push(list[i].channelName);
    }
    options.series[0].data = num;
    options.series[0].name = '订单数量';
    options.xAxis.categories = numdate;
    Highcharts.setOptions(theme.getLineChartTheme());
    Highcharts.chart('orderbacknumcontainer', options);
  }

  initMoneyChart(list: any, title: any) {
    Highcharts.theme = {};
    var options = {
      chart: {type: 'spline'},
      title: {text: `${title}`},
      xAxis: {type: 'datetime', xDateFormat: '%m-%d', categories: []},
      yAxis: {
        title: {text: '金额'},
        labels: {
          formatter: function () {
            return this.value + ' ' + '$';
          }
        }
      },
      series: [{name: '', data: [], color: '#fff'}]
    };
    let money: string[] = [];
    let moneydate: string[] = [];
    for (var i = 0; i < list.length; i++) {
      money.push(list[i].totalAmount);
      moneydate.push(list[i].channelName);
    }
    options.series[0].data = money;
    options.series[0].name = '订单金额';
    options.xAxis.categories = moneydate;
    Highcharts.setOptions(theme.getLineChartTheme());
    Highcharts.chart('ordermoneycontainer', options);
  }

  openMoneySatisticsModal() {
    let modal = this.modalService.open(DetailMoneyStatisticsComponent, {backdrop: 'static', size: 'sm'});
    modal.componentInstance.aLLAccountDescList= this.aLLAccountDescList;

    modal.result.then(reslut => {
    }, rej => {
    });
  }
}

