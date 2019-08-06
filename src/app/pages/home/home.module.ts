import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './home.routing';
import { HomeComponent } from './home.component';
import { JsonpModule } from '@angular/http';
import { HomeService } from './home.service';
import { ModalModule } from 'app/pages/index/modal.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        JsonpModule,
        CommonModule,
        ModalModule,
        NgbModalModule,
        routing
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        HomeService
    ]
})

export class HomeModule { }
