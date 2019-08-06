import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OptionsService} from "../../options.Service";
import {StorageRulesService} from "../../storage-rules/StorageRules.service";

@Component({
  selector: 'app-limitingcountry',
  templateUrl: './limitingcountry.component.html',
  styleUrls: ['./limitingcountry.component.scss','../../public.scss']
})
export class LimitingcountryComponent implements OnInit {
  limitingcountry:Array<any>=[];
  country:Array<any>=[];
  selectValue:string='';
  modalHeader:string='';
  commonCountry:Array<any>=[{country:'美国',value:'US'},{country:'英国',value:'GB'},{country:'意大利',value:'IT'},{country:'德国',value:'DE'},
    {country:'法国',value:'FR'},{country:'西班牙',value:'ES'},];
  constructor(private activeModal:NgbActiveModal,
              private _optionsService:OptionsService) {
    this.country=this._optionsService.Countrys;

  }

  ngOnInit() {
  }
  OnSubmit(country:Array<any>){
    this.activeModal.close(this.limitingcountry); //这里暂时先接受选择标签的内容
    console.log(this.limitingcountry);
  }
  closeModal() {
    this.activeModal.close();
  }
  onChangeCountryChanged(data: { value: string }) {
    this.selectValue = data.value;
    var index=this.limitingcountry.indexOf(this.selectValue);
    if(index==-1){
      this.limitingcountry.push(this.selectValue);
    }
  }
  addCommonCoutry(country:any){
    var index=this.limitingcountry.indexOf(country);
    if(index==-1){
      this.limitingcountry.push(country);
    }
  }
  addClass(target:any){
    var selectedcountry=target.innerText;
    var index=this.limitingcountry.indexOf(selectedcountry);
    if(index==-1){
      this.limitingcountry.push(selectedcountry);
      target.style.cssText="background:#fff;color:#2389F2;";
    }
    else{
      this.limitingcountry.splice(index,1);
      target.style.cssText="background:none;color:white";
    }
  }
  del(item:any){
    for(var i=0;i<this.limitingcountry.length;i++){
      let obj=this.limitingcountry[i];
      if(obj==item){
        this.limitingcountry.splice(i,1);
      }
    }
  }
}
