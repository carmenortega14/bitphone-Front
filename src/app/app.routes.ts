import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { SmartphonesComponent } from './features/smartphones/smartphones.component';
import { NewsletterComponent } from './shared/components/newsletter/newsletter.component';
import { canActivateAuthRole } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    { path: 'home', component: HomeComponent, canActivate: [canActivateAuthRole],
        data: {
            roles: ['admin']
        },
     },
    { path: 'smartphones', component: SmartphonesComponent },
    { path: 'newsletter', component: NewsletterComponent },
    { path: '*', redirectTo: '/home' }
];
