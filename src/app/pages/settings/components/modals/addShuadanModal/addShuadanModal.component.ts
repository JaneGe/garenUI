import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CountryNameService } from '../../../../../shared/services/countryName.service';
import {RootComponent} from "app/shared/component/root.component";
import {UserService} from "app/shared";

@Component({
  selector: 'app-addShuadanModal',
  templateUrl: './addShuadanModal.component.html',
  styleUrls: ['./addShuadanModal.component.scss'],
  providers: [CountryNameService,UserService]
})
export class AddShuadanModalComponent  extends RootComponent implements OnInit {

  Countrys = [];
  countryName = [];

  selectedCountry = '';

  constructor(private activeModal: NgbActiveModal,
    private countryNameService: CountryNameService,
              private userService: UserService
              ) {
    super();
  }

  ngOnInit() {
    this.getCountry();
  }

  getCountry() {
    this.countryNameService.postCommonCountry().subscribe(data => {
      this.Countrys = data.content;
      for (let i of this.Countrys) {
        const item = <any>{};
        item.id = i.code;
        item.text = `${i.chineseName}(${i.code})`;
        this.countryName.push(item);
      }
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  onChangeCountryChanged(data: { value: string }) {
    this.selectedCountry = data.value;
  }

  onsubmit(value) {
    value.countryCode = this.selectedCountry;
    this.userService.createBlacklistUser(value).subscribe(data => {

      this.alertMessage("添加刷单用户成功");
      this.closeModal();

    }, this.handleError);

  }

}
