import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from "../../shared/services/user.service";
import { ApiService } from "../../shared/services/api.service";
import { JwtService } from "../../shared/services/jwt.service";
import { LoginService } from "../../shared/services/login.service";
import { Router } from "@angular/router";
import { RootComponent } from "../../shared/component/root.component";
import swal from 'sweetalert2';
import { CommonData } from "../../shared/common-data";
import * as Index from 'assets/script/index.js';
@Component({
  selector: 'login',
  templateUrl: './login1.html',
  styleUrls: ['./login1.scss'],
  providers: [LoginService, UserService, ApiService, JwtService],
})
export class LoginComponent implements OnInit,AfterViewInit{

  public form: FormGroup;
  public workerNo: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  path: string = '';
  pid: any;

  constructor(fb: FormBuilder, private jwtService: JwtService,
    public loginService: LoginService,
    public userService: UserService,
    public router: Router) {
    this.form = fb.group({
      'workerNo': ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(4)])]
    });

    this.workerNo = this.form.controls['workerNo'];
    this.password = this.form.controls['password'];

  }
  isLoging: boolean = false;
  ngOnInit(){

  }
  ngAfterViewInit(){
    console.log(Index.S);
    Index.S.init();
  }
  public onSubmit(values: any): void {
    this.isLoging = true;
    this.submitted = true;
    if (this.form.valid) {

      this.loginService.Login(values.workerNo, values.password).subscribe(data => {
        if (data.success) {
          this.jwtService.saveToken(data.content);
          this.userService.fetchCurrentUsrInfo().subscribe(d => {

            console.info(d.content);
            this.userService.setUserInfo(d.content);
            this.LoadTrees();

          });
        }
      }, error => {
        this.submitted = false;
        this.handleError(error);
      });
    }
  }

  handleError(error): void {
    this.isLoging = false;

    if (error.error) {
      if (!error.error.message) {
        error.error.message = '错误，请重试'
      }
      swal({
        title: '错误!',
        text: error.error.message,
        type: 'error',
        confirmButtonText: '关闭'
      })
    }
    else {
      swal({
        title: '错误!',
        text: "网络连接出错",
        type: 'error',
        confirmButtonText: '关闭'
      })
    }
  }

  public LoadTrees(): void {
    this.loginService.getResourceTree().subscribe(data => {
      if (data.success) {
        this.userService.setPageMenu(data.content);
        this.userService.SaveCommonData();
          if ((!CommonData.GetCurrentPageMenu()) || (CommonData.GetCurrentPageMenu().length == 0)) {
            swal({
              title: '错误!',
              text: '请设置权限后,在进行使用!',
              type: 'error',
              confirmButtonText: '关闭'
            });

            return;
          }
          const pageMenus = CommonData.GetCurrentPageMenu();
          if (pageMenus[0].children.length == 0 || pageMenus[0].children[0].length == 0) {
            swal({
              title: '错误!',
              text: '请设置你权限首页!',
              type: 'error',
              confirmButtonText: '关闭'
            });
            return;
          }
          this.router.navigate(['/pages/home', 0] );
          // this.router.navigate(['/pages/index/boss', 1],{ queryParams: { pid: 90 } });
          return;
      }
    }, this.handleError);
  }
}
