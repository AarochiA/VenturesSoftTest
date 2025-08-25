import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';

interface Item {
  nombre: string;
  respuesta?: string;
}

@Component({
  selector: 'app-link-your-card',
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    MatListModule,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './link-your-card.html',
  styleUrl: './link-your-card.scss',
})
export class LinkYourCard {
  items: Item[] = [
    { nombre: 'INSTANT_COUPONS' },
    { nombre: 'FULL_ACCESS_EDGE' },
    { nombre: 'CASHBACK_TRACKING' },
    { nombre: 'MERCHANT_SEARCH' },
    { nombre: 'CASHBACK_OFFERS' },
  ];
}
