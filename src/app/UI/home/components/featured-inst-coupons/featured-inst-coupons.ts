import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrandsUseCases } from '../../../../domain/usecases/brandsApi-use-case';
import { catchError, map, of } from 'rxjs';
import { BrandsModel, MenuItem } from '../../../../domain/models/brands.model';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { MatSelect, MatSelectModule } from "@angular/material/select";

@Component({
  selector: 'app-featured-inst-coupons',
  imports: [MatButtonModule, TranslateModule, MatCardModule, MatIconModule, CommonModule, MatInputModule, MatSelectModule],
  templateUrl: './featured-inst-coupons.html',
  styleUrl: './featured-inst-coupons.scss',
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
export class FeaturedInstCoupons {

  @ViewChild(MatSelect) matSelect!: MatSelect;

  flagMoreCoupons = signal(true);
  flagMosaico = signal(true);

  allBrands: MenuItem[] = [];
  paginatedCards: MenuItem[] = [];

  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 1;

  private brandsUseCases = inject(BrandsUseCases);

  brandsGalery$ = this.brandsUseCases.getListBrands('1001').pipe(
    map((response) => {
      const list_Resp_Marcas = response as BrandsModel;
      this.allBrands = list_Resp_Marcas.menuItems;
      this.totalPages = Math.ceil(this.allBrands.length / this.pageSize);
      this.updatePaginatedCards();
      return list_Resp_Marcas.menuItems;
    }),
    catchError((error) => {
      console.error('Error cargando lista de marcas: ', error);
      this.allBrands = [];
      this.paginatedCards = [];
      return of([]);
    }),
  );

  brandsMosaico$ = this.brandsUseCases.getListBrands('1001').pipe(
    map((response) => {
      const list_Resp_Marcas = response as BrandsModel;
      const limitedItems = list_Resp_Marcas.menuItems.slice(0, 8);
      this.allBrands = list_Resp_Marcas.menuItems;
      return this.chunkArray(limitedItems, 4);
    }),
    catchError((error) => {
      console.error('Error cargando lista de marcas: ', error);
      return of([] as MenuItem[][]);
    }),
  );

  private chunkArray(array: MenuItem[], size: number): MenuItem[][] {
    const result: MenuItem[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  showAllCoupons = () => {
    this.brandsMosaico$ = this.brandsUseCases.getListBrands('1001').pipe(
      map((response) => {
        const list_Resp_Marcas = response as BrandsModel;
        return this.chunkArray(list_Resp_Marcas.menuItems, 4);
      }),
      catchError((error) => {
        console.error('Error cargando lista de marcas: ', error);
        return of([] as MenuItem[][]);
      }),
    );
    this.flagMoreCoupons.set(false);
  }

  showLessCoupons = () => {
    this.brandsMosaico$ = this.brandsUseCases.getListBrands('1001').pipe(
      map((response) => {
        const list_Resp_Marcas = response as BrandsModel;
        const limitedItems = list_Resp_Marcas.menuItems.slice(0, 8);
        return this.chunkArray(limitedItems, 4);
      }),
      catchError((error) => {
        console.error('Error cargando lista de marcas: ', error);
        return of([] as MenuItem[][]);
      }),
    );
    this.flagMoreCoupons.set(true);
  }

  changeGalery() {
    this.flagMosaico.set(false);
    this.matSelect.value = null;
    this.matSelect.writeValue(null);
  }

  changeMosaico() {
    this.flagMosaico.set(true);
    this.matSelect.value = null;
    this.matSelect.writeValue(null);
  }

  updatePaginatedCards() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCards = this.allBrands.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedCards();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedCards();
    }
  }

  // Ordena por el monbre de la marca
  onSortChange(order: string) {
    if (!this.allBrands || this.allBrands.length === 0) return;

    const sortedBrands = [...this.allBrands].sort((a, b) => {
      const nameA = a.nombreMarca.toLowerCase();
      const nameB = b.nombreMarca.toLowerCase();

      if (order === '1') {
        // ascendente
        return nameA.localeCompare(nameB);
      } else {
        // descendente
        return nameB.localeCompare(nameA);
      }
    });

    // Actualizar Galería
    this.allBrands = sortedBrands;
    this.totalPages = Math.ceil(this.allBrands.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedCards();

    // Actualizar Mosaico
    if (this.flagMoreCoupons()) {
      const limitedItems = sortedBrands.slice(0, 8);
      this.brandsMosaico$ = of(this.chunkArray(limitedItems, 4));
    } else {
      this.brandsMosaico$ = of(this.chunkArray(sortedBrands, 4));
    }
  }

}
