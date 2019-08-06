import {Component, OnInit} from '@angular/core';
import {RootComponent} from "../../../shared/component/root.component";
import {WarehouseService} from "../../../shared/services/warehouse-service";
import {WarehouseOptionModel} from "../../../shared/models/warehouses/warehouse-option-model";
import {PickingService} from "../../../shared/services/picking.service";
import {
  PickingSecondInfoModel,
  SecondPickingBasketLocation
} from "../../../shared/models/pickings/picking-second-info-model";
import {tick} from "@angular/core/testing";
import {PackageModalComponent} from "../../order/components/modals/packageModal/packageModal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../../../environments/environment";
import {AuthorityComponent} from "../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-second-times',
  templateUrl: './second-times.component.html',
  styleUrls: ['../package-scan/package-scan.component.scss', './second-times.component.scss'],
  providers: [WarehouseService, PickingService]
})
export class SecondTimesComponent extends AuthorityComponent implements OnInit {
  url = '../../../../assets/shelf-audio/';
  audioName = null;
  textAll: any;
  list: Array<any> = [];
  allWarehouses: WarehouseOptionModel[] = [];

  pickingInfo: PickingSecondInfoModel = null;
  selectedWarehouseId: number = null;
  isLock: boolean = false;
  inputPickingNumber: string = null;
  inputSkuCode: string = null;
  colors = ['bg-primary', 'bg-success', 'bg-info', 'bg-warning', 'bg-danger'];
  colorIndex = 0;
  basketStatus: SecondPickingBasketLocation[] = [];

  isStartHandlePickingFailed: boolean = false;

  constructor(private warehouseService: WarehouseService,
              private pickingService: PickingService,
              private modalService: NgbModal,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }

  ngOnInit() {
    this.warehouseService.getAllOptions().subscribe(data => {
      this.allWarehouses = data.content;
    });


    $('tr td').removeClass();
    $('tr td span').removeClass().addClass('statu1');
    this.textAll = $('tr td span');
  }


  onSelectWarehouseChange() {
  }

  onPickingEnter() {
    if (this.isLock) {
      this.isLock = false;
    }
    else {
      if (this.selectedWarehouseId == null) {
        $("input[name='PickingNumber']").blur();
        $("input[name='PickingNumber']").addClass('has-error');
        this.error("请选择仓库");
        return;
      }
      if (this.isNullOrEmpty(this.inputPickingNumber)) {
        $("input[name='PickingNumber']").blur();
        $("input[name='PickingNumber']").addClass('has-error');
        this.error("请输入任务号");
        return;
      }
      this.inputPickingNumber = this.inputPickingNumber.trim();
      this.resetBasketLocation();
      this.pickingService.getPickingSecondInfo(this.selectedWarehouseId, this.inputPickingNumber)
        .subscribe(data => {
          this.isStartHandlePickingFailed = false;
          this.pickingInfo = data.content;

          if(this.pickingInfo.packageCount<60){
            let last=this.pickingInfo.packageCount;
            let box=$('tr td span');
            for(let i=last;i<box.length;i++){
              box[i].style.cssText+='visibility:hidden';
            }
          }

          if (this.pickingInfo.basketStatus != null) {
            console.log(this.pickingInfo);
            this.basketStatus = this.pickingInfo.basketStatus;
            for (const b of this.pickingInfo.basketStatus) {
              if (b.packageId) {
                this.initBasketLocation(b.basketNo, b.isFinished, b.isPickingFailed);
              }
            }
          }
          if (this.pickingInfo.isFinshed) {
            $("input[name='PickingNumber']").blur();
            $("input[name='PickingNumber']").addClass('has-error');
            this.error("分拣已完成");
            this.inputPickingNumber='';
          }
          else {
            $('.sku-id').focus();
            this.isLock = true;
          }
        }, error=>{
          $("input[name='PickingNumber']").blur();
          $("input[name='PickingNumber']").addClass('has-error');
          this.handleError(error);
          this.inputPickingNumber='';
        });
    }
  }

  onSkuEnter() {
    var show = $('#show');
    for (let i of this.colors) $(show).removeClass(i);
    $(show).addClass(this.colors[this.colorIndex]);
    this.colorIndex++;
    if (this.colorIndex == 5) this.colorIndex = 0;

    if (this.selectedWarehouseId == null) {
      $("input[name='skuid']").blur();
      $("input[name='skuid']").addClass('has-error');
      this.error("请选择仓库");
      return;
    }
    if (this.pickingInfo.id == null) {
      $("input[name='skuid']").blur();
      $("input[name='skuid']").addClass('has-error');
      this.error("请选择拣货单");
      return;
    }
    if (this.isNullOrEmpty(this.inputSkuCode)) {
      $("input[name='skuid']").blur();
      $("input[name='skuid']").addClass('has-error');
      this.error("Sku不能为空");
      return;
    }

    this.pickingService.doPickingSecondPickingSku(this.pickingInfo.id, this.inputSkuCode).subscribe(data => {
      const scanResult = data.content;

      this.markBasketLocation(scanResult.basketNo);

      const theBasketLocation = this.basketStatus.find(m => m.basketNo == scanResult.basketNo);
      if (theBasketLocation != null) {
          theBasketLocation.packageId = scanResult.packageId;
          theBasketLocation.isPickingFailed = false;
      }
      if (scanResult.isPackageFinished) {
        const targetLocation = this.getBasketLocation(scanResult.basketNo);
        if (targetLocation != null) {
          targetLocation.className = 'statu5';
        }
        const pdfSrc = `${environment.api_url}/shipping-label/${scanResult.packageId}/label/111/pre`;
        this.printPDF(pdfSrc);
        const theAudioPrintLabel: any = document.getElementById('audioPrintLabel');
        theAudioPrintLabel.play();
      }
      if (scanResult.isPickingFinished) {
        this.alertMessage("分拣完成");
        const theAudioPickingFinished: any = document.getElementById('audioPickingFinished');
        theAudioPickingFinished.play();
        this.inputSkuCode='';
        this.inputPickingNumber='';
        $("input[name='PickingNumber']")[0].focus();
      }
      this.inputSkuCode='';
    }, error=>{
      $("input[name='skuid']").blur();
      this.handleError(error);
      this.inputSkuCode='';
      $("input[name='skuid']").addClass('has-error');
    });


  }

