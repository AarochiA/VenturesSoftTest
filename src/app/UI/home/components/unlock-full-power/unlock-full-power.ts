import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from  '@angular/material/button';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes} from '@angular/animations';
import { BrandsModel } from '../../../../domain/models/brands.model';
// import { BrandsUseCases  } from '../../../../domain/usecases/brandsApi-use-case';

@Component({
  selector: 'app-unlock-full-power',
  imports: [MatButton, MatCardModule, TranslateModule, CommonModule],
  templateUrl: './unlock-full-power.html',
  styleUrl: './unlock-full-power.scss',
  animations:[
      trigger('fadeIn', [
      transition(':enter', [
        animate(
          '2s ease-in-out',
          keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 1, offset: 1 }),
          ]),
        ),
      ]),
    ])
  ]
})
export class UnlockFullPower {
  pageSize = 4;
  currentPage = 0;

  brands: BrandsModel[] = [
    {
      logoUrl: 'assets/logos/logo1.png',
      brandImageUrl: 'assets/images/brand1.jpg',
      name: 'Coca Cola',
      title: 'Refrescos',
      description: 'La marca de refrescos más famosa del mundo.'
    },
    {
      logoUrl: 'assets/logos/logo2.png',
      brandImageUrl: 'assets/images/brand2.jpg',
      name: 'Nike',
      title: 'Deportes',
      description: 'Inspirando atletas con ropa y calzado deportivo.'
    },
    {
      logoUrl: 'assets/logos/logo3.png',
      brandImageUrl: 'assets/images/brand3.jpg',
      name: 'Apple',
      title: 'Tecnología',
      description: 'Diseñando tecnología innovadora para todos.'
    },
    {
      logoUrl: 'assets/logos/logo4.png',
      brandImageUrl: 'assets/images/brand4.jpg',
      name: 'Adidas',
      title: 'Deportes',
      description: 'Ropa y calzado para atletas en todo el mundo.'
    },
    {
      logoUrl: 'assets/logos/logo5.png',
      brandImageUrl: 'assets/images/brand5.jpg',
      name: 'Samsung',
      title: 'Tecnología',
      description: 'Innovación en móviles y electrónica de consumo.'
    },
    {
      logoUrl: 'assets/logos/logo4.png',
      brandImageUrl: 'assets/images/brand4.jpg',
      name: 'Adidas',
      title: 'Deportes',
      description: 'Ropa y calzado para atletas en todo el mundo.'
    },
    {
      logoUrl: 'assets/logos/logo5.png',
      brandImageUrl: 'assets/images/brand5.jpg',
      name: 'Samsung',
      title: 'Tecnología',
      description: 'Innovación en móviles y electrónica de consumo.'
    }
  ];

  pagedBrands() {
    const start = this.currentPage * this.pageSize;
    return this.brands.slice(start, start + this.pageSize);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.brands.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
