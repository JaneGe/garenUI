import { Component, OnInit } from '@angular/core';
import { StockService } from "../quantity-in-stock/stock.service";
import * as publicFunction from '../../../shared/publicFunction/publicFunction';
import { StockOverFlowService } from "./stockOverFlow.service";
import { RootComponent } from "../../../shared/component/root.component";
import { WarehouseFlowModel } from "../../../shared/models/warehouses/warehouse-flow-model";
import {NgbActiveModal, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-storage-flow',
  templateUrl: './storage-flow.component.html',
  styleUrls: ['../public.scss', './storage-flow.component.scss'],
  providers: [StockOverFlowService]
})
export class StorageFlowComponent extends RootComponent implements OnInit {
  ngTimeSearchStart: any = {};
  ngTimeSearchEnd: any = {};
  ngShortTimeStart: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  ngShortTimeEnd: NgbTimeStruct = {hour: 0, minute: 0, second: 0};

  timeSearchStart:string='';

  timeSearchEnd:string='';
  storageData = [];
  timeSelect: string = '全部';
  timeTypeSelect: number = -1;
  searchParam: WarehouseFlowModel;
  Topage: string;
  pageNumber: number;
  storeSearchKey: string = '';
  recordKind = [{ id: 0, text: '仓库初始化' }, { id: 1, text: '入库' },
  { id: 2, text: '出库' }, { id: 3, text: '发货' }, { id: 4, text: '报损' }, { id: 5, text: '报溢' }, { id: 6, text: '包裹生成' },
  { id: 7, text: '包裹回收' }, { id: 8, text: '货架转出' }, { id: 9, text: '货架转入' }, { id: 10, text: '作废出库单' }, { id: 11, text: '订单预分配' },
  { id: 12, text: '订单释放库存' }, { id: 13, text: '锁定库存' }, { id: 14, text: '解除锁定' }, { id: 15, text: '包裹退件入库' }, { id: 16, text: '盘点' }];
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };
  stockOverFlow: Array<any>;
  constructor(private StockService: StockService,
    private StockOverFlowService: StockOverFlowService) {
    super();
    this.storageData = this.StockService.storageData;
  }

  ngOnInit() {
    this.searchParam = new WarehouseFlowModel();
    this.searchParam.searchType = 0;
    this.searchParam.operateKind = -1;
    this.searchParam.timeSearch = 0;
    this.searchParam.wareName = '全部';
    this.searchParam.searchText = '';
    this.searchParam.pageIndex = 0;
    this.searchParam.pageSize = 10;
    this.StockService.GetStorageData().subscribe(data => {
      this.storageData = data.content;
      this.storageData.unshift({ ishasImportant: false, name: "全部", warehouseId: null })
    });
    this.loadData();
  }
  tolast() {
    if (this.PageInfo.totalCount % this.PageInfo.pageSize == 0) {
      this.pageNumber = this.PageInfo.totalCount / this.PageInfo.pageSize;
    }
    else {
      this.pageNumber = this.PageInfo.totalCount / this.PageInfo.pageSize + 1;
    }
    return this.pageNumber;
  }

  topage() {
    var reg = new RegExp("^[0-9]*$");
    console.log(reg.test(this.Topage));
    if (!reg.test(this.Topage)) { alert('只能输入数字！'); }
    else if (this.Topage == '' || parseInt(this.Topage) > this.tolast() || parseInt(this.Topage) == 0) { alert('页数范围不正确！'); this.pageNumber = 1; }
    else { this.pageNumber = parseInt(this.Topage); }
    this.loadData(this.pageNumber);
  }
  addClass1(target: any, type: string, value: any) {
    publicFunction.toggleSingleClass(target);
    var select = target.innerText;
    console.log(target.innerText);

    switch (type) {
      case "recordKind":
        this.searchParam.operateKind = value;
        break;
      case "storageData":
        this.searchParam.wareName = value;
        break;
      case "type":
        this.searchParam.searchType = value;
        break;
    }
    if (select == '全部') {
      this.timeSelect = select;
      this.timeTypeSelect = 0;
    }
    if (select == '今天') {
      this.timeSelect = select;
      this.timeTypeSelect = 1;
    }
    if (select == '昨天') {
      this.timeSelect = select;
      this.timeTypeSelect = 2;
    }
    if (select == '7天以内') {
      this.timeSelect = select;
      this.timeTypeSelect = 3;
    }
    if (select == '30天以内') {
      this.timeSelect = select;
      this.timeTypeSelect = 4;
    }
    if (select == '自定义') {
      this.timeSelect = select;
      this.timeTypeSelect = 5;
    }
    this.searchParam.timeSearch = this.timeTypeSelect;
    this.searchParam.pageIndex = this.PageInfo.pageIndex;
    this.searchParam.pageSize = this.PageInfo.pageSize;
    if (this.timeTypeSelect != 5) {
      this.loadData();
    }
  }
  pageChanged(target: number) {
    this.loadData(target);
  }
  loadData(pageNumber: number = 1) {

    this.searchParam.beginTime = this.timeSearchStart;
    this.searchParam.pageSize = this.PageInfo.pageSize;
    this.searchParam.endTime = this.timeSearchEnd;
    this.searchParam.pageIndex = pageNumber - 1;
    this.searchParam.searchText = this.storeSearchKey;
    this.StockOverFlowService.GetStockOverFlowQuery(this.searchParam).subscribe(data => {
      this.stockOverFlow = data.content.items;
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    });
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
      this.error("结束时间不能为空")
      return;
    }
    this.loadData();
  }
}
