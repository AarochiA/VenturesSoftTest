import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FlexLayoutModule, MatSidenavModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = signal('venturesSoft-test');
}
