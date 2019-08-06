import { AmountService } from "../../../../../shared/services/declared-amount.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RootComponent } from "../../../../../shared/component/root.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, Input, Output, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import swal from 'sweetalert2';

@Component({
  selector: 'app-maxPrice',
  templateUrl: './maxPrice.component.html',
  styleUrls: ['./maxPrice.component.scss'],
  providers: [AmountService],
})

export class MaxPriceComponent implements OnInit {
  @Input()
  priceIndex?: number;
  @Input()
  editCountry;

  public formModel: FormGroup;
  private fb: FormBuilder = new FormBuilder();
  public submitted: boolean = false;

  coin = 'USD';

  countryCode;

  amount = [];

  country;

  addData = new Data;

  numberValidator(number: FormControl,
    ): any {
    let value = (number.value || '') + '';
    var numvalidator = /^[0-9]*$/;
    let valid = numvalidator.test(value);
    return valid? null: {number:true};
  }
    constructor(private maxModal: NgbActiveModal,
                private modalService: NgbModal,
                private amountService: AmountService) {
    this.formModel = this.fb.group({
      country: ['美国', Validators.required],
      amount: ['', this.numberValidator],
    });
  }

  ngOnInit() {
    this.country = this.amountService.getCountry();
  }

  closeModal() {
    this.maxModal.close(1);
  }

  addAmount() {
    this.amountService.addCountryDeclarationAmount(this.addData).subscribe(data => {
      this.closeModal();
      swal({
        title: '成功!',
        text: "保存成功",
        type: 'success',
        confirmButtonText: '关闭'
      });
    },
    error => {
      if (error.error) {
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
    });
  }

  chooseCountry(model) {
    const info = this.formModel.value;
    for (let i of this.country) {
      if (info.country == i.country) {
        this.coin = i.currencyCode;
        this.countryCode = i.countryCode;
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    const countryVaild: boolean = this.formModel.get('country').valid;
    const amountVaild: boolean = this.formModel.get('amount').valid;
    const info = this.formModel.value;
    if(this.editCountry != undefined){
      this.addData.countryCode = this.editCountry.countryCode;
      this.addData.currencyCode = this.editCountry.declarationAmount.currencyCode;
      this.addData.declaredAmount = info.amount;
    } else {
      !this.countryCode?this.addData.countryCode = 'US':this.addData.countryCode = this.countryCode;
      this.addData.declaredAmount = info.amount;
      this.addData.currencyCode = this.coin;
    }
    this.addAmount();
  }
}

export class Data {
  countryCode: string;
  currencyCode: string;
  declaredAmount: number;
}
