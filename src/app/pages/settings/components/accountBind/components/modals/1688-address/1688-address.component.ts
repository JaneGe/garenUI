import {Component, Input, OnInit} from '@angular/core';
import {RootComponent} from "../../../../../../../shared/component/root.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Ali1688AccountService} from "../../../../../../../shared/services/ali1688-account-service";

@Component({
  selector: 'app-1688-address',
  templateUrl: './1688-address.component.html',
  styleUrls: ['./1688-address.component.scss'],
  providers: [Ali1688AccountService]
})

export class AddressModalComponent extends RootComponent implements OnInit {
  @Input()
  accountId;

  addressCode: string;
  addressId: string;

  constructor(private modalService: NgbModal,
              private addressModel: NgbActiveModal,
              private ali1688AccountService: Ali1688AccountService) {
    super();

  }

  ngOnInit() {
    this.ali1688AccountService.getAccountDetail(this.accountId).subscribe(data => {
      const account = data.content;
      this.addressCode = account.addressCode;
      this.addressId = account.addressId;
    }, this.handleError);
  }

  saveAddress() {

    let data = {
      AddressCode: this.addressCode,
      AddressId: this.addressId
    };

    this.ali1688AccountService.editAddress(this.accountId, data).subscribe(data => {
          this.alertMessage("保存成功");
          this.closeModal();
    }, this.handleError);
  }

  closeModal() {
    this.addressModel.close();
  }
}

