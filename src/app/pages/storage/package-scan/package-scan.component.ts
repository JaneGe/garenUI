import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PrintBillsComponent} from '../modals/printBills/printBills.component';
import {PackageScanService} from "./package-scan.service";
import {PackageCalculateModel, PackingScanModel} from "../../../shared/models/warehouses/package-scan-model";
import {environment} from "../../../../environments/environment";
import {SinglePackagePrintScanModel} from "../../../shared/models/Package/single-package-print-scan-model";
import {PickingService} from "../../../shared/services/picking.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../shared/component/authority.component";
import swal from 'sweetalert2'

@Component({
  selector: 'app-package-scan',
  templateUrl: './package-scan.component.html',
  styleUrls: ['./package-scan.component.scss'],
  providers: [PackageScanService, PickingService]
})

export class PackageScanComponent extends AuthorityComponent implements OnInit {

  warehose = [];
  isLock: boolean = false;
  result: SinglePackagePrintScanModel;
  calculateResult: PackageCalculateModel;
  searchParam: PackingScanModel;
  taskNumber: string;
  storeSearchKey: string;
  printCount:number=0;
  noPrintCount:number=0;
  totalQuantity:number=0;

  search: boolean = false;
  constructor(private packageScanService: PackageScanService,
              private modalService: NgbModal,
              private pickingService: PickingService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }

  ngOnInit() {
    $('.picking-id').focus();
    this.searchParam = new PackingScanModel();

    this.packageScanService.GetStorageData().subscribe(data => {
      this.warehose = data.content;
      if (data.content.length > 0) {
        this.searchParam.WareHouseid = data.content[0].warehouseId;
      }
    });
    $('#pickTaskNum').bind('keydown',e=>{
      if(e.keyCode==13){
        this.PickingEnter();
      }
    });
    $('#skuCode').bind('keydown',e=>{
      if(e.keyCode==13){
        this.SkuEnter();
      }
    })
  }


  OnWarehouseChange($event, id: number) {
    this.searchParam.WareHouseid = id;
  }


  clearPrint(){
    this.printCount=0;
    //this.noPrintCount = this.totalQuantity - this.printCount;
    this.noPrintCount=0;
    this.result=null;
    this.isLock=false;
    this.taskNumber='';
    this.storeSearchKey='';
    this.search=false;
    this.calculateResult = null;
  }
  openModal() {
    const searchModal = this.modalService.open(PrintBillsComponent,
      {size: 'sm', backdrop: 'static'});
  }
  pickTaskNumClick(e){
    $(e).select();
  }
  PickingEnter() {
    if (this.isLock) {
      this.isLock = false;
      $('#lockBtn').text('锁定');
    } else {
      this.packageScanService.CalculatePackageForQuery(this.taskNumber).subscribe(data => {
        this.calculateResult = data.content;
        console.log(this.result);
        this.isLock = true;
        $('#lockBtn').text('解锁');
        $('#skuCode')[0].focus();
        this.searchParam.PickNumber = this.taskNumber;
        this.searchParam.PickingId = this.calculateResult.pickingId;
        this.totalQuantity = this.calculateResult.packageCount;
        this.noPrintCount = this.calculateResult.pendingPrintPackageCount;
        this.printCount = this.totalQuantity - this.noPrintCount;
      }, error=>{
        var onClose=function () {
          $('#pickTaskNum')[0].blur();
          $('#pickTaskNum').select();
        };
        this.handleError(error,onClose);
      });
    }
  }

  SkuEnter() {
    this.search = true;

    this.searchParam.SkuCode = this.storeSearchKey;
    this.result = null;
    this.packageScanService.GetPickTaskQuery(this.searchParam).subscribe(data => {
      this.result = data.content;
      if (this.result) {
        this.totalQuantity = this.calculateResult.packageCount;
        let url = `${environment.api_url}/shipping-label/${this.result.packageId}/label/${this.result.packageNumber}/pre`;
        this.printPDF(url);
        this.printCount++;
        this.noPrintCount--;
      }
    }, this.handleError);
  }

  printPDF(url: string) {
    const featrure = "toolbar=yes, location=yes, directories=no, " +
      "status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=600, height=600";
    let newWin = window.open(url, "_blank", featrure);
    //newWin.location.href = url;
    //newWin.focus();
    this.storeSearchKey = '';
    $('.sku-id').focus();
  }

  ManualPrint(packageId:number,packageNumber:string)
  {
    console.log(packageId);
    console.log(packageNumber);
    let url = `${environment.api_url}/shipping-label/${packageId}/label/${packageNumber}`;

    this.printPDF(url);
  }

  packingError() {
    if (!(this.result.packageId > 0)) {
      this.error("请扫描包裹");
      return;
    }

    swal({
      title: `应当拣货数量：${this.result.quantity.toString()}`,
      text: '实际拣货数量：',
      type: 'question',
      input: 'number',
      confirmButtonText: '确定',
      showCancelButton: true,
      cancelButtonText: '取消'
    }).then((result) => {
      const pickQuantity = parseInt(result);
      if (pickQuantity > 0) {
        this.pickingService.setDanPinPackagePickingFailed(this.calculateResult.pickingId, this.result.packageId,
          pickQuantity).subscribe(data => {
          this.alertMessage('标记成功');

          // let url = `${environment.api_url}/shipping-label/${this.result.packageId}/picking-ticket/${this.result.packageNumber}/pre`;
          let url = `${environment.api_url}/shipping-label/${this.result.packageId}/label/${this.result.packageNumber}/pre?includeItemDetails=true`;
          this.printPDF(url);
        }, this.handleError);
      }
      else {
        this.alertMessage('数量无效');
        return false;
      }

    }, () => {
    });
    $('.sku-id').focus();

  }
}
