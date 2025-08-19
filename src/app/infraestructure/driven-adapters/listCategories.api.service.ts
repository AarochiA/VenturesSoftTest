import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriesGateway } from '../../domain/gateways/categories-gateway';
import { CategoriesModel } from '../../domain/models/categories.model';

@Injectable({
  providedIn: 'root',
})
export class ListCategoriesApiService extends CategoriesGateway {
  private api_Test_Ventures_url = environment.apiTestUrl;

  httpClient = inject(HttpClient);

  override getListCategories(): Observable<any> {
    return this.httpClient.get(`${this.api_Test_Ventures_url}/Categorias/`);
  }
}
