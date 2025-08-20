import { MatButtonModule } from '@angular/material/button';
import { Component, inject, input } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../infraestructure/helpers/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButtonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showFlagOptions = input<boolean>(false);

  authservice = inject(AuthService);
  router = inject(Router);

  logout = () => {
    this.authservice.logout();
    this.router.navigate(['login']);
  };
}
