import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cd',
  templateUrl: './cd.component.html',
  styleUrls: ['./cd.component.scss']
})
export class CdComponent implements OnInit {
  public formModel: FormGroup;
  
  private fb: FormBuilder = new FormBuilder();

  cddata = [];

  constructor() {
    this.formModel = this.fb.group({
      cdname: ['', Validators.required],
      password: ['', Validators.required],
      country: ['', Validators.required],
    });
  }
  createUser() {
    const acdnameVaild: boolean = this.formModel.get('cdname').valid;
    const passwordVaild: boolean = this.formModel.get('password').valid;
    const countryVaild: boolean = this.formModel.get('country').valid;
    const info = this.formModel.value;
    info.state = 1;
    info.cart = 0;
    if (acdnameVaild && passwordVaild && countryVaild) {
      this.cddata.push(info);
      console.log("校验成功");
      console.log(this.cddata);
    } else {
      console.log("校验失败");
    }
  }
  ngOnInit() {
  }
  stateChange(i) {
    if (this.cddata[i].state === 1) {
      this.cddata[i].state = 0;
    } else {
      this.cddata[i].state = 1;
    }
  }
  stateChange2(i) {
    if (this.cddata[i].cart === 1) {
      this.cddata[i].cart = 0;
    } else {
      this.cddata[i].cart = 1;
    }
  }
}
