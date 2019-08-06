import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RootComponent} from "../../../../../shared/component/root.component";

import {OrderService} from "../../../../../shared/services/order-service";
import {CommonService} from "app/shared/services/common-service";
import {PackageService} from "../../../../../shared/services/package-search-service";
import {PackageDetailModel} from "../../../../../shared/models/Package/package-detail-model";
import {environment} from "../../../../../../environments/environment";
import {PackageReallocateLogisticsComponent} from "../reallocate-logistics/reallocate-logistics.component";
import {SplitPackageModalComponent} from '../split-package-modal/split-package-modal.component';
import {AuthorityComponent} from "../../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

enum TrackingNumberFetchFormType {
  /// <summary>
  /// 不显示任何
  /// </summary>
  None = 0,
  /// <summary>
  /// 显示获取跟踪号链接
  /// </summary>
  Fetch = 1,
  /// <summary>
  /// 显示录入跟踪号输入框
  /// </summary>
  Fill = 2,
  /// <summary>
  /// 显示跟踪号
  /// </summary>
  DisplayTrackingNumber = 3,
  /// <summary>
  /// 显示自动获取中
  /// </summary>
  DisplayAutoFetch = 4,
  /// <summary>
  /// 显示已添加至第三方物流
  /// </summary>
  DisplayShippingOrderAdded = 5

}


@Component({
  selector: 'app-packageModal',
  templateUrl: './packageModal.component.html',
  styleUrls: ['./packageModal.component.scss'],
  providers: [OrderService, CommonService, PackageService]
})

export class PackageModalComponent extends AuthorityComponent implements OnInit {
  @Input()
  modalHeader: string;
  @Input()
  packageId: string;
  packageDetail: PackageDetailModel;

  logs = [];
  trackingNumberDisplayType: TrackingNumberFetchFormType;
  loadingPackage: boolean = false;
  loadingTrackingNumber: boolean = false;
  isCanRefuse: boolean = true;
  selectedWarehouseId: number;
  truckNumber: string;
  ordernumber: string;
  isPackageChanged: boolean = false;
  secondPick: boolean;
  logiticsList: Array<any> = ['1', '2', '3'];
  selectedLogistics: string = '';
  status: string;

  cancelReason:string='';
  cancelModal:any;
  constructor(private packageModal: NgbActiveModal,
              private modalService: NgbModal,
              private orderService: OrderService,
              private commonService: CommonService,
              private packageSearchService: PackageService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.packageDetail = new PackageDetailModel();
  }

  ngOnInit() {
    this.loadPackageData();
  }

  loadPackageData() {
    //console.log('loadPackageData');
    this.loadingPackage = true;
    this.packageSearchService.getpackageDetail(this.packageId).subscribe(data => {
      this.loadingPackage = false;

      this.packageDetail = data.content;
      let packageSkuItems = [];
      packageSkuItems = data.content.packageItems;
      if ((packageSkuItems.length === 1 ) && ( packageSkuItems[0].quantity === 1 )) {
        this.isCanRefuse = false;
      }

      this.packageDetail.logs.forEach(element => {
        this.logs.unshift(element);
      });

      this.trackingNumberDisplayType = this.getTrackingNumberFetchFormType();

      this.selectedLogistics = this.packageDetail.shippingService;
    }, e => {
      this.loadingPackage = false;
      this.handleError(e);
    });
  }


  getTrackingNumberDisplayText(): string {
    //console.log('update trackingNumber'+this.packageDetail.trackingNumber);
    const fetchType = this.trackingNumberDisplayType;

    if (fetchType == TrackingNumberFetchFormType.None) {
      if (this.isNullOrEmpty(this.packageDetail.trackingNumber)) {
        return '--';
      }
      return this.packageDetail.trackingNumber;
    }
    if (fetchType == TrackingNumberFetchFormType.Fetch) {
      return '';
    }
    if (fetchType == TrackingNumberFetchFormType.DisplayTrackingNumber) {
      return this.packageDetail.trackingNumber;
    }
    if (fetchType == TrackingNumberFetchFormType.DisplayAutoFetch) {
      return "自动获取中...";
    }
    if (fetchType == TrackingNumberFetchFormType.DisplayShippingOrderAdded) {
      return "已添加至物流商";
    }
    return '';
  }

