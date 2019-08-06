import {Component, Input, OnInit} from '@angular/core';
import {ShippingProviderService} from "../../../../../shared/services/shippingprovider.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShippingProviderLiteModel} from "../../../../../shared/models/sps/shipping-provider-lite";
import {RootComponent} from "../../../../../shared/component/root.component";
import {ShippingProviderAuthMetadataModel} from "../../../../../shared/models/sps/shipping-provider-auth-metadata";
import {ShippingProviderDoAuthCommand} from "../../../../../shared/models/sps/shipping-provider-do-auth-command";
import {NeedAuthShippingProviderModel} from "../../../../../shared/models/sps/need-auth-shipping-provider-model";


@Component({
  selector: 'app-sp-auth',
  templateUrl: './sp-auth.component.html',
  styleUrls: ['./sp-auth.component.scss'],
  providers: [ShippingProviderService]
})
export class SpAuthComponent extends RootComponent implements OnInit {

  @Input()
  spId: number;


  selectedSpId: number;
  authType: string;
  isAuthroized: boolean;
  form: FormGroup;
  submitted: boolean = false;
  // allSps: ShippingProviderLiteModel[] = [];
  allSps: NeedAuthShippingProviderModel[] = [];
  spAuthMetadata: ShippingProviderAuthMetadataModel = new ShippingProviderAuthMetadataModel();
  spAuthData: any;

  constructor(private activeModal: NgbActiveModal,
              fb: FormBuilder,
              private shippingProviderService: ShippingProviderService) {
    super();

    this.form = fb.group({
      'spId': ['', Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {

    this.selectedSpId = this.spId;

    this.shippingProviderService.getAllNeedAuthShippingProviders().subscribe(data => {
      this.allSps = data.content;

      if (this.allSps.length > 0) {
        if (!(this.selectedSpId > 0)) {
          this.selectedSpId = this.allSps[0].id;
        }

        this.form.controls['spId'].setValue(this.selectedSpId);
        this.loadSpMetaData();
      }
    });
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  loadSpMetaData() {
    this.shippingProviderService.getShippingProviderAuthMetaData(this.selectedSpId).subscribe(spAuthMetaData => {
      this.spAuthMetadata = spAuthMetaData.content;

      for (let keyName in this.form.controls) {
        if (keyName === 'spId') {
          continue;
        }
        this.form.removeControl(keyName)
      }

      const checkSp = this.allSps.find(m => m.id == this.selectedSpId);
      if (checkSp == null) {
        return;
      }
      this.authType = checkSp.authorizeType;

      for (const field of  this.spAuthMetadata.fields) {
        const validFns: any[] = [];
        if (field.isRequired) {
          validFns.push(Validators.required);
        }
        if (field.stringMaximumLength > 0) {
          validFns.push(Validators.maxLength(field.stringMaximumLength));
        }
        const ctrl = new FormControl('', validFns);
        this.form.addControl(field.fieldName, ctrl);
      }


      this.shippingProviderService.getShippingProviderAuthData(this.selectedSpId).subscribe(authData => {
        const spAuthData = authData.content;
        this.isAuthroized = false;
        if (spAuthData == null) {
          return;
        }
        this.isAuthroized = spAuthData.isAuthorized;
        if (!spAuthData.isAuthorized) {
          return;
        }


        for (let keyName in this.form.controls) {
          if (keyName === 'spId') {
            continue;
          }
          let control = this.form.controls[keyName];
          let lowKeyName = keyName.toLowerCase();


          for (let pName in spAuthData.properties) {
            const lowPName = pName.toLowerCase();
            if (lowKeyName === lowPName) {
              let pValue = spAuthData.properties[pName];
              control.setValue(pValue);
              break;
            }
          }
        }
      });

    });
  }

  doSpAuth(value) {
    console.info(value);
    if (this.authType == "Oauth2") {
      this.doOauth2Submit(value);
      return;
    }

    let authData = new ShippingProviderDoAuthCommand();
    authData.spId = value.spId;
    authData.properties = {};

    for (let keyName in value) {
      if (keyName === 'spId') {
        continue;
      }
      authData.properties[keyName] = value[keyName];
    }

    this.shippingProviderService.doAuthroize(authData).subscribe(data => {
      this.alertMessage("绑定成功");
      this.activeModal.close();
    }, this.handleError);

  }

  doOauth2Submit(value) {
    let authData = <any>{};
    authData.spId = value.spId;
    authData.properties = {};
    this.shippingProviderService.doCreateAuthroizeRequest(authData).subscribe(data => {
      const url = data.content.authorizeUrl;
      const win = window.open('');
      win.location.href = url;
    }, this.handleError);

  }

  onSpChanged() {
    const spIdControl = this.form.get('spId');
    this.selectedSpId = spIdControl.value;
    this.loadSpMetaData();
  }
}
