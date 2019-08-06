import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../../../../../shared/services/user.service";
import { RootComponent } from "../../../../../shared/component/root.component";

@Component({
  selector: 'app-blackListModal',
  templateUrl: './blackListModal.component.html',
  styleUrls: ['./blackListModal.component.scss'],
  providers: [UserService]
})

export class BlackListModalComponent extends RootComponent implements OnInit {

  @Input() modalType: string;
  @Input() id: number;

  blacklistUserInfo = new UserInfo;
  constructor(private activeModal: NgbActiveModal,
    private userService: UserService) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  closeModal() {
    this.activeModal.close();
  }

  openTable(index) {
    this.blacklistUserInfo.blacklistUserItems[index].isClose = !this.blacklistUserInfo.blacklistUserItems[index].isClose;
  }

  loadData() {
    this.userService.getBlacklistUserInfoById(this.id).subscribe(data => {

      data.content.blacklistUserItems.forEach(element => {
        element.isClose = true;
      });
      this.blacklistUserInfo = data.content;
    }, e => {
      this.handleError(e);
    });
  }
}

export class UserInfo {
  addressLine1: string;
  addressLine2: string;
  blacklistUserItems: Array<any>;
  buyerName: string;
  city: string;
  countryCnName: string;
  id: number;
  phoneNumber1: string;
  phoneNumber2: string;
  postalCode: string;
  stateOrProvince: string;
}