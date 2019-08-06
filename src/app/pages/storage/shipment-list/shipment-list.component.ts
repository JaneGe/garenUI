import { Component, OnInit } from '@angular/core';
import { CommonOptionModel } from '../../../shared/services/site-const';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import {PacakgeShipmentService} from "../../../shared/services/pacakge-shipment-service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../shared/component/authority.component";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss'],
  providers: [ PacakgeShipmentService]
})
export class ShipmentListComponent extends AuthorityComponent implements OnInit {
  ngTimeSearchStart: any = {};
  ngTimeSearchEnd: any = {};
  ngShortTimeStart: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  ngShortTimeEnd: NgbTimeStruct = {hour: 0, minute: 0, second: 0};

  timeSearchStart:string='';

  timeSearchEnd:string='';
  searchText:string='';
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  suppprtTaskSearchTypes: CommonOptionModel[] = [{ text: '任务号（袋号）', value: 'PackageNumber' }, { text: '操作人', value: 'CreateUser' }];

  suppprtTaskStatuses: CommonOptionModel[] = [{ text: '全部', value: null },{ text: '进行中', value: 'Inprogress' }, { text: '已完成', value: 'Completed' }];
  suppprtTaskTimeValueTypes: CommonOptionModel[] = [{ text: '全部', value: 'All' },
  { text: '今天', value: 'Today' }, { text: '昨天', value: 'Yesterday' }, { text: '7天以内', value: 'SevenDay' },
  { text: '30天以内', value: 'ThreeDays' }, { text: '自定义', value: 'UseSet' }];
  selectedTimeValueType: string;

  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  selectedTimeFiltType: string = 'CreatedTime';
  selectSearchType: string = 'PackageNumber';

  selectStatus:string;

  constructor(private pacakgeShipmentService: PacakgeShipmentService, public activerouter: ActivatedRoute, public router: Router)
  {
    super(activerouter, router);
  }

  ngOnInit() {
  this.loadData();
  }

  data = [
  ]

  onSelectTimeSearchType(timeSearchType: string) {
    this.selectedTimeFiltType = timeSearchType;
    if (this.selectedTimeValueType != null && this.selectedTimeValueType.length > 0) {
      this.loadData();
    }
  }

  onSelectTimeValueType(timeValue: string) {
    this.selectedTimeValueType = timeValue;
    if (timeValue != 'Custom') {
      this.loadData();
    } else {
      this.dateTransition();
    }
  }

  printPocketPdf(pocketId:any){
    let url = `${environment.api_url}/shipping-label/${pocketId}/pocket-ticket`;
    this.printPDF(url);
  }

  printPDF(url: string) {
    const featrure = "toolbar=yes, location=yes, directories=no, " +
      "status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=600, height=600";
    let newWin = window.open(url, "_blank", featrure);
  }

  onSelectSearchType(type: string) {
    this.selectSearchType = type;
  }

  onSelectStatus(type: string) {
    this.selectStatus= type;
    this.loadData();
  }

  dateTransition() {
    if (this.ngTimeSearchStart.year&&this.ngShortTimeStart) {
      this.timeSearchStart=this.ngTimeSearchStart.year+'-'+this.ngTimeSearchStart.month+'-'+this.ngTimeSearchStart.day+' '+
        this.ngShortTimeStart.hour+':'+this.ngShortTimeStart.minute+':'+this.ngShortTimeStart.second;

    }else{
      this.timeSearchStart='';
    }
    if (this.ngTimeSearchEnd.year&&this.ngShortTimeEnd) {
      this.timeSearchEnd = this.ngTimeSearchEnd.year+'-'+this.ngTimeSearchEnd.month+'-'+this.ngTimeSearchEnd.day+' '+
        this.ngShortTimeEnd.hour+':'+this.ngShortTimeEnd.minute+':'+this.ngShortTimeEnd.second;
    }else{
      this.timeSearchEnd='';
    }
  }

  doTimeSearch() {
    this.dateTransition();
    if (this.timeSearchStart == null || this.timeSearchStart.length < 1) {
      this.error("开始时间不能为空")
      return;
    }
    if (this.timeSearchEnd == null || this.timeSearchEnd.length < 1) {
      this.error("结束时间不能为空");
      return;
    }
    this.loadData();
  }

  pageChanged(pN: number): void {
    this.loadData(pN);
  }
  loadData(pageNumber: number = 1) {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const param={
      TimeSpan:this.selectedTimeValueType,
      BeginTime:this.timeSearchStart,
      EndTime:this.timeSearchEnd,
      SearchType:this.selectSearchType,
      CompleteType:this.selectStatus,
      SearchText:this.searchText,
      PageIndex:pageIndex,
      PageSize:this.PageInfo.pageSize
    };

    this.pacakgeShipmentService.packagePocketQuery(param)
      .subscribe(data => {
        const pageData = data.content;
        this.data = pageData.items;
        this.PageInfo = data.content.pageInfo;
        this.PageInfo.pageIndex++;
      }, this.handleError);
  }
}
