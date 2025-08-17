import { Routes } from '@angular/router';
import { AuthComponent } from './UI/auth/page/auth.component/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '',
  }
];
