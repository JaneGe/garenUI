import {Routes} from "@angular/router";
import {SelectProductsComponent} from "./selectProducts.component";
import {ProductListComponent} from "./productList/productList.component";

export const route:Routes=[
  {
    path:'',component:SelectProductsComponent,
    children:[
      {path:'productList',component:ProductListComponent}
    ]
  }
];
