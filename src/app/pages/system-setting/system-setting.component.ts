import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditBrokerageComponent } from "./modal/edit-brokerage/edit-brokerage.component";
import { RootComponent } from "../../shared/component/root.component";
import { SystemConfigService } from "../../shared/services/system-config-service";
import { PurchaseConfigModel } from "../../shared/models/commons/purchase-config-model";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorityComponent } from "../../shared/component/authority.component";
import { Select2OptionData } from "ng2-select2";
import { SystemSettingService } from "../../shared/services/system-setting-service";

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.scss'],
  providers: [SystemConfigService, SystemSettingService]

})
export class SystemSettingComponent extends AuthorityComponent implements OnInit {
  LossCurData = [
    {
      id: 1,
      selectedCur: 'USD',
      targetCur: 'CNY',
      lcPercent: 10,
      operator: '张三',
      time: '',
      edit: false
    }
  ];
  Currencys: Array<Select2OptionData> = [
    { id: 'USD', text: 'USD' },
    { id: 'GBP', text: 'GBP' },
    { id: 'EUR', text: 'EUR' },
    { id: 'JPY', text: 'JPY' },
    { id: 'CAD', text: 'CAD' },
    { id: 'TWD', text: 'TWD' },
    { id: 'RUB', text: 'RUB' },
    { id: 'AUD', text: 'AUD' },
    { id: 'SGD', text: 'SGD' },
    { id: 'MXN', text: 'MXN' },
    { id: 'MYR', text: 'MYR' },
  ];
  addedCur = [];

  Data = [
    { id: 1, platForm: 'Wish', brokerage: 0, operator: '张三', time: '2017/11/6 上午10:30:24' },
    { id: 2, platForm: 'Amazon', brokerage: 0, operator: '李四', time: '2017/11/6 上午10:30:24' },
    { id: 3, platForm: 'SMT', brokerage: 0, operator: '王武', time: '2017/11/6 上午10:30:24' },
    { id: 4, platForm: 'JD', brokerage: 0, operator: '刘六', time: '2017/11/6 上午10:30:24' },
  ];
  Data1 = [
    { id: 1, platForm: 'Wish', warningprofit: 0, operator: '张三', time: '2017/11/6 上午10:30:24' },
    { id: 2, platForm: 'Amazon', warningprofit: 0, operator: '李四', time: '2017/11/6 上午10:30:24' },
    { id: 3, platForm: 'SMT', warningprofit: 0, operator: '王武', time: '2017/11/6 上午10:30:24' },
    { id: 4, platForm: 'JD', warningprofit: 0, operator: '刘六', time: '2017/11/6 上午10:30:24' },
  ];
  storages = [
    { id: 1, storage: 'test1' },
    { id: 2, storage: 'test2' },
    { id: 3, storage: 'test3' },
    { id: 4, storage: 'test4' },
    { id: 5, storage: 'test5' },
  ];
  seven: number = null;
  fifteen: number = null;
  thirty: number = null;
  ninety: number = null;

  editstatu: boolean = false;
  editThirdtimeStatu: boolean = false;
  selectedthirdtime = [];
  selectedBrokerage = [];
  selectedWarningProfit = [];
  selectedCurrency = [];
  purchaseConfig: PurchaseConfigModel = <any>{};

  constructor(private modalService: NgbModal,
    private systemConfigService: SystemConfigService,
    public activerouter: ActivatedRoute,
    public router: Router,
    public systemSettingService: SystemSettingService) {
    super(activerouter, router);
  }

  ngOnInit() {
    this.systemConfigService.getPurchaseConfig().subscribe(data => {
      this.purchaseConfig = data.content;

      this.seven = this.purchaseConfig.avg7SaleRate * 100;
      this.fifteen = this.purchaseConfig.avg15SaleRate * 100;
      this.thirty = this.purchaseConfig.avg30SaleRate * 100;
      this.ninety = this.purchaseConfig.avg90SaleRate * 100;
    }, this.handleError);

    this.lossCurDataLoadData();
  }

