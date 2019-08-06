import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OptionsService} from "../../options.Service";

@Component({
  selector: 'app-outrangecountry',
  templateUrl: './outrangecountry.component.html',
  styleUrls: ['./outrangecountry.component.scss','../../public.scss']
})
export class OutrangecountryComponent implements OnInit {
  outrangecountry:Array<any>=[];
  modalHeader:any='';
  country:Array<any>=[];
  selectValue:string='';
  commonCountry:Array<any>=[{country:'美国',value:'US'},{country:'英国',value:'GB'},{country:'意大利',value:'IT'},{country:'德国',value:'DE'},
    {country:'法国',value:'FR'},{country:'西班牙',value:'ES'},];
  constructor(private activeModal:NgbActiveModal,
              private _optionsService:OptionsService) {
    this.country=this._optionsService.Countrys;
    this.country.unshift({id:'_choice_',value:'请选择'})
  }

  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close();
  }
  OnSubmit(country:Array<any>){
    this.activeModal.close(this.outrangecountry); //这里暂时先接受选择标签的内容
    console.log(this.outrangecountry);
  }
  onChangeCountryChanged(data: { value: string }) {
    this.selectValue = data.value;
    var index=this.outrangecountry.indexOf(this.selectValue);
    if(index==-1){
      this.outrangecountry.push(this.selectValue);
    }
  }
  addCommonCoutry(country:any){
    var index=this.outrangecountry.indexOf(country);
    if(index==-1){
      this.outrangecountry.push(country);
    }
  }
  addClass(target:any){
    var selectedcountry=target.innerText;
    var index=this.outrangecountry.indexOf(selectedcountry);
    if(index==-1){
      this.outrangecountry.push(selectedcountry);
      target.style.cssText="background:#fff;color:#2389F2;";
    }
    else{
      this.outrangecountry.splice(index,1);
      target.style.cssText="background:none;color:white";
    }
  }

  del(item:any){
    for(var i=0;i<this.outrangecountry.length;i++){
      let obj=this.outrangecountry[i];
      if(obj==item){
        this.outrangecountry.splice(i,1);
      }
    }
  }
}
