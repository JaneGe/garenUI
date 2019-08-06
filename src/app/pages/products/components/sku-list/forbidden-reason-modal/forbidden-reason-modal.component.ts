import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SkuService} from "../../../../../shared/services/sku-service";
import {RootComponent} from "app/shared/component/root.component";

@Component({
  selector: 'app-forbidden-reason-modal',
  templateUrl: './forbidden-reason-modal.component.html',
  styleUrls: ['./forbidden-reason-modal.component.scss'],
  providers: [SkuService]
})
export class ForbiddenReasonModalComponent extends RootComponent implements OnInit {
  public options = {multiple: true}
 // public value = [];
  public current = [];

  shippmentTypes = [
    {id: 'Amazon', text: 'Amazon'},
   // {id: 'Manual', text: '手工订单'},
  ];

  halt: boolean = false;
  stopProduction: boolean = false;
  tort: boolean = false;
  meybeTort: boolean = false;

  isTort: boolean = false;

  modalHeader:string;
  skuId: number;
  value:string[] = [];
  selectedChannelType: string[] =[];
  constructor(private activeModal: NgbActiveModal,
              private skuService: SkuService) {
    super();
  }

  ngOnInit() {
    this.selectedChannelType=this.value;
    this.onCheckReason();
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  onCheckReason() {
    if (this.tort || this.meybeTort) {
      this.isTort = true;
    } else {
      this.isTort = false;
    }
  }

  onChanged(data: { value: string[] }) {
    this.selectedChannelType = data.value;
  }

  disableSku() {

    if(!this.tort && !this.meybeTort && !this.stopProduction && !this.halt)
    {
      this.error("请选择禁用原因");
      return;
    }
    if(this.tort || this.meybeTort)
    {
      if( this.selectedChannelType.length==0)
      {
        this.error("请选择侵权平台");
        return;
      }
    }
    let skuData = {
      isInfringement: this.tort,
      isSuspectedInfringement: this.meybeTort,
      isNoProduction: this.stopProduction,
      isDiscontinued: this.halt,
      suspectedInfringementChannels: this.selectedChannelType
    };
    this.skuService.disableSku(this.skuId, skuData).subscribe(data => {
      this.alertMessage('禁用成功');
      this.activeModal.close();
    }, this.handleError);

  }

  activateSku() {


    if(this.tort || this.meybeTort)
    {
      if( this.selectedChannelType.length==0)
      {
        this.error("请选择侵权平台");
        return;
      }
    }
    let skuData = {
      isInfringement: this.tort,
      isSuspectedInfringement: this.meybeTort,
      isNoProduction: this.stopProduction,
      isDiscontinued: this.halt,
      suspectedInfringementChannels: this.selectedChannelType
    };
    this.skuService.activateSku(this.skuId, skuData).subscribe(data => {
      this.alertMessage('激活成功');
      this.activeModal.close();
    }, this.handleError);
  }

}
