import { Component, OnInit } from '@angular/core';
import { RootComponent } from "../../../../../../../shared/component/root.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopAccountService } from 'app/shared/services/shop.account.service';

@Component({
  selector: 'app-aliexpress-modal',
  templateUrl: './aliexpress-modal.component.html',
  styleUrls: ['./aliexpress-modal.component.scss'],
  providers: [ShopAccountService]
})

export class AliexpressModalComponent extends RootComponent implements OnInit {
  public formModel: FormGroup;
  private fb: FormBuilder = new FormBuilder();

  authLoginUrl: string = null;

  constructor(private addressModel: NgbActiveModal,
    private shopAccountService: ShopAccountService) {
    super();
    this.formModel = this.fb.group({
      aliexpressName: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  closeModal() {
    this.addressModel.dismiss();
  }

  authSuccess() {
    this.addressModel.close();
  }
  fetchLoginUrl() {
    const aliexpressNameVaild: boolean = this.formModel.get('aliexpressName').valid;
    if (!aliexpressNameVaild) {
      this.error("请输入账号名称");
      return;
    }
    const info = this.formModel.value;

    this.shopAccountService.getLoginUrl(null, info.aliexpressName).subscribe(data => {
      this.authLoginUrl = data.content;
      const win = window.open();
      win.location.href = this.authLoginUrl;
    }, this.handleError);
  }
}

