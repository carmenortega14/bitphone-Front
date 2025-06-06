import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { SmartphonesComponent } from './features/smartphones/smartphones.component';
import { NewsletterComponent } from './shared/components/newsletter/newsletter.component';
import { InfousuarioComponent } from './features/infousuario/infousuario.component';
import { AdminpanelComponent } from './features/adminpanel/adminpanel.component';
import { canActivateAuthRole } from './core/guards/auth.guard';
import { DetailSmartphonesComponent } from './features/detail-smartphones/detail-smartphones.component';
import { CarritoComponent } from './features/carrito/carrito.component';
import { OrdersComponent } from './features/orders/orders.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'infousuario', component: InfousuarioComponent,
        canActivate: [canActivateAuthRole],
        data: {
            roles: ['user', 'Admin']
        },
    },
    {
        path: 'adminpanel', component: AdminpanelComponent,
        canActivate: [canActivateAuthRole],
        data: {
            roles: ['Admin']
        },
    },
    { path: 'carrito', component: CarritoComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'smartphones', component: SmartphonesComponent },
    { path: 'DetailSmartphone/:id', component: DetailSmartphonesComponent },
    { path: 'newsletter', component: NewsletterComponent },
    { path: '*', redirectTo: '/home' }
];
