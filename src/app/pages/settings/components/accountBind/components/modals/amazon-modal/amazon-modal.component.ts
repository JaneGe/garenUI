import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RootComponent } from "../../../../../../../shared/component/root.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ShopAmazonCreateAccountModel } from "../../../../../../../shared/models/channels/shop.amazon.createaccount";
import { ShopAccountService } from "../../../../../../../shared/services/shop.account.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AmazonAccountListModel } from "../../../../../../../shared/models/channels/amazon-account-list.model";

@Component({
  selector: 'app-amazon-modal',
  templateUrl: './amazon-modal.component.html',
  styleUrls: ['./amazon-modal.component.scss'],
  providers: [ShopAccountService]
})

export class AmazonModalComponent extends RootComponent implements OnInit {
  @Input()
  @Input()
  modalHeader: string;

  public form: FormGroup;

  private fb: FormBuilder = new FormBuilder();

  public submitted: boolean = false;

  constructor(
    private accountModel: NgbActiveModal,
    private shopAccountService: ShopAccountService,
    private modalService: NgbModal,
  ) {
    super();
    this.form = this.fb.group({
      accountName: ['', Validators.required],
      sellerId: ['', Validators.required],
      marketId: ['', Validators.required],
      accessKey: ['', Validators.required],
      secretKey: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
 
  onSubmit(value) {
    this.submitted = true;
    const accountModel = new ShopAmazonCreateAccountModel();

    accountModel.displayName = value.accountName;
    accountModel.sellerId = value.sellerId;
    accountModel.marketplaceId = value.marketId;
    accountModel.accessKeyId = value.accessKey;
    accountModel.secretKey = value.secretKey;

    this.shopAccountService.addAmazonAccount(accountModel).subscribe(data => {
      this.alertMessage("保存成功");
      this.closeModal();
    }, error => {
      this.submitted = false;
      if (error.error) {
        this.error(error.error.message);
      } else {
        this.error("网络连接出错");
      }
    });

  }
  closeModal() {
    this.accountModel.close(1);
  }
}