  getTrackingNumberFetchFormType(): TrackingNumberFetchFormType {
    if (!this.packageDetail.isTrackingNumberRequired) {
      if (this.isNullOrEmpty(this.packageDetail.trackingNumberApiName)) {
        return TrackingNumberFetchFormType.None;
      }

      return this.isNullOrEmpty(this.packageDetail.spPackageId) ?
        TrackingNumberFetchFormType.Fetch : TrackingNumberFetchFormType.DisplayShippingOrderAdded;
    }

    if (!this.isNullOrEmpty(this.packageDetail.trackingNumber)) {
      return TrackingNumberFetchFormType.DisplayTrackingNumber;
    }
    if (this.isNullOrEmpty(this.packageDetail.trackingNumberApiName)) {
      // return TrackingNumberFetchFormType.Fill;
      return TrackingNumberFetchFormType.Fetch;
    }


    if (this.packageDetail.shippingPackageId > 0) {
      return TrackingNumberFetchFormType.DisplayAutoFetch;
    }
    return this.isNullOrEmpty(this.packageDetail.spPackageId) ?
      TrackingNumberFetchFormType.Fetch : TrackingNumberFetchFormType.DisplayAutoFetch;
  }

  onFetchTrackingNumber() {
    this.isPackageChanged = true;

    this.loadingTrackingNumber = true;
    this.packageSearchService.fetchTrackingNumber(this.packageId).subscribe(data => {
      this.loadingTrackingNumber = false;
      this.loadPackageData();
    }, e => {
      this.loadingTrackingNumber = false;
      this.handleError(e);
    });
  }

  onManualEntryTrackingNumber() {
    this.isPackageChanged = true;

    this.loadingTrackingNumber = true;
    this.packageSearchService.manualEntryTrackingNumber(this.selectedWarehouseId, this.packageId, this.truckNumber)
      .subscribe(data => {
        this.loadingTrackingNumber = false;
        this.loadPackageData();
      }, e => {
        this.loadingTrackingNumber = false;
        this.handleError(e);
      });
  }
  confirmReason(reason){

    if (reason.trim().length == 0){
      this.error('作废原因不能为空');
    }
    else if(reason.length<2){
      this.error('作废原因字数最少为2');
    }
    else{
      reason='包裹作废原因：'+reason;
      this.packageSearchService.voidPackage(this.packageId,reason).subscribe(data => {
        this.alertMessage("作废成功");
        this.cancelModal.close(reason);
      }, e => {
        this.handleError(e);
      });


    }
  }
  canceled(cancelReasonModal:any) {
    this.cancelModal=this.modalService.open(cancelReasonModal,{backdrop:'static',size:'lg'});
    this.cancelModal.result.then(result=>{
      if(result!=undefined){
        this.loadPackageData();
      }
    }, reason => {
    })
  }

  closeModal() {
    if (this.isPackageChanged) {
      this.packageModal.close();
    }
    else {
      this.packageModal.dismiss();
    }
  }

  failedPick() {
    this.confirm('标记拣货失败？', () => {
      this.packageSearchService.setPackagePickingFailed(this.packageDetail.pickingId, this.packageId).subscribe(
        data => {
         this.printPackageLabel();
          this.alertMessage('操作成功');
          this.packageModal.close(true);

        },
        e => this.handleError(e)
      );

    });
  }

  printPackageLabel() {
   // const pdfSrc = `${environment.api_url}/shipping-label/${this.packageDetail.id}/label/111/pre`;
    //this.printPDF(pdfSrc);
    const url = `${environment.api_url}/shipping-label/${this.packageId}/label/${this.packageDetail.packageNumber}?includeItemDetails=true`;
    this.printPDF(url);
  }

  printPDF(pdfUrl: string) {
    const featrure = "toolbar=yes, location=yes, directories=no, " +
      "status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=600, height=600";
    let newWin = window.open('', '_blank', featrure);
    if(newWin==null)
    {
      this.error('请检查浏览器是否阻止了打印面单弹窗');
    }
    newWin.focus();
    newWin.location.href = pdfUrl;
  }

  reselectLogistics(value) {
    console.log(value);
    this.selectedLogistics = value.value;
  }

  open(content) {
    this.modalService.open(content, {backdrop: "static", windowClass: "content"}).result.then((result) => {

    }, (reason) => {

    });
  }

  openReallocateLogisticsModal() {
    const searchModal = this.modalService.open(PackageReallocateLogisticsComponent, {size: 'lg', backdrop: 'static'});
    searchModal.componentInstance.packageId = this.packageId;
    searchModal.componentInstance.warehouseId = this.packageDetail.warehouseId;
    searchModal.result.then(result => {
      if(result === 1) {
        this.alertMessage("分配成功，请去平台修改回传单号");
        this.isPackageChanged=true;
        this.loadPackageData();
        //this.getTrackingNumberDisplayText();
      }
    }, reason => {
    })
  }

  openSplitPackageModal() {
    const searchModal = this.modalService.open(SplitPackageModalComponent,
      {size: 'sm', backdrop: 'static'});
    searchModal.componentInstance.packageId = this.packageId;
    searchModal.componentInstance.packageNumber = this.ordernumber;
    searchModal.result.then(res => {
      this.loadPackageData();
    }, reason => {
    });
  }
  getDownloadLabelUrl() {
    return this.packageSearchService.getDownloadUrl(this.packageId, this.packageDetail.packageNumber);
  }
}

