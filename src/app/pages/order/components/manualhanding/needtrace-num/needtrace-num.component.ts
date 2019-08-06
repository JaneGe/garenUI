import {Component, Input, OnInit} from '@angular/core';
import {LogisticsService} from "./logistics.service";
import * as publicFunction from '../../../../../shared/publicFunction/publicFunction';
import {ShippingMethodService} from "../../../../../shared/services/shipping-method-service";
import {WarehouseService} from "../../../../../shared/services/warehouse-service";
import {RootComponent} from "../../../../../shared/component/root.component";
import {PackageListModel} from "../../../../../shared/models/Package/package-list-model";
import {PackageService} from "../../../../../shared/services/package-search-service";
import {NgbModal, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {AddRecordComponent} from "./add-record/add-record.component";
import {OrderExceptionService} from "../../../../../shared/services/orderException-service";
import {PackageModalComponent} from "../../modals/packageModal/packageModal.component";
import {OrderDetailModalComponent} from "../../modals/order-detail-modal/order-detail-modal.component";
import {OrderManualService} from "../../../../orderManual.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../../../shared/component/authority.component";
import {SiteConst} from "../../../../../shared/services/site-const";
import {Select2OptionData} from "ng2-select2";
import {environment} from "../../../../../../environments/environment";
import {JwtService} from "../../../../../shared/services/jwt.service";
import {URLSearchParams} from "@angular/http"
import {AutoAllocateComponent} from "../modals/auto-allocate/auto-allocate.component";

class SelectOptionModel {
  value: string;
  name: string;
}
export class CommonOptionModel {
  text: string;
  value: any;
}
@Component({
  selector: 'app-needtrace-num',
  templateUrl: './needtrace-num.component.html',
  styleUrls: ['../../../style.scss','./needtrace-num.component.scss'],
  providers:[LogisticsService,ShippingMethodService,WarehouseService,PackageService,OrderExceptionService,JwtService]
})
export class NeedtraceNumComponent extends AuthorityComponent implements OnInit {
  logistics:Array<any>;
  tabChanged:boolean = true;
  searchMore=0;
  sm=0;

  select2Options: Select2Options = {
    multiple: true
  };
  defaultAccountVal = '-1';
  value:any;
  selectTrackNumberType: string;
  selectShippingServiceId: number;
  selectedWarehouseId: number;
  selectedPlateformId: number;
  warehouseAllShippingService;
  allWarehouses;
  selectedTimeValueType: string;
  timeSearchStart: string;
  timeSearchEnd: string;
  isCheckAllPages: boolean = false;


  TrackNumberTypes: CommonOptionModel[] = [{text: '全部', value: null},
    {text: 'API获取 ', value: 'Api'},
    {text: '录入/导入', value: 'EntryOrImport'}
  ];


  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;
  @Input()
  items: PackageListModel[] = [];
  batchsearchType: string = 'OrderNumber';
  batchsearchText: string;
  searchText: string;
  searchType: string = 'ByOrderNumber';
  dataNumber: number = 1;

  selectPackageIds: number[] = [];



  //-------------------
  accountItems: Array<Select2OptionData> = [{id:'-1',text:'全部'}];
  selectChannelIds: any[] = [];
  selectCountryCode: string;
  supportFilterCountries: CommonOptionModel[] = [];
  suppprtSearchTimeTypes: CommonOptionModel[] = [
    { text: '创建时间', value: 'CreatedTime' },
    { text: '付款时间', value: 'PayTime' },
  ];
  orderBatchsearchType: string = 'ByOrderNumber';
  orderBatchsearchText: string;
  selectedTimeFiltType: string = 'CreatedTime';
  suppprtTimeValueTypes: CommonOptionModel[] = [
    { text: '全部', value: null },
    { text: '今天', value: 'Today' },
    { text: '昨天', value: 'Yesterday' },
    { text: '7天以内', value: 'Within7Days' },
    { text: '30天以内', value: 'Within30Days' },
    { text: '自定义', value: 'Custom' }
  ];
  ngTimeSearchStart: any = {};
  ngTimeSearchEnd: any = {};
  ngShortTimeStart: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  ngShortTimeEnd: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  selectSearchType: string = 'ByOrderNumber';
  suppprtSearchTypes: CommonOptionModel[] = [
    { text: '订单号', value: 'ByOrderNumber' },
    { text: '买家账号', value: 'BuyerAccount' },
    { text: '买家姓名', value: 'ByName' },
    { text: '邮编', value: 'ByPostcode' },
    { text: 'Sku', value: 'BySkuCode' },
  ];
  plateForm:Array<any> = [{ id:null, text: '全部' },{ id:1, text: 'Amazon' },{ id:2, text: 'AliExpress' },{ id:3, text: 'Wish' },{ id: 0, text: '手工订单' }];
  selectedAccounts = [];
  constructor(private LogisticsService:LogisticsService,
              private shippingMethodService: ShippingMethodService,
              private warehouseService: WarehouseService,
              private modalService: NgbModal,
              private packageSearchService: PackageService,
              private ModalService:NgbModal,
              private  orderExceptionService: OrderExceptionService,
              private orderManualService:OrderManualService,
              private jwtService: JwtService,
              public activerouter: ActivatedRoute,public router:Router
              ) {
    super(activerouter,router);
    this.logistics=LogisticsService.logistics;

    //---------------
    this.supportFilterCountries = SiteConst.supportFilterCountries.filter(m => m.text != null);
    this.supportFilterCountries.unshift({ text: '全部', value: '' });
  }

  ngOnInit() {

    this.warehouseService.getAllOptions().subscribe(data => {
      this.allWarehouses = data.content;
      this.selectedWarehouseId = this.allWarehouses[0].warehouseId;

      this.shippingMethodService.getWarehouseAllSelectedShippingService(this.selectedWarehouseId).subscribe(data => {
        this.warehouseAllShippingService = data.content;
      });

    });
    this.QueryForChannel();
  }
  pageChanged(pn: any){
  this.loadData(pn);
  }

  QueryForChannel() {
    this.accountItems = [];
    this.orderExceptionService.QueryForChannel(this.selectedPlateformId).subscribe(data => {
      let currentAccounts = [{ id: '-1', text: '全部' }];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.channelId;
        item.text = c.displayName;
        currentAccounts.push(item);
      }
      this.accountItems = currentAccounts;
    }, this.handleError)
  }


  loadData(pageNumber: number = 1) {
    this.orderExceptionService.needTruckNumber(this.selectedWarehouseId,
      this.selectShippingServiceId, this.selectTrackNumberType,this.selectedTimeFiltType,
      this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
      this.searchText, this.selectSearchType,this.selectCountryCode,
      this.selectedAccounts,this.selectedPlateformId, pageNumber, this.pageSize).subscribe(data => {
      this.dataNumber = data.content.items.length;
      this.items = data.content.items;
      let ShippingServiceAll,TrackNumberTypeAll,TimeValueTypeAll;
      ShippingServiceAll=this.selectShippingServiceId==undefined||this.selectShippingServiceId==null;
      TrackNumberTypeAll=this.selectTrackNumberType==undefined||this.selectTrackNumberType==null;
      TimeValueTypeAll=this.selectedTimeValueType==undefined||this.selectedTimeValueType==null;
      //console.log(ShippingServiceAll,TrackNumberTypeAll,TimeValueTypeAll);
      let check=ShippingServiceAll&&TrackNumberTypeAll && TimeValueTypeAll;
      if(check&&this.items.length==0){
        this.orderManualService.sendMessage({ kill:true,errType:'NeedTrcukNumber'});
        console.log('table不存在数据');
      }
      if(check&&this.items.length>0){
        this.orderManualService.sendMessage({ kill:false,errType:'NeedTrcukNumber'});
        console.log('table存在数据');
      }
      const pageInfo = data.content.pageInfo;

      this.pageSize = pageInfo.pageSize;
      this.pageNumber = pageInfo.pageIndex + 1;
      this.total = pageInfo.totalCount;
    }, this.handleError);
  }

  openAddRecordModal(){
    const activeModal=this.ModalService.open(AddRecordComponent,{ size:'lg'});
 //   activeModal.componentInstance.modalHeader='补录跟踪号';
    activeModal.componentInstance.itemsLength=this.items.length;
    activeModal.componentInstance.selectedWarehouseId=this.selectedWarehouseId;

    activeModal.result.then(result=>{
      if(result!=undefined){
        console.log(result);
      }
    });
  }

  onWarehouseSelect(warehouseId: number) {
    this.selectedWarehouseId = warehouseId;
    this.loadData();
  }
  onPlateformSelect(plateform: number) {
    this.selectedPlateformId = plateform;
    this.loadData();
    this.QueryForChannel();
  }
  onSelectShippingService(ssId: number) {
    this.selectShippingServiceId = ssId;
    this.doSearch();
  }

  onTrackNumberTypes(type: string) {
    this.selectTrackNumberType = type;
    this.doSearch();
  }

  onSelectTimeValueType(timeValue: string) {
    this.selectedTimeValueType = timeValue;
    //this.ClearBatchSearchText();
    if (timeValue != 'Custom') {
      this.loadData();
    }
  }

  doTimeSearch() {
    if (this.timeSearchStart == null || this.timeSearchStart.length < 1) {
      this.error("开始时间不能为空")
      return;
    }
    if (this.timeSearchEnd == null || this.timeSearchEnd.length < 1) {
      this.error("结束时间不能为空")
    }
   // this.ClearBatchSearchText();
    this.loadData();
  }
  doSearch() {
    this.loadData();
  }
  reloadData() {
    this.loadData(this.pageNumber);
  }

  onCheclAllPageChange(checked: boolean) {
    if (checked) {
      this.selectPackageIds = [];
      for (let o of this.items) {
        this.selectPackageIds.push(o.id);
      }
      this.isCheckAllPages = true;
    }
    else {
      this.selectPackageIds = [];
      this.isCheckAllPages = false;
    }
  }

  onCheckAllPackageChanged(checked: boolean) {
    if (checked) {
      this.selectPackageIds = [];
      for (let o of this.items) {
        this.selectPackageIds.push(o.id);
      }
    }
    else {
      this.selectPackageIds = [];
      this.isCheckAllPages = false;
    }
  }

  onCheckPackageChanged(isChecked: boolean, orderId: number) {
    if (isChecked) {
      const orderIndex = this.selectPackageIds.indexOf(orderId);
      if (orderIndex >= 0) {
        return;
      }
      else {
        this.selectPackageIds.push(orderId);
      }
    }
    else {
      const orderIndex = this.selectPackageIds.indexOf(orderId);
      if (orderIndex >= 0) {
        this.selectPackageIds.splice(orderIndex, 1);
      }
      this.isCheckAllPages = false;
    }
  }



  openOrderDetailModal(orderId: number) {
    const searchModal = this.modalService.open(OrderDetailModalComponent, {size: 'sm', backdrop: 'static'});
    searchModal.componentInstance.modalHeader = '订单详情';
    searchModal.componentInstance.orderId = orderId;
    searchModal.result.then(result => {
      this.reloadData();
    }, reason => {
    })
  }
  addClass1(target:any){
    publicFunction.toggleSingleClass(target);
    console.log(target.innerHTML);
  }
  // seekmode = 0;
  // seekMode(i) {
  //   this.seekmode = i;
  //   console.log(this.seekmode);
  // }
  SearchMore() {
    if (this.searchMore === 1) {
      this.searchMore = 0;
    } else {
      this.searchMore = 1;
    }
  }
  SM(){
    if (this.sm === 1) {
      this.sm = 0;
    } else {
      this.sm = 1;
    }
  }

  openOutputModal() {
    if (this.selectPackageIds.length == 0) {
      this.error("请选择需要导出的订单");
      return;
    }
      if (this.isCheckAllPages) {
        this.exportAllPackages();
      } else {
        this.exportSelectPackages();
      }
  }

  exportSelectPackages() {
    let params = new URLSearchParams();
    params.set('OrderIds', this.selectPackageIds.join(','));
    const token = this.jwtService.getToken();
    params.set('token', token.toString());
    var urlPre = `${environment.api_url}/api/v1/OrderException/ExportNeedTrcukNumber`;

    let url = [urlPre, params.toString()].join('?');

    /*     let win = window.open(url);
        win.focus();
        win.location.href = url; */

    $('#package-id-text').val(this.selectPackageIds.join(','));

    $('#token-text').val(token.toString());

    $("#out-put").attr("action", urlPre);

    $('#out-put').submit();
  }

  exportAllPackages() {
    const token = this.jwtService.getToken();
    let param={
      pageIndex:'1',
      pageSize:'10000',
      selectedWarehouseId:this.selectedWarehouseId,
      shippingServiceId:this.selectShippingServiceId,
      trackNumberTypes:this.selectTrackNumberType,
      timeValueType:this.selectedTimeValueType,
      orderNeedTimeType:this.selectedTimeFiltType,
      selectedAccounts:this.selectedAccounts.join(','),
      country:this.selectCountryCode,
      channelType:this.selectedPlateformId,
      timeStart:this.timeSearchStart,
      timeEnd:this.timeSearchEnd,
      searchType:this.searchType,
      searchText:this.searchText
    };
    $("#out-put").empty();


    for (let key in param) {
      let paramsInput = $("<input type='hidden'>");
      paramsInput.attr('name', key);
      if(param[key]){
        paramsInput.attr('value', param[key]);
      }else{
        paramsInput.attr('value', '');
      }

      $("#out-put").append(paramsInput);
    }

    var urlPre = `${environment.api_url}/api/v1/OrderException/ExportNeedTrcukNumberAll`;


    /* let win = window.open(url);
    win.focus();
    win.location.href = url; */

    $('#token-text').val(token.toString());

    let tokenText = $("<input type='hidden'>");
    tokenText.attr('name', 'token');
    tokenText.attr('value', token.toString());
    $("#out-put").append(tokenText);

    $("#out-put").attr("action", urlPre);

    $('#out-put').submit();

    $("#out-put").empty();
  }

  onChangeAccountChanged(data: any, el) {
    this.selectedAccounts=[];
    if(data.data&&data.data.length>0){
      if (data.data[0].id == -1) {
        el.setElementValue('-1');
        this.loadData();
        return;
      }
      for(let i=0;i<data.data.length;i++){
        this.selectedAccounts.push(data.data[i].id);
      }
    }
    this.loadData();
  }
  seekmode = 0;
  seekMode(i) {
    this.seekmode = i;
    if (this.seekmode == 0) {
      this.searchText = null;
    }
  }
  onSelectCountry(countryCode: string) {
    this.selectCountryCode = countryCode;
    this.doSearch();
  }
  onSelectTimeSearchType(timeSearchType: string) {
    this.selectedTimeFiltType = timeSearchType;
    // this.ClearBatchSearchText();
    if (this.selectedTimeValueType != null && this.selectedTimeValueType.length > 0) {
      this.loadData();
    }
  }

  ClearBatchSearchText() {
    this.orderBatchsearchText = null;
    this.orderBatchsearchType = null;
  }
  onSelectSearchType(type: string) {
    this.selectSearchType = type;
  }

  ResetOrder(){
    // publicFunction.toggleSingleClass(target);
    this.confirm("确定重置订单?", () => {
      if(this.isCheckAllPages) {
        let opIds=[];
        this.orderExceptionService.needTruckNumber(this.selectedWarehouseId,
          this.selectShippingServiceId, this.selectTrackNumberType,this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
          this.searchText, this.selectSearchType,this.selectCountryCode,
          this.selectedAccounts,this.selectedPlateformId, 0, 2000000).subscribe(data => {
          for(let i=0;i<data.content.items.length;i++){
            opIds.push(data.content.items[i].id);
          }
          this.DoOpeartionForNeedTrackNum('Reset',opIds.join(','));
        }, this.handleError);
      } else {
        if(this.selectPackageIds== null || this.selectPackageIds.length == 0) {
          this.error("请选择操作订单!");
          return;
        }
        this.DoOpeartionForNeedTrackNum('Reset',this.selectPackageIds.join(','));
      }
    })
  }

  VoidedOrder(){
    // publicFunction.toggleSingleClass(target);
    this.confirm("确定作废订单?", () => {
      if(this.isCheckAllPages) {
        let opIds=[];
        this.orderExceptionService.needTruckNumber(this.selectedWarehouseId,
          this.selectShippingServiceId, this.selectTrackNumberType,this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
          this.searchText, this.selectSearchType,this.selectCountryCode,
          this.selectedAccounts,this.selectedPlateformId, 0, 2000000).subscribe(data => {
          for(let i=0;i<data.content.items.length;i++){
            opIds.push(data.content.items[i].id);
          }
          this.DoOpeartionForNeedTrackNum('Voided',opIds.join(','));
        }, this.handleError);
      } else {
        if(this.selectPackageIds== null || this.selectPackageIds.length == 0) {
          this.error("请选择操作订单!");
          return;
        }
        this.DoOpeartionForNeedTrackNum('Voided',this.selectPackageIds.join(','));
      }
    })
  }

  LockOrder(){
    // publicFunction.toggleSingleClass(target);
    this.confirm("确定锁定订单?", () => {
      if(this.isCheckAllPages) {
        let opIds=[];
        this.orderExceptionService.needTruckNumber(this.selectedWarehouseId,
          this.selectShippingServiceId, this.selectTrackNumberType,this.selectedTimeFiltType,
          this.selectedTimeValueType, this.timeSearchStart, this.timeSearchEnd,
          this.searchText, this.selectSearchType,this.selectCountryCode,
          this.selectedAccounts,this.selectedPlateformId, 0, 2000000).subscribe(data => {
          for(let i=0;i<data.content.items.length;i++){
            opIds.push(data.content.items[i].id);
          }
          this.DoOpeartionForNeedTrackNum('Lock',opIds.join(','));
        }, this.handleError);
      } else {
        if(this.selectPackageIds== null || this.selectPackageIds.length == 0) {
          this.error("请选择操作订单!");
          return;
        }
        this.DoOpeartionForNeedTrackNum('Lock',this.selectPackageIds.join(','));
      }
    })
  }

  DoOpeartionForNeedTrackNum(operation:any,orderIds:any){
    this.orderExceptionService.DoOpeartionForNeedTrackNum(operation,orderIds).subscribe(data => {
      this.alertMessage("操作成功!");
     this.loadData();
    }, this.handleError);
  }

}
