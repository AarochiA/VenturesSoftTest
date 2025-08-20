import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandsGateway } from '../gateways/brands-gateway';
import { BrandsModel } from '../models/brands.model';

@Injectable({
  providedIn: 'root',
})
export class BrandsUseCases {
  _brandsGateway = inject(BrandsGateway);

  getListCategories(): Observable<BrandsModel> {
    return this._brandsGateway,this.getListCategories();
  }
}
