import { Routes } from '@angular/router';
import { LoginComponent } from './UI/auth/page/auth.component/login.component';
import { HomeComponent } from './UI/home/page/home.component/home.component';
import { authGuard } from './infraestructure/helpers/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