  lossCurDataLoadData() {
    this.systemSettingService.getExchangeRateLossList().subscribe(data => {
      this.LossCurData = data.content;
      console.log(this.LossCurData);

    });
  }


  LCD = this.LossCurData.length + 1;

  addCur() {
    this.addedCur.push({
      // id: this.LCD,
      id: 0,
      selectedCur: '',
      lcPercent: null,
      targetCur: 'CNY',
      operator: '---',
      time: '-----',
      edit: true
    });
    this.LossCurData.push({
      // id: this.LCD,
      id: 0,
      selectedCur: 'USD',
      lcPercent: null,
      targetCur: 'CNY',
      operator: '---',
      time: '-----',
      edit: true
    });
    this.LCD++;
  }

  onSaveCur(val, index, id) {
    console.log(val);
    console.log(id);
    if (val.lcPercent == 0 || val.lcPercent == null) {
      this.error("汇损率不能为0");
      return;
    }
    if (id == 0) {
      this.systemSettingService.saveExchangeRateLoss(id, val.selectedCur, val.targetCur, val.lcPercent).subscribe(data => {
        this.alertMessage("添加成功");
        this.lossCurDataLoadData();
      }, this.handleError);
    }
    else {
      this.systemSettingService.saveExchangeRateLoss(id, val.selectedCur, val.targetCur, val.lcPercent).subscribe(data => {
        this.alertMessage("修改成功");
        this.lossCurDataLoadData();
      }, this.handleError);
    }

    this.LossCurData[index].edit = false;
  }

  onEditCur(index) {
    this.LossCurData[index].edit = true;
  }

  turntoEdit(val: any) {
    if (val == 'rule') this.editstatu = true;
    if (val == 'thirdtime') this.editThirdtimeStatu = true;
  }

  IsConfirm(val: any) {
    if (val == 'rule') {
      var total = this.seven + this.fifteen + this.thirty + this.ninety;
      console.log(total);
      if (total != 100) {
        this.error('和值必须为 100% ');
      }
      else {
        const data = {
          id: this.purchaseConfig.id,
          avg7SaleRate: this.seven / 100,
          avg15SaleRate: this.fifteen / 100,
          avg30SaleRate: this.thirty / 100,
          avg90SaleRate: this.ninety / 100
        };
        this.systemConfigService.savePurchaseConfig(data).subscribe(data => {
          this.editstatu = false;
        }, this.handleError);
      }
    }
    if (val == 'thirdtime') {
      this.editThirdtimeStatu = false;
    }
  }

  selectedallthirdtime(Checked: boolean) {
    this.selectedthirdtime = this.selectAll(Checked, this.selectedthirdtime, this.storages);
  }

  selectedsiglethirdtime(Checked: boolean, id: any) {
    this.selectedthirdtime = this.selectedSigle(Checked, this.selectedthirdtime, id);
  }

  selectedallBrokerage(Checked: boolean) {
    this.selectedBrokerage = this.selectAll(Checked, this.selectedBrokerage, this.Data);
  }

  selectedsigleBrokerage(Checked: boolean, id: any) {
    this.selectedBrokerage = this.selectedSigle(Checked, this.selectedBrokerage, id);
  }

  selectedallwarningprofit(Checked: boolean) {
    this.selectedWarningProfit = this.selectAll(Checked, this.selectedWarningProfit, this.Data1);
  }

  selectedsiglewarningprofit(Checked: boolean, id: any) {
    this.selectedWarningProfit = this.selectedSigle(Checked, this.selectedWarningProfit, id);
  }


  OncheckCurrency(Checked: boolean, id: any) {
    this.selectedCurrency = this.selectedSigle(Checked, this.selectedCurrency, id);
    console.log(this.selectedCurrency);
  }

  OncheckAllCurrency(Checked: boolean) {
    this.selectedCurrency = this.selectAll(Checked, this.selectedCurrency, this.LossCurData);
    console.log(this.selectedCurrency);
  }


  OnselectCurrency(event, index) {
    this.LossCurData[index].selectedCur = event.value;
  }

