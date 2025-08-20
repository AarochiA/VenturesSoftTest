import { Observable } from 'rxjs';
import { BrandsModel } from '../models/brands.model';

export abstract class BrandsGateway {
  abstract getListBrands(): Observable<BrandsModel>;
}
