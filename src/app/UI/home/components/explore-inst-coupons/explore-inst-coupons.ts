import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CategoriesUseCases } from '../../../../domain/usecases/categoriesApi-use-case';
import { catchError, map, of } from 'rxjs';
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
  selected: string[] = [];

  categories$ = inject(CategoriesUseCases)
    .getListCategories()
    .pipe(
      map((response) => {
        const list_Categories = response as CategoriesModel;
        return this.chunkArray(list_Categories.menuItems || [], 6);
      }),
      catchError((error) => {
        console.error('Error cargando lista de categorías: ', error);
        return of([]);
      }),
    );

  private chunkArray(array: MenuItemCat[], size: number): MenuItemCat[][] {
    const result: MenuItemCat[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  setActive(descripcion: string) {
    const index = this.selected.indexOf(descripcion);
    if (index === -1) {
      this.selected.push(descripcion);
    } else {
      this.selected.splice(index, 1);
    }
  }
}
