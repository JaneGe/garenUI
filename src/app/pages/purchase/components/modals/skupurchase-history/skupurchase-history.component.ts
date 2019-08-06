import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-skupurchase-history',
  templateUrl: './skupurchase-history.component.html',
  styleUrls: ['../modal-public.scss', './skupurchase-history.component.scss']
})
export class SkupurchaseHistoryComponent implements OnInit {
  node: any;
  modalHeader:string='';

  detail: Array<any> = [{ skuName: '', skuCode: '', unitPrice: null, Num: null }];
  searchTypes = [
    { Id: 0, Name: '供应商' },
    { Id: 1, Name: '销单人员' },
    { Id: 2, Name: '下单人员' },
  ];
  skuPurchaseHistory = [
    {
      sipplierName: '北京永外天阳文具商贸中心', purchasePrice: 100, freight: 5, purchaseTime: '2017/11/1 下午13:50:20',
      saleMan: '张三', purchaseMan: '张四', Num: 20, purchaseCSTime: '7天', checkCSTime: '43分钟', instockCSTime: '30分钟'
    },
    {
      sipplierName: '北京永外天阳文具商贸中心', purchasePrice: 100, freight: 5, purchaseTime: '2017/11/1 下午13:50:20',
      saleMan: '李四', purchaseMan: '李五', Num: 20, purchaseCSTime: '8天', checkCSTime: '22分钟', instockCSTime: '16分钟'
    },
    {
      sipplierName: '北京永外天阳文具商贸中心', purchasePrice: 100, freight: 5, purchaseTime: '2017/11/1 下午13:50:20',
      saleMan: '李四', purchaseMan: '李五', Num: 20, purchaseCSTime: '8天', checkCSTime: '22分钟', instockCSTime: '16分钟'
    },
    {
      sipplierName: '北京永外天阳文具商贸中心', purchasePrice: 100, freight: 5, purchaseTime: '2017/11/1 下午13:50:20',
      saleMan: '李四', purchaseMan: '李五', Num: 20, purchaseCSTime: '8天', checkCSTime: '22分钟', instockCSTime: '16分钟'
    },
    {
      sipplierName: '北京永外天阳文具商贸中心', purchasePrice: 100, freight: 5, purchaseTime: '2017/11/1 下午13:50:20',
      saleMan: '李四', purchaseMan: '李五', Num: 20, purchaseCSTime: '8天', checkCSTime: '22分钟', instockCSTime: '16分钟'
    },
    {
      sipplierName: '北京永外天阳文具商贸中心', purchasePrice: 100, freight: 5, purchaseTime: '2017/11/1 下午13:50:20',
      saleMan: '李四', purchaseMan: '李五', Num: 20, purchaseCSTime: '8天', checkCSTime: '22分钟', instockCSTime: '16分钟'
    },
  ];
  skuCodes: any;
  selectValue: string = '';
  selectedSkuName = '';
  pageSize: number = 10;
  totalCount: number = 1;
  pageIndex: number = 1;
  pageSize2: number = 2;
  totalCount2: number = 1;
  pageIndex2: number = 1;
  checkedValue = '';
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    //this.selectedSkuName = this.detail[0].skuName;
    this.node = document.getElementById("form").parentNode.parentNode;
    this.node.style.cssText += 'width:1200px;left:50%;margin-left:-550px;';
    this.loadData();
    this.loadData2();

    //this.skuCodes = Array<any>(this.detail.length);
    /* for (let i = 0; i < this.skuCodes.length; i++) {
      this.skuCodes[i] = { id: i, text: this.detail[i].skuCode }
    }
    this.checkedValue = this.skuCodes[0].text; */
  }
  loadData(pageIndex: number = 1) {
    this.pageIndex = pageIndex;
    //this.totalCount = this.detail.length;
  }
  pageChanged(pn: any) {
    this.loadData(pn)
  }
  loadData2(pageIndex: number = 1) {
    this.pageIndex2 = pageIndex;
    this.totalCount2 = this.skuPurchaseHistory.length;
  }
  pageChanged2(pn: any) {
    this.loadData2(pn)
  }
  closeModal() {
    this.activeModal.close();
  }
  onChangeCountryChanged(data: { value: string }) {
    this.selectValue = data.value;
    // console.log(this.selectValue);
    // console.log(this.skuCodes[this.selectValue].text);
    this.checkedValue = this.skuCodes[this.selectValue].text;
    // $("#"+this.checkedValue).attr('checked','true');
  }

  onSelect($event, type, value) {
    console.log($event.innerText);
  }
}
