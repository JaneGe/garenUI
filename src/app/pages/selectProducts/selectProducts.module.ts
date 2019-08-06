import {NgModule} from "@angular/core";
import {ProductListComponent} from "./productList/productList.component";
import {SelectProductsComponent} from "./selectProducts.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {route} from "./selectProducts.routing";
import {NgbDatepickerModule, NgbModalModule, NgbModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxPaginationModule} from "ngx-pagination";
import {ProductEditComponent} from "./modals/productEdit/productEdit.component";
import {Select2Module} from "ng2-select2";

@NgModule({
  imports:[
    FormsModule,
    CommonModule,
    // NgbModule,
    NgbModalModule,
    Select2Module,
    NgbTimepickerModule,
    NgbDatepickerModule,
    NgxPaginationModule,
    RouterModule.forChild(route)
  ],
  declarations:[ProductListComponent,SelectProductsComponent,ProductEditComponent],
  entryComponents:[ProductEditComponent]
})
export class SelectProductsModule{}
