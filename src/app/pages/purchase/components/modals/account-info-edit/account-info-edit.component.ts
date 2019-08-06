import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {PurchaseAccountServiceService} from "app/shared/services/purchase-account-service.service";
import {RootComponent} from "../../../../../shared/component/root.component";

@Component({
  selector: 'app-account-info-edit',
  templateUrl: './account-info-edit.component.html',
  styleUrls: ['./account-info-edit.component.scss'],
  providers:[PurchaseAccountServiceService]
})
export class AccountInfoEditComponent extends RootComponent implements OnInit {
  @Input()
  accountId: number;

  @Input()
  accountName: string;

  platformTypes = [{ Id: 1, Name: '淘宝' }, { Id: 2, Name: '京东' }];
  selectedPlatformType = 1;
  constructor(private activeModal: NgbActiveModal,
              private purchaseAccountServiceService: PurchaseAccountServiceService) {
    super();

  }

  ngOnInit() {
  }
  saveData(){
    if(this.isNullOrEmpty(this.accountName)){
      this.error("名称不能为空");
      return;
    }
    let postData = <any>{};
    postData.Name = this.accountName;
    postData.Id = this.accountId;
    postData.PlatformType = this.selectedPlatformType;

    if(this.accountId != null){
      this.purchaseAccountServiceService.saveAccount(postData).subscribe(re=>{
        this.alertMessage("保存成功");
        this.activeModal.close();
      }, this.handleError)
    }
    else{
      this.purchaseAccountServiceService.addAccount(postData).subscribe(re=>{
        this.alertMessage("新增成功");
        this.activeModal.close();
      }, this.handleError)
    }
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
