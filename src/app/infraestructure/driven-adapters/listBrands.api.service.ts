import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandsModel } from '../../domain/models/brands.model';
import { BrandsGateway } from '../../domain/gateways/brands-gateway';

@Injectable({
  providedIn: 'root',
})
export class ListBrandsApiService extends BrandsGateway {
  private api_Test_Ventures_url = environment.apiTestUrl;

  httpClient = inject(HttpClient);

  override getListBrands(): Observable<BrandsModel | any> {
    return this.httpClient.get(`${this.api_Test_Ventures_url}/Categorias/`);
  }
}
