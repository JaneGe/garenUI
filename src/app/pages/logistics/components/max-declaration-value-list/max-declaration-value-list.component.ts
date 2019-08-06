import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RootComponent } from "../../../../shared/component/root.component";
import { MaxPriceComponent } from '../modals/maxPrice/maxPrice.component';
import { AmountService } from "../../../../shared/services/declared-amount.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../../shared/component/authority.component";

@Component({
  selector: 'app-max-declaration-value-list',
  templateUrl: './max-declaration-value-list.component.html',
  styleUrls: ['./max-declaration-value-list.component.scss'],
  providers: [MaxPriceComponent, AmountService],
})
export class MaxDeclarationValueListComponent extends AuthorityComponent implements OnInit {

  amount = [];
  country;
  constructor(private modalService: NgbModal,
      private amountService: AmountService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }

  ngOnInit() {
    this.loadData();
  }

  chooseCountry() {
    for(let index in this.amount){
      for(let i in this.country){
        if(this.amount[index].countryCode == this.country[i].countryCode){
          this.amount[index].flag = this.country[i].flag;
          this.amount[index].country = this.country[i].country;
        }
      }
    }
  }

  loadData() {
    this.amountService.getCountryDeclarationAmount().subscribe(data => {
      this.amount = data.content;
      this.country = this.amountService.getCountry();
      this.chooseCountry();

    }, this.handleError);
  }

  openModal(priceIndex: number) {
    const activeModal = this.modalService.open(MaxPriceComponent,
      {size: 'sm', windowClass: 'large-lmt-modal', backdrop: 'static'});
      console.log(priceIndex);
      if(priceIndex === undefined){
        activeModal.componentInstance.priceIndex = priceIndex;
      }else{
        activeModal.componentInstance.priceIndex = priceIndex;
        activeModal.componentInstance.editCountry = this.amount[priceIndex];
      }
    activeModal.result.then((result) => {
      if( result === 1) {
        this.loadData();
      }
    }, (reason) => {
      console.info(reason);
    });
  }

}
