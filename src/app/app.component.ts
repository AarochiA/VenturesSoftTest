import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "./UI/shared/header.component/header.component";
import { FooterComponent } from "./UI/shared/footer.component/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    HeaderComponent,
    FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showHeadAndFooter: boolean = false;
  router = inject(Router);

  constructor() {
    this.router.events.subscribe((event) => {
      // Verifica qué tipo de evento estás recibiendo
      // console.log('Router event:', event);
      if (event instanceof NavigationEnd) {
        this.showHeadAndFooter = event.url !== '/login' && event.url !== '/';
        // console.log('URL actual:', event.url, 'Mostrar showHeadAndFooter:', this.showHeadAndFooter);
      }
    });
  }
}
