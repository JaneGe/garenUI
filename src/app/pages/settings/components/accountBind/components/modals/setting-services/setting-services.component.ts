import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RootComponent } from "../../../../../../../shared/component/root.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {ShopAccountService} from "../../../../../../../shared/services/shop.account.service";
@Component({
  selector: 'app-setting-services',
  templateUrl: './setting-services.component.html',
  styleUrls: ['./setting-services.component.scss'],
  providers: [ShopAccountService]
})
export class SettingServicesComponent extends RootComponent implements OnInit {
  @Input()
  modalHeader: string;

  public form: FormGroup;

  private fb: FormBuilder = new FormBuilder();

  public submitted: boolean = false;

  userName:string='';

  userPassword:string='';

  id:number;

  userId:number;
  siteCode:string='';
  displayName:string='';
  channelType:any;


  constructor(private accountModel: NgbActiveModal,
    private modalService: NgbModal,private shopAccountService: ShopAccountService
  ) {
    super();
    this.form = this.fb.group({
      accountName: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.userName='';
    this.userPassword='';
  }

  ngOnInit() {
    this.shopAccountService.GetEmailAccountByUserId(this.userId).subscribe(data => {
      if ( data.content) {
        this.id = data.content.id;
        this.userName = data.content.accountName;
        this.userPassword = data.content.password;
      }else{
        this.userName = '';
        this.userPassword = '';
      }

    }, this.handleError);
  }

  onSubmit(value) {

    const data = {
      Id: this.id,
      AccountName: this.userName,
      Password: this.userPassword,
      UserId: this.userId,
      ChannelType:this.channelType,
      DisplayName:this.displayName,
      SiteCode:this.siteCode
    };
    this.shopAccountService.SetCurrentAccount(data).subscribe(data => {
      this.alertMessage('设置成功');
      this.accountModel.close(1);
    }, this.handleError);
  }
  closeModal() {
    this.accountModel.close(1);
  }
}

