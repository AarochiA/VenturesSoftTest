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
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { CategoriesUseCases } from '../../../../domain/usecases/categoriesApi-use-case';
import { MenuItemCat } from '../../../../domain/models/categories.model';

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
  private categoriesUseCases = inject(CategoriesUseCases);

  categories$ = this.categoriesUseCases.getListCategories().pipe(
    map((response) => response.menuItems as MenuItemCat[]),
    catchError((error) => {
      console.error('Error cargando lista de categorías: ', error);
      return of([] as MenuItemCat[]);
    }),
  );

  brands$ = this.categories$.pipe(
    switchMap((categories) => {
      if (!categories || categories.length === 0) return of([]);
      const requests = categories.map((cat) =>
        this.brandsUseCases.getListBrands(cat.idMenu.toString()).pipe(
          map((response) => {
            const list_Resp_Marcas = response as BrandsModel;
            const firstBrand = list_Resp_Marcas.menuItems[0] ?? null;
            return {
              categoria: cat,
              brand: firstBrand,
            };
          }),
          catchError((error) => {
            console.error(
              `Error cargando marcas de categoría ${cat.idMenu}: `,
              error,
            );
            return of({ categoria: cat, brand: null });
          }),
        ),
      );
      return forkJoin(requests);
    }),
  );

  getPagedBrands = computed(() => {
    return (data: { categoria: MenuItemCat; brand: any | null }[] | null) => {
      if (!data) return [];
      const start = this.currentPage() * this.itemsPerPage;
      return data.slice(start, start + this.itemsPerPage);
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
