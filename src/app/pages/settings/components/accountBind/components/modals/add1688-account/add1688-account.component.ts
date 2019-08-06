import {Component, Input, OnInit} from '@angular/core';
import {RootComponent} from "../../../../../../../shared/component/root.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Ali1688AccountService} from "../../../../../../../shared/services/ali1688-account-service";

@Component({
  selector: 'app-add1688-account',
  templateUrl: './add1688-account.component.html',
  styleUrls: ['./add1688-account.component.scss'],
  providers: [Ali1688AccountService]
})

export class Add1688AccountComponent extends RootComponent implements OnInit {
  @Input()
  accountId: number;

  url = 'https://auth.1688.com/auth/authorize.htm';
  appKey: string = '';
  secretKey: string = '';
  isSubmitted: boolean = false;
  constructor(private modalService: NgbModal,
              private addAccountModel: NgbActiveModal,
              private ali1688AccountService: Ali1688AccountService) {
    super();
  }


  ngOnInit() {
    if (this.accountId > 0) {
      this.ali1688AccountService.getAccountDetail(this.accountId).subscribe(data => {
        const account = data.content;
        this.appKey = account.appKey;
        this.secretKey = account.secretKey;
      }, this.handleError);
    }
  }

  closeModal() {
    this.addAccountModel.close(1);
    //this.addAccountModel.dismiss();
  }

  bind() {
    this.ali1688AccountService.getAuthLoginUrl(this.accountId, this.appKey, this.secretKey).subscribe(data => {
      const url = data.content;
      const newWin = window.open('');
      newWin.location.href = url;
      this.isSubmitted = true;
    }, this.handleError);
  }
}