import { Routes, RouterModule } from '@angular/router';
import { CustomerServicesComponent } from './customer-services.component';
import { AmazonServicesComponent } from './components/amazon-services/amazon-services.component';
import { TemplateListComponent } from 'app/pages/customer-services/components/template-list/template-list.component';
import { WishTicketComponent } from './components/wish-ticket/wish-ticket.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerServicesComponent,
        children: [
            { path: 'amazon-services', component: AmazonServicesComponent },
            { path: 'template-list', component: TemplateListComponent },
            { path: 'wish-ticket', component: WishTicketComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
