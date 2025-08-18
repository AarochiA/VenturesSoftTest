import { Component, inject, input } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [
    MatToolbar,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  selectedLang = 'es';
  showFlagOptions = input<boolean>(false);
  translate = inject(TranslateService);

  constructor() {
    this.translate.use(this.selectedLang);
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}
