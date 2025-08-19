import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CategoriesUseCases } from '../../../../domain/usecases/categoriesApi-use-case';
import { catchError, finalize, map, of, tap } from 'rxjs';
import {
  CategoriesModel,
  MenuItemCat,
} from '../../../../domain/models/categories.model';

@Component({
  selector: 'app-explore-inst-coupons',
  imports: [CommonModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './explore-inst-coupons.html',
  styleUrl: './explore-inst-coupons.scss',
})
export class ExploreInstCoupons {
  list_Categories!: CategoriesModel;

  selected: string[] = [];
  groupedCategories: MenuItemCat[][] = [];

  _categoriesUseCases = inject(CategoriesUseCases);

  constructor() {
    this._categoriesUseCases
      .getListCategories()
      .pipe(
        map((response: CategoriesModel) => response ?? []),
        tap((response) => {
          this.list_Categories = response;
          this.groupedCategories = this.chunkArray(response.menuItems ?? [], 6);
        }),
        catchError((error) => {
          console.log(
            error.message ?? 'Error al cargar la lista de categorias',
          );
          return of([]);
        }),
        finalize(() => {}),
      )
      .subscribe();
  }

  setActive(descripcion: string) {
    const index = this.selected.indexOf(descripcion);

    if (index === -1) {
      this.selected.push(descripcion);
    } else {
      this.selected.splice(index, 1);
    }
  }

  private chunkArray(array: MenuItemCat[], size: number): MenuItemCat[][] {
    const result: MenuItemCat[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}
