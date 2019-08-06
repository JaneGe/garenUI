import { Component, OnInit } from '@angular/core';
import {RootComponent} from "../../../../../../../shared/component/root.component";
import {ShopAccountService} from "../../../../../../../shared/services/shop.account.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-wish-auth-modal',
  templateUrl: './wish-auth-modal.component.html',
  styleUrls: ['./wish-auth-modal.component.scss'],
  providers: [ShopAccountService]
})
export class WishAuthModalComponent  extends RootComponent  implements OnInit {

  displayName: string = null;
  authLoginUrl: string = null;

  constructor(private authModel: NgbActiveModal,
              private shopAccountService: ShopAccountService) {
    super();
  }

  ngOnInit() {
  }
  closeModal() {
    this.authModel.dismiss();
  }

  authSuccess() {
    this.authModel.close();
  }

  fetchLoginUrl() {
     console.info(this.displayName);
    if (this.isNullOrEmpty(this.displayName)) {
      this.error("请输入账号名称");
      return;
    }

    this.shopAccountService.getWishLoginUrl(null, this.displayName).subscribe(data => {
      this.authLoginUrl = data.content;
      const win = window.open();
      win.location.href = this.authLoginUrl;
    }, this.handleError);
  }
}
