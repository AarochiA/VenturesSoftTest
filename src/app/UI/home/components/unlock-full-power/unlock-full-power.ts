import { Component, computed, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';
import { BrandsModel } from '../../../../domain/models/brands.model';
import { BrandsUseCases } from '../../../../domain/usecases/brandsApi-use-case';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-unlock-full-power',
  imports: [
    MatButtonModule,
    MatCardModule,
    TranslateModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './unlock-full-power.html',
  styleUrl: './unlock-full-power.scss',
  animations: [
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
    ]),
  ],
})
export class UnlockFullPower {
  currentPage = signal(0);
  itemsPerPage = 4;

  private brandsUseCases = inject(BrandsUseCases);

  brands$ = this.brandsUseCases.getListBrands('2100').pipe(
    map((response) => response as BrandsModel),
    catchError((error) => {
      console.error('Error cargando lista de marcas: ', error);
      return of({
        error: true,
        codigo: '500',
        message: 'Error en la carga',
        menuItems: [],
      } as BrandsModel);
    }),
  );

  getPagedBrands = computed(() => {
    return (brands: BrandsModel | null) => {
      if (!brands) return [];
      const start = this.currentPage() * this.itemsPerPage;
      return brands.menuItems.slice(start, start + this.itemsPerPage);
    };
  });

  prevPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update((p) => p - 1);
    }
  }

  nextPage(total: number) {
    const maxPage = Math.ceil(total / this.itemsPerPage) - 1;
    if (this.currentPage() < maxPage) {
      this.currentPage.update((p) => p + 1);
    }
  }

  getMaxPage(total: number): number {
    return Math.ceil(total / this.itemsPerPage) - 1;
  }
}
