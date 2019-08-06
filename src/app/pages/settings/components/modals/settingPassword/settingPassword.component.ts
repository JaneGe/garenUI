import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RootComponent } from "../../../../../shared/component/root.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MemberService } from "../../../../../shared/services/member.service";

@Component({
  selector: 'app-settingPassword',
  templateUrl: './settingPassword.component.html',
  styleUrls: ['./settingPassword.component.scss'],
  providers: [MemberService]
})
export class SettingPasswordComponent extends RootComponent implements OnInit {
  @Input()
  memberId?: number;
  @Input()
  workerNo?: number;
  @Input()
  name?: string;
  @Input()
  modalHeader: string;

  form: FormGroup;

  constructor(private activeModal: NgbActiveModal,
    fb: FormBuilder,
    private memberService: MemberService) {
    super();
    this.form = fb.group({
      'workerNo': [''],
      'name': [''],
      'password': ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(6)])]
    });

  }

  ngOnInit() {
    this.form.controls['workerNo'].setValue(this.workerNo);
    this.form.controls['name'].setValue(this.name);
  }

  closeModal() {
    this.activeModal.close(1);
  }

  onSubmit(value) {
    console.log(value.password.length);
    if (value.password.length >= 6 && value.password.length <= 16) {
      this.memberService.setMemberPassword(this.memberId, value.password).subscribe(data => {
        this.alertMessage("设置成功");
        this.closeModal();
      }, error => {
        if (error.error) {
          this.error(error.error.message);
        } else {
          this.error("网络连接出错");
        }
      })
    } else {
      this.error("密码长度必须为6~16位");
    }
  }

}

