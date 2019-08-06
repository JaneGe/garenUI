import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as Slide from '../../../../../shared/animations/modal-Slide';
import {RootComponent} from "../../../../../shared/component/root.component";
import {Ali1688AccountService} from "../../../../../shared/services/ali1688-account-service";

@Component({
  selector: 'app-set-login-info',
  templateUrl: './set-login-info.component.html',
  styleUrls: ['./set-login-info.component.scss'],
  providers: [Ali1688AccountService]
})
export class SetLoginInfoComponent extends RootComponent implements OnInit {
  basicInfoForm: FormGroup;
  node: any;
  @Input()
  accountId;

  loginId: string;

  constructor(private fb: FormBuilder,
              private activeModal: NgbActiveModal,
              private ali1688AccountService: Ali1688AccountService) {
    super();
    this.basicInfoForm = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.maxLength(16)])],
      'password': ['', Validators.compose([Validators.required, Validators.maxLength(12)])],
      'paypassword': ['', Validators.compose([Validators.required, Validators.maxLength(12)])]
    });
  }


  ngOnInit() {
    this.ali1688AccountService.getAccountDetail(this.accountId).subscribe(data => {
      const account = data.content;
      this.basicInfoForm.controls['name'].setValue(account.loginId);
    }, this.handleError);


    this.node = document.getElementById("form").parentNode.parentNode.parentNode;
    Slide.slideIn(this.node);
    $('#name')[0].focus();
  }

  OnSubmit(value: any) {
    if (value.name.trim().length == 0 || value.password.trim().length == 0 ) {
      this.error("请输入完整的账号密码");
      return;
    }

    let data = {
      LoginId: value.name,
      LoginPassword: value.password,
      LoginPayPassword: value.paypassword,
    };

    this.ali1688AccountService.setAli1688LoginPassword(this.accountId, data).subscribe(data => {
      this.alertMessage("保存成功");
      this.closeModal();
    }, this.handleError);


    //Slide.slideRight(this.node,this,value);
  }

  closeModal() {
    //  Slide.slideLeft(this.node,this);
    this.activeModal.dismiss();
  }
}
