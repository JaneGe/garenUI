import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './error-page.routing';
import { ErrorPageComponent } from 'app/pages/error-page/error-page.component';


@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [
        ErrorPageComponent
    ]
})

export class ErrorPageModule { }