  selectAll(Checked: boolean, selected: Array<any>, Data: Array<any>) {
    if (Checked) {
      selected = [];
      for (let i of Data) {
        selected.push(i.id);
      }
    }
    else {
      selected = [];
    }
    return selected;
  }

  selectedSigle(Checked: boolean, selected: Array<any>, id: any) {
    var exist = selected.indexOf(id);
    if (Checked) {
      if (exist == -1) {
        selected.push(id);
      }
    }
    else {
      if (exist >= 0) {
        selected.splice(exist, 1);
        console.log(id);
      }
    }
    return selected;
  }

  del(key: any) {
    console.log(key);
    if (key == 'brokerage') {
      if (this.selectedBrokerage.length == 0) {
        this.error('请选择要删除的平台设置！');
      }
      else {
        this.Data.forEach(((value, index, array) => {
          for (var i of this.selectedBrokerage) {
            if (i == value.id) {
              array.splice(index, 1);
            }
          }
        }))
      }
    }
    else if (key == 'profit') {
      if (this.selectedWarningProfit.length == 0) {
        this.error('请选择要删除的平台设置！');
      }
      else {
        this.Data1.forEach(((value, index, array) => {
          for (var i of this.selectedWarningProfit) {
            if (i == value.id) {
              array.splice(index, 1);
            }
          }
        }))
      }
    }
    // else if (key == 'curreny') {
    //   if (this.selectedCurrency.length == 0) {
    //     this.error('请选择要删除的汇损设置！');
    //   }
    //   else {
    //     this.LossCurData.forEach(((value, index, array) => {
    //       for (var i of this.selectedCurrency) {
    //         if (i == value.id) {
    //           array.splice(index, 1);
    //         }
    //       }
    //     }))
    //   }
    // }
  }

  cancelExchangeRateLoss(item, id) {
    if (item.operator === '---') {
      this.selectedCurrency = this.selectedSigle(true, this.selectedCurrency, id);
      this.LossCurData.forEach(((value, index, array) => {
        for (var i of this.selectedCurrency) {
          if (i == value.id) {
            array.splice(index, 1);
          }
        }
      }))
    } else {
      item.edit = false;
    }
  }

  delExchangeRateLoss() {

    if (this.selectedCurrency == null || this.selectedCurrency.length == 0) {
      this.error("请选择要删除的数据");
      return;
    }
    this.confirm("确定删除该数据?", () => {
      this.systemSettingService.deleteExchangeRateLoss(this.selectedCurrency).subscribe(data => {
        this.alertMessage("删除成功");
        this.lossCurDataLoadData()
      });

    });
  }

  openAddBrokerageModal() {
    const activeModal = this.modalService.open(EditBrokerageComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = "添加平台佣金设置";
    activeModal.componentInstance.settingValue = "佣金";
    activeModal.result.then(result => {
      if (result != undefined) {
        result.id = this.Data.length + 1;
        this.Data.push(result);
        console.log(result);
      }
    })
  }

  openProfitWaringModal() {
    const activeModal = this.modalService.open(EditBrokerageComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = "利润警戒设置";
    activeModal.componentInstance.settingValue = "利润警戒值";
    activeModal.result.then(result => {
      if (result != undefined) {
        result.id = this.Data1.length + 1;
        this.Data1.push(result);
        console.log(result);
      }
    })
  }

  editBrokerage(platform: any) {
    const activeModal = this.modalService.open(EditBrokerageComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = "编辑平台佣金设置";
    activeModal.componentInstance.settingValue = "佣金";
    activeModal.componentInstance.platform = platform;
    activeModal.result.then(result => {
      if (result != undefined) {
        console.log(result);
      }
    })
  }

  editWarningValue(platform: any) {
    const activeModal = this.modalService.open(EditBrokerageComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = "编辑利润警戒设置";
    activeModal.componentInstance.settingValue = "利润警戒值";
    activeModal.componentInstance.platform = platform;
    activeModal.result.then(result => {
      if (result != undefined) {
        console.log(result);
      }
    })
  }
}
