import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { Pages } from './pages.component';
import { NoAuthGuard } from '../shared/services/no-auth-guard.service';
import { JwtService } from '../shared/services/jwt.service';
import { ApiService } from '../shared/services/api.service';
import { MessageService } from 'app/message.service';
import { OrderManualService } from "./orderManual.service";
import { OrderExceptionService } from "../shared/services/orderException-service";
import { MenuCollapseService } from "../theme/menu-collapse.service";

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    Pages
  ],
  providers: [
    NoAuthGuard,
    JwtService,
    ApiService,
    MessageService,
    OrderManualService,
    OrderExceptionService,
    MenuCollapseService
  ]
})
export class PagesModule {
}
