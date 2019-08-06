import { Component, Input, OnInit } from '@angular/core';
import { RootComponent } from "../../../../../../../shared/component/root.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../../../../../../shared/services/user.service";
import {ShopAccountService} from "../../../../../../../shared/services/shop.account.service";

@Component({
  selector: 'app-setting-user',
  templateUrl: './setting-user.component.html',
  styleUrls: ['./setting-user.component.scss'],
  providers: [UserService, ShopAccountService]
})

export class SettingUserComponent extends RootComponent implements OnInit {
  public options: Select2Options;
  public value: any[];
  userId:any;
  userWithType:any;
  accountId:any;
  accountName:any;
  userItems:any[];
  constructor(private modalService: NgbActiveModal,private userService: UserService,private shopAccountService:ShopAccountService
  ) {
    super();
  }

  ngOnInit() {
  this.onLoad();
  }

  onLoad(){
    this.userService.GetUserListQuery().subscribe(data => {
      let usersList = [];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.id;
        item.text = c.userName;
        usersList.push(item);
      }
      this.userItems = usersList;
      this.value=this.userId;
    },this.handleError);
  }

  closeModal() {
    this.modalService.close(1);
  }

  onChanged(data: { value: any }) {
    this.userId=data.value;
    console.log(data.value);
  }

  onSave(){
    if(this.userId==0){
      this.error("请选择用户");
      return;
    }
    this.shopAccountService.getSetUserWithAccount(this.accountId,this.userWithType,this.userId,this.accountName).subscribe(data => {
      this.alertMessage("设置成功");
      this.closeModal();
    }, this.handleError);
  }
}