  removeErrorstyle(target){
    $(target).removeClass('has-error');
  }
  printPDF(pdfUrl: string) {
    const featrure = "toolbar=yes, location=yes, directories=no, " +
      "status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=600, height=600";
    let newWin = window.open(pdfUrl, "_blank", featrure);
    newWin.focus();
  }

  markBasketLocation(basketBarCode: string) {
    this.audioName = basketBarCode;
    for (var i = 0; i < this.textAll.length; i++) {
      var target = this.textAll[i];
      if (target.className == 'statu2') {
        target.className = 'statu3';
      }
    }

    const barLocation = this.getBasketLocation(basketBarCode);
    if (barLocation != null) {
      barLocation.className = 'statu2';
    }

    const audioPlayer: any = document.getElementById('playLocation');
    if (audioPlayer != null) {
      const playPromise = audioPlayer.play();
      if (playPromise != null) {
        playPromise.then(_ => {
          // Automatic playback started!
          // Show playing UI.
        }).catch(error => {
          // Auto-play was prevented
          // Show paused UI.
          console.error(error);
        });
      }
    }
  }

  markBasketLocationPickingFalied(basketBarCode: string) {
    for (var i = 0; i < this.textAll.length; i++) {
      var target = this.textAll[i];
      if (target.className == 'statu2') {
        target.className = 'statu3';
      }
    }

    const barLocation = this.getBasketLocation(basketBarCode);
    if (barLocation != null) {
      barLocation.className = 'statu6';
    }
  }

  getBasketLocation(basketBarCode: string): any {
    for (let item of this.textAll) {
      if (item.innerText == basketBarCode) {
        return item;
      }
    }
  }

  resetBasketLocation() {
    for (let item of this.textAll) {
      item.className = 'statu1';
    }
  }

  initBasketLocation(basketBarCode: string, isFinished: boolean, isPickingFailed: boolean) {
    for (let item of this.textAll) {
      if (item.innerText == basketBarCode) {
        if (isPickingFailed) {
          item.className = 'statu6';
          $(item).children('i').removeClass('none');
        }
        else {
          item.className = isFinished ? 'statu5' : 'statu3';
        }
        return;
      }
    }
  }

  openPackageDetailModal(basketStatu: any, target: any) {
console.log(basketStatu,target);
    if (basketStatu != null && basketStatu.packageId) {
      const searchModal = this.modalService.open(PackageModalComponent, {size: 'lg', backdrop: 'static'});
      searchModal.componentInstance.modalHeader = '包裹详情';

      let isSecondPick = true;
      if (this.isStartHandlePickingFailed) {
        if (basketStatu.isFinished) {
          isSecondPick = false;
        }
        if (basketStatu.isPickingFailed) {
          isSecondPick = false;
        }
      }
      else {
        isSecondPick = false;
      }
      searchModal.componentInstance.secondPick = isSecondPick;
      searchModal.componentInstance.packageId = basketStatu.packageId;
      searchModal.result.then(result => {
        if (result !== undefined) {
          console.log(result);
          $(target).removeClass('statu5 statu3').addClass('statu6');
          $(target).children('i').removeClass('none');
          this.initBasketLocation(basketStatu.basketNo, false, true);
        }
      }, () => {
      });
    }
  }

  //预分配未扫描的包裹
  doHandleExceptionPackage() {
    this.pickingService.preAllocateUnScanPackages(this.pickingInfo.id).subscribe(data => {
      this.isStartHandlePickingFailed = true;

      for (var i = 0; i < this.textAll.length; i++) {
        var target = this.textAll[i];
        if (target.className == 'statu2') {
          target.className = 'statu3';
        }
      }

      const preResults = data.content;
      for (const preResult of preResults) {

        if (preResult.isPickingFinished) {
          continue;
        }

        const basketLocation = this.basketStatus.find(m => m.basketNo == preResult.basketNo);
        if (basketLocation != null) {
          basketLocation.packageId = preResult.packageId;
          basketLocation.isFinished = preResult.isPickingFinished;
          basketLocation.isPickingFailed = false;

          const barLocation = this.getBasketLocation(basketLocation.basketNo);
          if (barLocation != null) {
            barLocation.className = 'statu3';
          }
        }
      }
      console.info(this.basketStatus);

      /*    if (scanResult.isPackageFinished) {
            const targetLocation = this.getBasketLocation(scanResult.basketNo);
            if (targetLocation != null) {
              targetLocation.className = 'statu5'
            }
            const pdfSrc = `${environment.api_url}/shipping-label/${scanResult.packageId}/label/111/pre`;
            this.printPDF(pdfSrc);
            const theAudioPrintLabel: any = document.getElementById('audioPrintLabel');
            theAudioPrintLabel.play();
          }
          if (scanResult.isPickingFinished) {
            const theAudioPickingFinished: any = document.getElementById('audioPickingFinished');
            theAudioPickingFinished.play();
          }*/
    }, this.handleError);
  }
}
