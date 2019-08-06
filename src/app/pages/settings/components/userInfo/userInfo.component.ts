import {Component, OnInit} from '@angular/core';
import {NgUploaderOptions} from 'ngx-uploader';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RootComponent} from "../../../../shared/component/root.component";
import {UserService} from "../../../../shared/services/user.service";
import {CommonService} from "../../../../shared/services/common-service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../../shared/component/authority.component";

@Component({
  selector: 'app-userInfo',
  templateUrl: './userInfo.component.html',
  styleUrls: ['./userInfo.component.scss'],
  providers: [UserService, CommonService]
})
export class UserInfoComponent extends AuthorityComponent implements OnInit {
  /* 无图片 */
  public defaultPicture = 'assets/img/theme/no-photo.png';
  /* 用户图片 */
  public profile: any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };

  public uploaderOptions: NgUploaderOptions = { url: '' };

  userForm: FormGroup;
  passwordForm: FormGroup;


  constructor(fb: FormBuilder,
              private  commonService: CommonService,
              private userService: UserService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.userForm = fb.group({
      'id': [''],
      'workerNo': [''],
      'name': [''],
      'tel': ['']
    });

    this.passwordForm = fb.group({
      'old': ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(8)])],
      'new': ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(8)])],
      'repeat': ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(8)])]
    });
    this.uploaderOptions.url = this.commonService.getUserImageUploadUrl();
  }

  ngOnInit() {

    this.uploaderOptions.url = this.commonService.getUserImageUploadUrl();

    this.userService.getUsrInfoById().subscribe(d => {

      this.userForm.controls['id'].setValue(d.content.id);
      this.userForm.controls['workerNo'].setValue(d.content.workerNo);
      this.userForm.controls['name'].setValue(d.content.userName);
      this.userForm.controls['tel'].setValue(d.content.phone);
      this.profile.picture=d.content.url;
    }, this.handleError);
  }

  onUserSubmit(userForm) {

    let date = {
      id: this.userForm.controls['id'].value,
      workerNo: userForm.workerNo,
      userName: userForm.name,
      phoneNumber: userForm.tel,
    }
    this.userService.updateUserInfo(date).subscribe(data => {
      this.alertMessage("修改个人信息成功");
    }, this.handleError);


  }


  onPasswordSubmit(passwordForm) {
    console.log(passwordForm);

    if (passwordForm.new != passwordForm.repeat) {
      this.error('新密码两次输入不同，请重新输入');
      // } else if(!this.passwordForm.valid) {
    }
    else if (passwordForm.new.trim().length < 8 || passwordForm.repeat.trim().length < 8) {
      this.error('所有选项必填且密码长度应为8~16位，请检查您填写的表单后再次提交');
    }
    else {

      let date = {
        id: this.userForm.controls['id'].value,
        newPassWord: passwordForm.new,
        oldPassWord: passwordForm.old,
      }
      this.userService.changePassWrod(date).subscribe(data => {
        this.alertMessage("修改密码成功");
      }, this.handleError);

    }
  }

  picUpload(r) {
  }

  picUploadCompleted(r) {
    if (JSON.parse(r.response).IsSuccess == true) {
      const url = JSON.parse(r.response).Result;
      console.log(r.response);

      let date = {
        id: this.userForm.controls['id'].value,
        url: url
      }
      this.userService.editUserImage(date).subscribe(data => {
        this.alertMessage("修改头像成功");
      }, this.handleError);

    }
    else {
      this.error("修改头像失败！");
    }
  }
}
