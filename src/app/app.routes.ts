import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { NewsletterComponent } from './shared/components/newsletter/newsletter.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'newsletter', component: NewsletterComponent },
    { path: '*', redirectTo: '/home' }
];
