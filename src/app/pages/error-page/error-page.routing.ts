import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ErrorPageComponent } from 'app/pages/error-page/error-page.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: ErrorPageComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
