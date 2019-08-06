import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RootComponent} from "../../../../shared/component/root.component";

@Component({
  selector: 'app-weightrange',
  templateUrl: './weightrange.component.html',
  styleUrls: ['./weightrange.component.scss','../../public.scss']
})
export class WeightrangeComponent extends RootComponent implements OnInit {
  weightrange:{min:number,max:number}=null;
  modalHeader:string='';
  constructor(private activeModal:NgbActiveModal,) {super(); }

  ngOnInit() {
    $('#min')[0].focus();
  }
  closeModal() {
    console.log('关闭');
    this.activeModal.close();
  }
  // isNumber(e:any){
  //   var char_code = e.charCode ? e.charCode : e.keyCode;
  //   if(char_code<48 || char_code >57){
  //     this.error("只允许输入数字");
  //     return false;
  //   }
  //   else{
  //     return true;
  //   }
  // }

  onSubmit(min:any,max:any){
    console.log("提交");
    var NumMin=parseInt(min.replace(/[^0-9]/ig,""));
    var NumMax=parseInt(max.replace(/[^0-9]/ig,""));
    if(NumMin>NumMax){
      this.error("请再次检查输入！");
    }
    else {
      if(min==""||max==""){
        this.error("不能为空！");
        return false;
      }

      this.weightrange.min=NumMin;
      this.weightrange.max=NumMax;
      this.activeModal.close(this.weightrange);
    }
  }
}
