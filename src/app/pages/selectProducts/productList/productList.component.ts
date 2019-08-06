import {Component, OnInit} from "@angular/core";
import {NgbModal, NgbModalModule, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {ProductEditComponent} from "../modals/productEdit/productEdit.component";
import {Select2OptionData} from "ng2-select2";

@Component({
  selector: 'app-productList',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.scss','../style.scss'],
})
export class ProductListComponent implements OnInit{
  status=[{id:1,text:'全部'},{id:2,text:'已审核'},{id:3,text:'未审核'}];
  searchParam={WarehouseId:null,PageIndex:null,PageSize:null};
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  selectProductIds: number[] = [];
  info: Array<any> = [];
  Data: Array<any> = [
    {
    id:1,picture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1410690053,1513032913&fm=27&gp=0.jpg',
    sourceLink:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1410690053,1513032913&fm=27&gp=0.jpg',
    title:'防盗贴身挂脖护照包 旅行收纳包斜挂单肩包 多功能证件袋护照夹',
    des:'图案:字母 里料质地:防RFID穿透布料\n' +
    '        货源类别:现货 颜色:紫色,黑色,红色,天蓝色,铁灰色 产品类别:护照夹、证件夹\n' +
    '        是否库存:是 型号:YT1 加工方式:软面 是否跨境货源:是\n' +
    '        是否支持分销:支持分销 材质:尼龙 流行元素:车缝线 长短:中长款 货号:YT1\n' +
    '        品牌:tingofine 主要下游平台:独立站,速卖通,wish,亚马逊,ebay,LAZADA\n' +
    '        有可授权的自有品牌:是 适用性别:中性/男女均可 库存类型:整单 钱夹折数:1折\n' +
    '        系列:护照包 硬度:中 箱包形状:竖款方型 尺寸:高21*宽16CM 开盖方式:包盖式\n' +
    '        包内部结构:手机袋,夹层拉链袋,证',
      price:4.11,status:'已审核',createdTime:new Date(2018,3,22,16,10)
    }
  ];
  allAccount: Array<Select2OptionData>=[
    {id:'1',text:'test1'},
    {id:'2',text:'test2'},
    {id:'3',text:'test3'},
  ];
  selectedAccont:Select2OptionData;
  isCheckAllPages:boolean=false;
  selectedTimeValueType: string;

  ngTimeSearchStart: any = {};
  ngTimeSearchEnd: any = {};
  ngShortTimeStart: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  ngShortTimeEnd: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  timeSearchStart:string='';
  timeSearchEnd:string='';

  suppprtTimeValueTypes= [{ text: '全部', value: null },
    { text: '今天', value: 'Today' }, { text: '昨天', value: 'Yesterday' }, { text: '7天以内', value: 'Within7Days' },
    { text: '30天以内', value: 'Within30Days' }, { text: '自定义', value: 'Custom' }];
  constructor(private modalService:NgbModal){}
  ngOnInit(){}
  onSelect($event, type, value) {
    switch (type) {
      case "warehouse":
        this.searchParam.WarehouseId = value;
        break;
    }
  }
  onChangeAccount(data: any) {
    console.log(data);
    this.selectedAccont = data.value;
    this.onQuery();
  }
  onSelectTimeValueType(timeValue: string) {
    this.selectedTimeValueType = timeValue;
    //this.ClearBatchSearchText();
    if (timeValue != 'Custom') {
      this.onQuery();
    } if (timeValue === 'Custom') {
      this.dateTransition();
    }
  }
  onQuery(pageNumber: number = 1) {
    this.searchParam.PageIndex = pageNumber - 1;
    this.searchParam.PageSize = this.PageInfo.pageSize;
  }
  pageChanged(pN: number): void {
    this.onQuery(pN);
  }
  onCheckAllPackageChanged(checked: boolean) {
    if (checked) {
      this.selectProductIds = [];
      for (let o of this.info) {
        this.selectProductIds.push(o.id);
      }
    }
    else {
      this.selectProductIds = [];
      this.isCheckAllPages = false;
    }
  }
  onCheckPackageChanged(isChecked: boolean, Id: number) {

    if (isChecked) {
      const orderIndex = this.selectProductIds.indexOf(Id);
      if (orderIndex >= 0) {
        return;
      }
      else {
        this.selectProductIds.push(Id);
      }
    }
    else {
      const orderIndex = this.selectProductIds.indexOf(Id);
      if (orderIndex >= 0) {
        this.selectProductIds.splice(orderIndex, 1);
      }
      this.isCheckAllPages = false;
    }
  }
  DoEdit(){
    let modal=this.modalService.open(ProductEditComponent,{backdrop:'static'});
    modal.result.then(result=>{},reject=>{});
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
}
