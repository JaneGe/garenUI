import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RootComponent} from "../../../../shared/component/root.component";
import {ShippingProviderService} from "../../../../shared/services/shippingprovider.service";
import {ShippingProviderLiteModel} from "../../../../shared/models/sps/shipping-provider-lite";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SpAuthComponent} from "./sp-auth/sp-auth.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../../shared/component/authority.component";

@Component({
  selector: 'app-sp-auth-list',
  templateUrl: './sp-auth-list.component.html',
  styleUrls: ['./sp-auth-list.component.scss'],
  providers: [ShippingProviderService]
})
export class SpAuthListComponent extends AuthorityComponent implements OnInit {

  public authroizedSps: ShippingProviderLiteModel[] = [];

  constructor(private shippingProviderService: ShippingProviderService
    ,private modalService: NgbModal,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.shippingProviderService.getAllAuthroizedShippingProviders().subscribe(data => {
      this.authroizedSps = data.content;
    }, this.handleError);
  }


  openSpAuthodal(spId?: number) {
    const activeModal = this.modalService.open(SpAuthComponent, { size: 'sm', backdrop: 'static' });
    if(spId > 0){
      activeModal.componentInstance.spId = spId;
    }


    activeModal.result.then((result) => {
        this.loadData();
    }, (reason) => {
      console.info(`Dismissed ${reason}`);
    });
  }
}
