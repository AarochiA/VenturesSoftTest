import { Observable } from 'rxjs';
import { CategoriesModel } from '../models/categories.model';

export abstract class CategoriesGateway {
  abstract getListCategories(): Observable<CategoriesModel>;
}
