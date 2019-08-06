import { Component, Injectable, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { OptionsService } from "../../options.Service";
import { RootComponent } from "../../../../shared/component/root.component";



@Component({
  selector: 'app-appointmoney',
  templateUrl: './appointmoney.component.html',
  styleUrls: ['./appointmoney.component.scss', '../../public.scss'],
  providers: [OptionsService]
})
@Injectable()
export class AppointmoneyComponent extends RootComponent implements OnInit {
  Currencys: Array<any> = [];
  modalHeader: any = '';
  limitingmoney: { currency: string, min: string, max: string } = null;
  constructor(private activeModal: NgbActiveModal,
    private _optionsService: OptionsService) {
    super();
    this.Currencys = this._optionsService.Currencys;

  }
  ngOnInit() {
    $('#min')[0].focus();
  }
  closeModal() {
    this.activeModal.close();
  }
  // isNumber(e:any){
  //   var char_code = e.charCode ? e.charCode : e.keyCode;
  //   if((char_code!=46&&char_code<48) || char_code >57){
  //     this.error("只允许输入数字");
  //     return false;
  //   }
  //   else{
  //     return true;
  //   }
  // }
  onSubmit(currency: any, min: any, max: any) {
    var NumMin = parseFloat(min);
    var NumMax = parseFloat(max);
    if ((NumMin != NaN && NumMax != NaN) && NumMax < NumMin) {
      this.error("请再次检查输入！");
    }
    else {
      /* if (min == "" || max == "") {
        this.error("不能为空！");
        return false;
      } */
      this.limitingmoney.currency = currency;
      if (isNaN(NumMin)) {
        this.limitingmoney.min = '';
      } else {
        this.limitingmoney.min = NumMin.toString();
      }
      if (isNaN(NumMax)) {
        this.limitingmoney.max = '';
      } else {
        this.limitingmoney.max = NumMax.toString();
      }
      if (min === '') {
        min = 0;
        this.limitingmoney.min = min.toString();
      }
      if (max === '') {
        max = 999999999;
        this.limitingmoney.max = max.toString();
      }
      this.activeModal.close(this.limitingmoney);
    }
  }
}
