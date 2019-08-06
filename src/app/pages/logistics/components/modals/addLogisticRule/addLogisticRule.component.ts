import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CountryNameService } from '../../../../../shared/services/countryName.service';
import { ShippingMethodService } from "../../../../../shared/services/shipping-method-service";
import { ShippingServiceFeeRuleDetailModel } from "../../../../../shared/models/logistics/shipping-service-fee-rule-detail-model";
import { RuleItemChargeType, ShippingFeeRuleItem } from "../../../../../shared/models/logistics/shipping-fee-rule-item";
import { RootComponent } from "../../../../../shared/component/root.component";
import { log } from "util";
import { RulesInCountryComponent } from "../rules-in-country/rules-in-country.component";

class RuleInfo {
  ruleName: string;
  ruleDiscountRate: number;
}

@Component({
  selector: 'app-addLogisticRule',
  templateUrl: './addLogisticRule.component.html',
  styleUrls: ['./addLogisticRule.component.scss'],
  providers: [CountryNameService, ShippingMethodService],
})

export class AddLogisticRuleComponent extends RootComponent implements OnInit {
  public options: Select2Options;
  public value: any[];
  public current: string;

  country;
  countryName;
  countryCodesArray = [];
  oldCountryCodes = [];
  newCountryCodes:string;
  isTrue:boolean=false;

  editCountryName;

  form: FormGroup;

  @Input()
  modalTitle: string;

  @Input()
  ssId: number;
  @Input()
  shippingFeeRuleId: number = 0;

  ruleDetail: ShippingServiceFeeRuleDetailModel;
  ruleItems: ShippingFeeRuleItem[] = [];


  ruleInfo: RuleInfo;

  constructor(private modal: NgbActiveModal,
    private modalService: NgbModal,
    private countryNameService: CountryNameService,
    private shippingMethodService: ShippingMethodService,
    fb: FormBuilder) {
    super();
    this.ruleInfo = new RuleInfo();

    this.form = fb.group({
      'countryName': ['', Validators.compose([Validators.required])]
    })
  }

  getCountry() {
    this.countryNameService.postCommonCountry().subscribe(data => {
      this.country = data.content;

      let cname = [];
      for (let i of this.country) {
        let cName = <any>{};
        cName.id = i.code;
        cName.text = (`${i.englishName}${i.chineseName}(${i.code})`);
        cname.push(cName);
        this.countryName = cname;

      }
     // this.value=['TH','CN'];
      if (this.shippingFeeRuleId > 0) {
        this.shippingMethodService.getShippingRuleDetail(this.ssId, this.shippingFeeRuleId).subscribe(data => {
          this.ruleDetail = data.content;

          this.ruleItems = this.ruleDetail.items;
          this.ruleInfo.ruleName = this.ruleDetail.name;
          this.ruleInfo.ruleDiscountRate = this.ruleDetail.discountRate;
          this.countryCodesArray = this.ruleDetail.countryCodes.split(',');
          this.countryCompare();
        });
      }
    });

  }

  ngOnInit() {
    this.getCountry();

    this.options = { multiple: true };
  }

  countryCompare() {
    let arr = [];
    for (let i of this.countryCodesArray) {
      for (let index of this.country) {
        if (i == index.code) {
          let countryInfo = index.code;
          arr.push(countryInfo);
        }
      }
    }
    this.value = arr;
    this.oldCountryCodes=this.value;
    console.log(this.value);
  }

  addRule() {
    let ruleItem = new ShippingFeeRuleItem();
    ruleItem.calcType = RuleItemChargeType.ByGram;
    this.ruleItems.push(ruleItem)
  }

  clearRules() {
    this.ruleItems = [];
  }

  closeModal() {
    this.modal.close(1);
  }

  onChanged(data: { value: string }) {
    let arr = [];
    arr.push(data.value);
    this.current = arr.join();

    console.log(this.current);

  }

  onSave() {
    console.info(this.ruleInfo);
    let data = {
      id: this.shippingFeeRuleId,
      name: '',
      countryCodes: '',
      shippingServiceId: this.ssId,
      discountRate: null,
      items: []
    };

    data.name = this.ruleInfo.ruleName;
    if(this.isTrue)
    {
      data.countryCodes = this.newCountryCodes;
    }
    else
    {
      data.countryCodes = this.current;
    }
    data.discountRate = this.ruleInfo.ruleDiscountRate;

    for (let item of this.ruleItems) {
      if (item.calcType == RuleItemChargeType.ByGram) {
        item.fixedFee = null;
      }
      else {
        item.unitPrice = null;
      }
      let rItem = {
        minWeight: item.minWeight,
        maxWeight: item.maxWeight,
        itemChargeType: RuleItemChargeType[item.calcType],
        unitPrice: item.unitPrice,
        fixedFee: item.fixedFee,

        fuelCost: item.fuelCost,
        fuelRate: item.fuelRate,
        handlingFee: item.handlingFee,
        otherFee: item.otherFee,
        discountRate: item.discountRate,
        shippingFeeRuleItemId: item.shippingFeeRuleItemId
      };
      data.items.push(rItem)
    }
    this.shippingMethodService.saveShippingFeeRuleInfo(data).subscribe(data => {
      this.alertMessage("保存成功");
      this.closeModal();
    }, this.handleError);
    console.info(data);
  }

  deleteRuleItem(item: ShippingFeeRuleItem) {
    console.info(item);
    let index = this.ruleItems.indexOf(item, 0);
    console.info(index);
    if (index > -1) {
      this.ruleItems.splice(index, 1);
    }
  }

  openInModal() {
    const modal = this.modalService.open(RulesInCountryComponent, { size: 'sm', backdrop: 'static' });
    modal.result.then((result) => {
      this.isTrue=true;
      this.value=result;

      console.log(this.oldCountryCodes);
      for (let index of result) {
        if( this.oldCountryCodes.indexOf(index)==-1)
        {
          this.oldCountryCodes.push(index)
        }
      }
       this.newCountryCodes = this.oldCountryCodes.join();
      console.log(this.oldCountryCodes);
       console.log(this.newCountryCodes);

    }, (reason) => { });
  }
}

