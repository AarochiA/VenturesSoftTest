import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesGateway } from '../gateways/categories-gateway';
import { CategoriesModel } from '../models/categories.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesUseCases {
  _categoriesGateway = inject(CategoriesGateway);

  getListCategories(): Observable<CategoriesModel> {
    return this._categoriesGateway.getListCategories();
  }
}
