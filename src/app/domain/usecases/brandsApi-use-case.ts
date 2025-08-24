import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandsGateway } from '../gateways/brands-gateway';
import { BrandsModel } from '../models/brands.model';

@Injectable({
  providedIn: 'root',
})
export class BrandsUseCases {
  _brandsGateway = inject(BrandsGateway);

  getListBrands(idMenu: string): Observable<BrandsModel> {
    return this._brandsGateway.getListBrands(idMenu);
  }
}
