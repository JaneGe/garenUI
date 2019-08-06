import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
import {BrandService} from "../../../../shared/services/brand-service";
import {RootComponent} from "../../../../shared/component/root.component";

@Component({
  selector: 'app-brand-management',
  templateUrl: './brand-management.component.html',
  styleUrls: ['./brand-management.component.scss', '../public.scss'],
  providers: [BrandService]
})
export class BrandManagementComponent extends RootComponent implements OnInit {

  brandItems = [
    { id: 1, logoUrl: 'assets/img/theme/default_logo.png', brandName: 'Solve' },
    { id: 2, logoUrl: 'assets/img/theme/default_logo.png', brandName: 'Solve' },
  ]

  searchText: string = '';
  items: any[] = [];

  constructor(
    private modalService: NgbModal,
    private brandService: BrandService
) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.searchText= this.searchText.trim();
    this.brandService.getBrandList(this.searchText ).subscribe(data => {
      this.items = data.content;
      console.log(this.items);
    }, this.handleError);
  }

  doSearch() {
    this.loadData();
  }

  openBrandEditModal() {
    const modal = this.modalService.open(BrandEditComponent, { size: 'sm', backdrop: 'static' });
    modal.result.then(result => {
      if(result){
        this.loadData();
      }
    }, reason => { });
  }

  editBrand(id:number) {
    const modal = this.modalService.open(BrandEditComponent, { size: 'sm', backdrop: 'static' });
    modal.componentInstance.brandId = id;
    modal.result.then(result => {
      if(result){
        this.loadData();
      }
    }, reason => { });
  }
}
