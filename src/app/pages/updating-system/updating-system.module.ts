import {CommonModule} from "@angular/common";
import {routing} from "./updating-system.routing";
import {NgModule} from "@angular/core";
import {UpdatingSystemComponent} from "./updating-system.component";

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    UpdatingSystemComponent
  ]
})
export class UpdatingSystemModule {}
